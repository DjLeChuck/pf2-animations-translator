import path from 'path';
import fs from 'fs/promises';

const parsedCompendiums = [
    'pf2e.equipment-srd.json',
    'pf2e.spells-srd.json',
    'pf2e.conditionitems.json',
    'pf2e.spell-effects.json',
];
const translations = {};

(async function () {
    const [menuFilePath, compendiumDirectoryPath] = process.argv.slice(2);

    if (!menuFilePath) {
        fatal('Le premier argument est manquant.');
    }

    if (!await exists(menuFilePath)) {
        fatal(`Le fichier ${menuFilePath} n’existe pas.`);
    }

    if (!compendiumDirectoryPath) {
        fatal('Le second argument est manquant.');
    }

    if (!await exists(compendiumDirectoryPath)) {
        fatal(`Le répertoire ${compendiumDirectoryPath} n’existe pas.`);
    }

    if (!compendiumDirectoryPath.match('pf2-fr\/babele\/(vf|vf-vo|vo|vo-vf)\/fr\/?$')) {
        fatal(`Le répertoire des compendiums traduits doit être "pf2-fr/babele/xxx/fr/" (avec "xxx" valant "vf", ou "vf-vo", ou "vo", ou "vo-vf")`);
    }

    console.log('Chargement des compendiums...');
    await loadCompendiums(compendiumDirectoryPath);

    console.log('');
    console.log('==========================================');
    console.log('');

    const missingTranslations = [];

    console.log('Traitement du fichier d’animations...')
    try {
        const dataset = await loadJSONFile(menuFilePath);

        for (const key of Object.keys(dataset)) {
            if (!(Array.isArray(dataset[key]))) {
                continue;
            }

            console.log(`Traitement de la clef ${key}...`);

            for (const item of dataset[key]) {
                if (!item.label) {
                    warn(`Pas de libellé sur l’item ${item.id}`);

                    continue;
                }

                if (translations[item.label]) {
                    item.label = translations[item.label];

                    if (item.metaData?.label) {
                        item.metaData.label = item.label;
                    }
                } else {
                    missingTranslations.push(item.label);
                }
            }
        }

        console.log('');
        console.log('==========================================');
        console.log('');

        await dumpNewFile(dataset);

        if (0 < missingTranslations.length) {
            console.log('');
            console.log('==========================================');
            console.log('');

            warn('Liste des traductions manquantes :');

            missingTranslations.forEach(name => warn(name));
        }
    } catch (err) {
        fatal(err);
    }
})();

function fatal(message) {
    console.error(message);

    process.exit(1);
}

function warn(message) {
    console.warn(message);
}

async function exists(filePath) {
    try {
        await fs.access(filePath, fs.constants.R_OK);

        return true;
    } catch (err) {
        return false;
    }
}

async function loadJSONFile(path) {
    try {
        const data = await fs.readFile(path);

        return JSON.parse(data.toString());
    } catch (err) {
        warn(`Erreur de parsing du fichier ${path}`);
    }
}

async function loadCompendiums(directory) {
    try {
        for (const file of parsedCompendiums) {
            console.log(`Traitement du fichier ${file}`);

            const filePath = path.join(directory, file);
            const dataset = await loadJSONFile(filePath);

            for (const [key, entry] of Object.entries(dataset.entries)) {
                const transKey = entry.id ?? key;

                if ((translations[transKey] ?? null) && translations[transKey] !== entry.name) {
                    warn(`Traduction pour ${transKey} déjà présente. En place : ${translations[transKey]} ; Nouveau : ${entry.name}`);
                }

                translations[transKey] = entry.name;
            }
        }
    } catch (e) {
        console.error(e);
    }
}

async function dumpNewFile(dataset) {
    try {
        await fs.writeFile('./translated-menu.json', JSON.stringify(dataset, null, 2));

        console.log('Fichier translated-menu.json créé avec succès.');
    } catch (err) {
        fatal(`Impossible d’écrire le nouveau fichier : ${err}`);
    }
}
