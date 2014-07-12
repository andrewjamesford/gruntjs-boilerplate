module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          // cssmin will minify later
          style: 'expanded',
          sourcemap: true
        },
        files: {
          'css/build/screen.css': 'sass/screen.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'css/build/*.css',
        dest: 'css/build/prefixed/'
      }
    },

    cssmin: {
      combine: {
        files: {
          'css/build/minified/screen.css': ['css/build/prefixed/screen.css']
        }
      }
    },

    jshint: {
      beforeconcat: ['js/*.js']
    },

    concat: {
      dist: {
        src: [
          'js/libs/*.js',
          'js/main.js'
        ],
        dest: 'js/build/main.js'
      }
    },

    uglify: {
      build: {
        src: 'js/build/main.js',
        dest: 'js/build/main.min.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },

    uncss: {
      dist: {
        files: {
          'css/build/tidy/screen.css': ['*.html']
        }
      }
    },

    browser_sync: {
      files: {
        src : [
            '/css/*.css',
            '*.html'
            ]
      },
            options: {
                watchTask: true,
            }
    },

    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['sass/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
          spawn: false,
        }
      },
      html: {
        files: ['*.html'],
        options: {
          spawn: false,
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['concat', 'uglify', 'sass']);

  grunt.registerTask('dev', ['watch']);

  grunt.registerTask('sync', ['browser_sync', 'watch']);

  grunt.registerTask('prod', ['concat', 'uglify', 'sass', 'autoprefixer', 'uncss', 'cssmin', 'imagemin']);

};