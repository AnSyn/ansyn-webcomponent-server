exports.__esModule = true;
const { create } = require('tar');
const fs = require('fs-extra');
const mergeWith  = require('lodash.mergeWith');

const appConfigFile = './tmp/assets/config/app.config.json';
const mergeConfigCustom = (sectionInConfig, mergeChanges) => {
    if (Array.isArray(sectionInConfig)) {
        return mergeChanges
    }
};

async function mergeConfig(mergeChanges) {
    await fs.ensureDir('./tmp');
    await fs.copy('./element', './tmp');
    await fs.copy('./HowTo.txt', './tmp/HowTo.txt');
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
            'HowTo.txt',
            'custom-ansyn.min.js'
        ]
    )

}

exports.mergeConfig = mergeConfig;


