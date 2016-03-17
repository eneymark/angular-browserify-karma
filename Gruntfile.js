
module.exports = function (grunt) {

    grunt.registerTask('browserify-test-dependencies', function(){
        grunt.config.set('karma.unit.bundleFileName', 'dist/test/browserify/browserifyTest.js');
        var filesList = grunt.file.expand({filter: "isFile"},
            ['src/**/*.js']);//sources go here
        var skipped = [
            'src/skipThisFile.js'/*add files here, and they'll be skipped*/
        ];
        filesList.forEach(function(fileName, index) {
            if(skipped.indexOf(fileName) === -1){
                grunt.task.run(['set-replacement:' + fileName +':' + index, 'string-replace', 'karma:unit']);
            }
        })
    });
    grunt.registerTask('set-replacement', function(replacement, number){
        console.log('replacing for ' + replacement + ', file #' + number);
        //in large project, that number can be used to keep moving your loop, so not to process again again after breakage
        grunt.config.set('string-replace.dist.options.replacements', [{
            pattern: '@@toBeReplacedModuleName@@',
            replacement : replacement
        }]);
    });

   grunt.initConfig({

        'string-replace' : {
            dist:{
                files: [{
                    src: 'test/browserify/browserifyTest.js',
                    dest: 'dist/'
                }],
                options: {
                    replacements: []//empty cause it will be set dynamically
                }
            }
        },

        karma: {
            'unit': {
                configFile: 'test/karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },

       browserify: {
           dist: {
               files: {
                   'generated/bundle.js': ['src/app.js']
               },
               options : {
                   plugin: [
                       [
                           'remapify', [
                           //here we are mapping to modules inside src, so cwd is ./src to make it nice require(modules/myFile)
                           { src: './modules/**/*.js', expose: './', cwd : './src'},
                           //here we are providing a mapping to common
                           { src: './common/**/*.js', expose: './' } ]
                       ]
                   ]
               }
           }
       }

    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-string-replace');
};