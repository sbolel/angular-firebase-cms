/** TODO
 *  - add qunit tests
 */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      client: {
        options: {
          port: 4000,
          base: './demo',
          livereload: true,
          open: {
            target: 'http://localhost:4000',
            appName: 'Google Chrome',
          }
        }
      }
    },

    cssmin: {
      options: {
        sourceMap: true,
        shorthandCompacting: true
      },
      target: {
        files: {
          'demo/assets/release/app.min.css': ['demo/assets/css/*.css', '!**/*.min.css']
        }
      }
    },

    jshint: {
      options: {
        smarttabs: true
      },
      all: [
        'Gruntfile.js',
        'src/**/*.js',
        'demo/**/*.js',
        '!demo/**/*.min.js',
        '!demo/lib/**/*.js',
        '!demo/bower_components/**/*.js',
      ]
    },

    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.js': 'src/client.js',
          'demo/lib/<%= pkg.name %>.js': 'src/client.js', // TODO copy file instead of re-annotating
          'demo/app.js': 'demo/app.js'
        }
      },
      demo: {
        files: {
          'demo/app.js': 'demo/app.js'
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js',
          'demo/lib/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js' // TODO use copy instead of re-uglifying
        }
      }
    },

    watch: {
      html: {
        files: ['demo/**/*.html', '!demo/bower_components/**/*'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['demo/**/*.js', '!demo/bower_components/**/*'],
        options: {
          livereload: true
        }
      },
      bower: {
        files: ['bower.json'],
        tasks:['wiredep']
      }
    },

    wiredep: {
      options: {
        cwd: '../<%= pkg.name %>'
      },
      task: {
        devDependencies: true,
        src: ['demo/index.html']
      },
    }

  });

  /** load npm Grunt tasks */
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-wiredep');

  /** register Grunt tasks */
  // TODO execute unit tests
  grunt.registerTask('test', ['jshint']);
  // build /src -> /dist (annotate & uglify /src)
  grunt.registerTask('build:src', ['test', 'ngAnnotate:dist', 'uglify:dist']);
  // build /src -> [/dist, /demo/lib] && Annotate /demo/*.js
  grunt.registerTask('build', ['test', 'ngAnnotate', 'uglify', 'wiredep']);
  // build & run demo application
  grunt.registerTask('serve', ['build', 'cssmin', 'connect', 'watch']);
  // serve demo app by default
  grunt.registerTask('default', ['serve']);

};
