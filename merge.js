exports.__esModule = true;
const { create } = require('tar');
const fs = require('fs-extra');
const mergeWith  = require('lodash.mergeWith');

const appConfigFile = './tmp/assets/config/app.config.json';
const mergeConfigCustom = (sectionInConfig, mergeChanges) => {
    console.log({sectionInConfig, mergeChanges});
    if (Array.isArray(sectionInConfig)) {
        return mergeChanges
    }
};

async function mergeConfig(mergeChanges) {
    await fs.ensureDir('./tmp');
    await fs.copy('./element', './tmp');
    const defaultConfig = await fs.readJson(appConfigFile);
    const mergedConfig = mergeWith(defaultConfig, mergeChanges, mergeConfigCustom);
    await fs.writeJson(appConfigFile, mergedConfig);
    return create(
        {
            cwd  : './tmp',
            gzip: true
        },
        [
            'assets',
            'res',
            'custom-ansyn.min.js'
        ]
    )

}

exports.mergeConfig = mergeConfig;


