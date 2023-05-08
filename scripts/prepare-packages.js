#!/usr/bin/env node

const { copyFileSync, writeFile } = require('fs');
const projectRoot = process.cwd();
const packagesConfig = require(`${projectRoot}/packages/config.json`);
const packageRoot = require(`${projectRoot}/package.json`);

const getPeerDependencies = peerDependencies => {
    const retval = {};

    if (peerDependencies) {
        Object.keys(peerDependencies).forEach(key => {
            if (key.startsWith('@adalov')) {
                retval[key] = packageRoot.version;
            } else {
                retval[key] = peerDependencies[key];
            }
        });
    }

    return retval;
};

const preparePackages = () => {
    packagesConfig.forEach(packageConfig => {
        ['CHANGELOG.md', 'LICENSE', 'README.md'].forEach(fileName => copyFileSync(
            `${projectRoot}/${fileName}`,
            `${projectRoot}/out-pck/${packageConfig.dir}/${fileName}`
        ));
    
        writeFile(
            `${projectRoot}/out-pck/${packageConfig.dir}/package.json`,
            JSON.stringify({
                name: packageConfig.name,
                version: packageRoot.version,
                description: packageRoot.description,
                repository: {
                    ...packageRoot.repository,
                    directory: `packages/${packageConfig.dir}`
                },
                keywords: packageRoot.keywords,
                author: packageRoot.author,
                license: packageRoot.license,
                bugs: packageRoot.bugs,
                homepage: packageRoot.homepage,
                main: 'index.js',
                dependencies: {
                    tslib: packageRoot.dependencies.tslib,
                },
                peerDependencies: {
                    ...getPeerDependencies(packageConfig.peerDependencies)
                }
            }, null, 2),
            () => {}
        );
    });
};

(() => preparePackages())();
