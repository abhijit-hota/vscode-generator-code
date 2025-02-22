/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

const prompts = require("./prompts");

module.exports = {
    id: 'ext-command-web',
    aliases: ['web', 'command-web'],
    insidersName: 'New Web Extension (TypeScript)',
    /**
     * @param {import('yeoman-generator')} generator
     * @param {Object} extensionConfig
     */
    prompting: async (generator, extensionConfig) => {
        await prompts.askForExtensionDisplayName(generator, extensionConfig);
        await prompts.askForExtensionId(generator, extensionConfig);
        await prompts.askForExtensionDescription(generator, extensionConfig);

        await prompts.askForGit(generator, extensionConfig);
        await prompts.askForPackageManager(generator, extensionConfig);
    },
    /**
     * @param {import('yeoman-generator')} generator
     * @param {Object} extensionConfig
     */
    writing: (generator, extensionConfig) => {
        generator.fs.copy(generator.sourceRoot() + '/vscode', '.vscode');
        generator.fs.copy(generator.sourceRoot() + '/src/web/test', 'src/web/test');

        generator.fs.copy(generator.sourceRoot() + '/vscodeignore', '.vscodeignore');
        if (extensionConfig.gitInit) {
            generator.fs.copy(generator.sourceRoot() + '/gitignore', '.gitignore');
        }
        generator.fs.copyTpl(generator.sourceRoot() + '/README.md', 'README.md', extensionConfig);
        generator.fs.copyTpl(generator.sourceRoot() + '/CHANGELOG.md', 'CHANGELOG.md', extensionConfig);
        generator.fs.copyTpl(generator.sourceRoot() + '/vsc-extension-quickstart.md', 'vsc-extension-quickstart.md', extensionConfig);
        generator.fs.copyTpl(generator.sourceRoot() + '/tsconfig.json', 'tsconfig.json', extensionConfig);

        generator.fs.copyTpl(generator.sourceRoot() + '/src/web/extension.ts', 'src/web/extension.ts', extensionConfig);

        generator.fs.copyTpl(generator.sourceRoot() + '/build/web-extension.webpack.config.js', 'build/web-extension.webpack.config.js', extensionConfig);
        generator.fs.copyTpl(generator.sourceRoot() + '/package.json', 'package.json', extensionConfig);

        generator.fs.copy(generator.sourceRoot() + '/.eslintrc.json', '.eslintrc.json');

        extensionConfig.installDependencies = true;
        extensionConfig.proposedAPI = false;
    }
}
