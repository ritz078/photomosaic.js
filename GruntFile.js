module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        // Banner definitions
        meta: {
            banner: "/*\n" +
                " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
                " *  <%= pkg.description %>\n" +
                " *  <%= pkg.homepage %>\n" +
                " *\n" +
                " *  Made by <%= pkg.author.name %>\n" +
                " *  Under <%= pkg.license %> License\n" +
                " */\n"
        },

        jshint: {
            files: ["src/photomosaic.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        uglify: {
            my_target: {
                src: ["dist/photomosaic.js"],
                dest: "dist/photomosaic.min.js"
            },
            options: {
                banner: "<%= meta.banner %>",
                compress: {
                    drop_console: true
                }
            }
        },

        copy: {
            main: {
                src: 'src/photomosaic.js',
                dest: 'dist/photomosaic.js'
            }
        },

        clean: ["dist"],

        mocha: {
            test: {
                src: ['test/testrunner.html'],
                options:{
                	run:true
                }
            },
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mocha')

    grunt.registerTask("default", ["clean", "jshint", "copy", "uglify"]);
    grunt.registerTask("test", ["mocha"]);
}
