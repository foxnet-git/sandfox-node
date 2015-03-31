// Karma configuration
// Generated on Thu Dec 11 2014 15:45:16 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        '../dist/ue-script.js',
        'unit/unit-ue-core-number.js',
        'unit/unit-ue-core-string.js',
        'unit/unit-ue-core-collection.js',
        'unit/unit-ue-core-object.js',
        'unit/unit-ue-core-array.js'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'html'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Opera', 'Safari', 'IE', 'Firefox'/*'ChromeCanary', 'Safari', 'PhantomJS', 'Opera', 'IE'*/],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true, //false//true

    plugins : [
        
        // Frameworks

        'karma-jasmine',
        'jasmine-core',

        // Reporters 

        'karma-htmlfile-reporter',
        //'karma-benchmark-reporter',

        // Launchers

        'karma-ie-launcher',
        'karma-chrome-launcher',
        'karma-opera-launcher',
        'karma-phantomjs-launcher',
        'karma-safari-launcher',
        'karma-firefox-launcher'
    ],

    htmlReporter: {
      outputFile: 'report/units.html'
    },

    customLaunchers: {
        IE9: 
        {
            base: 'IE',
            'x-ua-compatible': 'IE=EmulateIE9'
        },
        IE8: {
            base: 'IE',
            'x-ua-compatible': 'IE=EmulateIE8'
        }
    }
  });
};
