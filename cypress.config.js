const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    test_url: "https://8ca46caf-f1d0-4faa-a1c2-7036fa9f044f.mock.pstmn.io",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
