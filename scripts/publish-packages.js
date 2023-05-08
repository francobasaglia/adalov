#!/usr/bin/env node

const { execSync } = require('child_process');
const projectRoot = process.cwd();
const packagesConfigs = require(`${projectRoot}/packages/config.json`);
const releaseTag = process.argv[2].replace('--releaseTag=', '');

const publishPackage = () => {
    const packageConfig = packagesConfigs.shift();

    if (packageConfig) {
        execSync(`cd out-pck/${packageConfig.dir} && npm publish --verbose --access public --tag ${releaseTag}`);
        publishPackage();
    }
};

(() => publishPackage())();
