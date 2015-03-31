module.exports = function( grunt ) {

    var path        = require( "path" ),

        pkg         = grunt.file.readJSON(  "package.json" ),

        config      = 
        ({
        
            pkg         : pkg,

            jass        : 
            {
                dev     : 
                {
                    files       :
                    {
                        './src/ue.script.js'       : pkg.main
                    }
                }
            },

            watch       : 
            {
                js      :
                {
                    files       : [ './package.json', './src/*.js', './src/**/*.js' ],

                    tasks       : [ 'jass' ]
                }
            },

            karma       : 
            {
                unit    :
                {
                    configFile  : './test/karma.conf.js' 
                }
            }/*,

            jsdoc       : 
            {
                dev     : 
                {
                    src         : [ pkg.main ],

                    jsdoc       : './node_modules/.bin/jsdoc',

                    options     : 
                    {
                        destination     : 'doc',

                        configure       : './doc/jsdoc.conf.json'
                    }
                }
            }*/
        });

    grunt.initConfig( config );

    grunt.loadNpmTasks( 'grunt-jass' );

    grunt.loadNpmTasks( 'grunt-karma' );    

    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    //grunt.loadNpmTasks( 'grunt-jsdoc' );

    grunt.registerTask( 'dev',      [ 'jass:dev' ] );

    grunt.registerTask( 'master',   [ 'jass:master' ] );

    grunt.registerTask( 'test',     [ 'karma:unit' ] );

    grunt.registerTask( 'default',  [ 'dev' ] );
};