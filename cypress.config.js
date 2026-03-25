const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const braveBrowser = {
        name: 'brave',
        channel: 'stable',
        family: 'chromium',
        displayName: 'Brave',
        version: 'stable',
        path: String.raw`C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe`,
        majorVersion: 120,
      };

      return {
        browsers: config.browsers.concat(braveBrowser),
      };
    },
  },
});