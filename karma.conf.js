module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'client/bower_components/angular/angular.js',
            'client/bower_components/angular-cookies/angular-cookies.js',
            'client/bower_components/angular-resource/angular-resource.js',
            'client/bower_components/angular-route/angular-route.js',
            'client/bower_components/angular-sanitize/angular-sanitize.js',
            'client/bower_components/angular-socket-io/socket.js',
            'client/bower_components/angular-mocks/angular-mocks.js',
            'client/app/app.js',
            'client/app*/**/*.js',
            'client/components/**/*.js'

        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
