# pf2-animations-translator

Traduction FR des animations du module [PF2e Animations](https://foundryvtt.com/packages/pf2e-jb2a-macros) grâce à
l’utilisation du module [Français [Pathfinder 2] (fan made)](https://foundryvtt.com/packages/pf2-fr).

Versions des modules utilisées pour la génération :

* `Automated Animations` : `4.2.60`
* `PF2e Animations` : `2.15.5`
* `Français [Pathfinder 2] (fan made)` : `5.1.1`

## Installation

1. Télécharger le fichier `translated-menu.json` de
   la [dernière version](https://github.com/DjLeChuck/pf2-animations-translator/releases/latest).
2. Ouvrir le `Menu de lancement` de `Automated Animations`
    * Accessible via le `Configuration des options > Automated Animations > Menu de lancement` ou la macro `Open AA`
3. Cliquer sur `Gestionnaire de menu` en bas de la fenêtre
    * (Optionnel) Cliquer sur `Exporter Menu` si vous voulez garder une sauvegarde de la configuration actuelle
4. Cliquer sur `Écraser Menu`, puis sur `Oui` dans la fenêtre de confirmation. Choisissez ensuite le fichier téléchargé
   à la première étape et validez.
5. Profitez !

## Traductions manquantes

L’ensemble des termes non traduits se trouvent dans le fichier [untranslated.json](./untranslated.json). Ils sont donc
restés intouchés dans le fichier et se retrouvent toujours sous leur forme VO.

## Génération du fichier de traductions

⚠️ Toute cette partie **N’EST PAS** nécessaire. Il s’agit de la procédure de génération du fichier à télécharger.

Exécuter la commande suivante :

```bash
node app.js /path/to/fvtt-AutomatedAnimations-GlobalMenu-pf2e.json /path/to/FoundryVTT/Data/modules/pf2-fr/babele/vf/fr
```

Le premier argument est le fichier JSON exporté depuis `Automated Animations` accessible via `Exporter Menu` comme
expliqué dans la procédure d’installation.
Le second argument est le chemin vers le répertoire `modules/pf2-fr/babele/vf/fr` à utiliser.

Après l’exécution, un fichier `translated-menu.json` sera créé, prêt à être importé.
