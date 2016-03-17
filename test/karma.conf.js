module.exports = function (config) {
    var files = [
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/angular-mocks/angular-mocks.js'
    ];
    var srcCodeFiles = [
        'src/**/*.js',
        'common/**/*.js',
        'test/**/*.js'
    ];
    if(config.bundleFileName) {
       files.push(config.bundleFileName);
    }
    else {
        files = files.concat(srcCodeFiles);
    }
    config.set({
        basePath: '../',

        files: files,

        exclude: [
            'test/browserify/browserifyTest.js'
        ],

        preprocessors: {
            'src/**/*.js': ['browserify'],
            'common/**/*.js': ['browserify'],
            'dist/test/**/*.js': ['browserify']
        },
        autoWatch: false,
        frameworks: ['jasmine','browserify'],

        browsers: ['Chrome'],
        browserify: {
            plugin: [
                [
                    'remapify', [
                    { src: './modules/**/*.js', expose: './', cwd : './src'},
                    { src: './src/**/*.js', expose: './'},
                    { src: './common/**/*.js', expose: './' } ]
                ]
            ]
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-browserify'
        ]
    });
};