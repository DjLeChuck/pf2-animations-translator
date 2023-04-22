# pf2-animations-translator

Translate PF2 Animations menu labels.

## Usage

Execute the following command:

```bash
node app.js /path/to/fvtt-AutomatedAnimations-GlobalMenu-pf2e.json /path/to/FoundryVTT/Data/modules/pf2-fr/babele/vf/fr
```

The first argument is the JSON of the global menu which can ben exported through the options.
The second argument is the path to translations files. It can be any of available ones (`vf`, `vf-vo`, `vo`, `vo-vf`).

After the execution, a file `translated-menu.json` will be created. This file needs to be imported and **it replace**
the current menu.
