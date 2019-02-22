// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
    ignoreUncaughtExceptions: true,
    directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub', 
    allScriptsTimeout: 110000,
    capabilities: {
      browserName: 'chrome',  
      chromeOptions: {
        args: [ //"--headless", 
        "--disable-gpu", "--window-size=1080,768", '--no-sandbox' ]
      }
    },
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'), 
  
    // If true, protractor will restart the browser between each test.
    // CAUTION: This will cause your tests to slow down drastically.
    restartBrowserBetweenTests: false,
    specs: [
      './features/**/*.feature'     // Specs here are the cucumber feature files
    ],
    cucumberOpts: {  
      require: [
        './features/**/*.step.ts',
      ],
      tags: false,                      // <string[]> (expression) only execute the features or scenarios with tags matching the expression
      strict: true,                  // <boolean> fail if there are any undefined or pending steps
      'dry-run': false,              // <boolean> invoke formatters without executing steps
      compiler: [],                   // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
      format: ['json:./integration/results.json']
    },
    onPrepare() {
      require('ts-node').register({
        project: require('path').join(__dirname, './tsconfig.integration.json')
      });
    }
  };