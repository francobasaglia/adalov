#!/usr/bin/env node

const { execSync } = require('child_process');
const projectRoot = process.cwd();
const packagesConfigs = require(`${projectRoot}/packages/config.json`);
const releaseTag = process.argv.find(arg => arg.startsWith('--releaseTag')).replace('--releaseTag=', '');
const NODE_AUTH_TOKEN = process.env.NODE_AUTH_TOKEN

const publishPackage = () => {
    const packageConfig = packagesConfigs.shift();

    if (packageConfig) {
        execSync(`cd out-pck/${packageConfig.dir} && npm publish --verbose --access public --tag ${releaseTag}`, {
            env: NODE_AUTH_TOKEN
        });
        publishPackage();
    }
};

(() => publishPackage())();
