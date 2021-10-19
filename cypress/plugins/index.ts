/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const rimraf = require('rimraf');
const fs = require('@/utils/fs');

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('before:browser:launch', (browser: any = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--auto-open-devtools-for-tabs');
    }

    if (browser.name.indexOf('chrome') > -1) {
      const loadExtensions = [
        path.join(__dirname, '../extensions/ignore-x-frame-headers'),
        path.join(__dirname, '../extensions/classic-cache-killer'),
      ];

      launchOptions.args.push(`--load-extension=${loadExtensions.join(',')}`);

      const disableFeatures = [
        'CrossSiteDocumentBlockingIfIsolating',
        'CrossSiteDocumentBlockingAlways',
        'IsolateOrigins',
        'site-per-process',
      ];

      launchOptions.args.push(`--disable-features=${disableFeatures.join(',')}`);
    }

    return launchOptions;
  });

  on('task', {
    async writeFiles(args) {
      await new Promise((resolve) => rimraf(args.basePath, resolve));
      await fs.createDir(args.basePath);

      const writeFilePromises = Object.entries(args.filesByName).map(([name, content]) => {
        const filename = path.join(args.basePath, name);
        return fs.writeFile(filename, content, 'utf8');
      });

      return await Promise.all(writeFilePromises);
    },
  });
};
