module.exports = function(grunt) {

   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-sass');
   grunt.loadNpmTasks('grunt-githooks');
   grunt.loadNpmTasks('grunt-lintspaces');
   grunt.loadNpmTasks('grunt-notify');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-grunticon');
   grunt.loadNpmTasks( 'grunt-svgmin' );
   require('load-grunt-tasks')(grunt);
  // require('load-grunt-tasks')(grunt, {scope: 'dependencies'});

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    less: {
      style: {
        files: {
          'css/style.css': 'less/style.less'
        }
      }
    },




    watch: {
      styles: {
        files: ['less/**/*.less'],
        tasks: ['less','notify:less'],
        options: {
            spawn: false,
            livereload: true
        }
      },
      livereload: {
        files: ['*.html'],
        tasks: ['notify:html'],
        options: {
          livereload: true
        }
      }
    },




    notify: {
      less: {
        options: {
          title: 'Ура!',  // optional
          message: 'LESS героически скомпилирован', //required
        }
      },




      html: {
        options: {
          title: 'Ура-Ура!',  // optional
          message: 'HTML обновлен!', //required
        }
      }
    },



    sass: {
      style: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },


    lintspaces: {
      test: {
        src: [
          '*.html',
          'js/*.js',
          'less/*.less',
          'sass/*.sass'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },




    githooks: {
      test: {
        'pre-commit': 'lintspaces:test',
      }
    },

    copy: {
      gosha: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'css/**',
            'img/**',
            'js/**'
          ],
          dest: 'gosha',
        }]
      }
    },

    clean: {
      gosha: [
        'gosha/img/README',
        'gosha/js/README'
      ]
    },




    svgmin: {
      options: {
        plugins: [
          {
            removeDesc: true
          }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '_svg/origin',
          src: ['!!ai','*.svg'],
          dest: '_svg/svgmin'
        }]
      }
    },

    grunticon: {
    mysvg: {
        files: [{
            expand: true,
            cwd: '_svg/origin',
            src: ['*.svg', '*.png'],
            dest: "_svg/result"
        }],
        options: {
          enhanceSVG   : true,
          datasvgcss   : 'css/icons.data.svg.css',
          datapngcss   : 'css/icons.data.png.css',
          urlpngcss    : 'css/icons.fallback.css',
          previewhtml  : 'icon-preview.html',
          pngfolder    : 'img/svg/png-grunticon',
          pngpath      : '../img/svg/png-grunticon',
          template     : '_svg/template.hbs',
          defaultWidth : '200px',
          defaultHeight: '200px',
          cssprefix    : 'icon-'
        }
      }
    },
  });


grunt.registerTask('svg', [
    'clean:svg',
    'svgmin',
    'grunticon',
    'notify:svg'
  ]);

  grunt.registerTask('test', ['lintspaces:test']);


  if (grunt.file.exists(__dirname, 'less', 'style.less')) {
    grunt.registerTask('gosha', ['less:style', 'copy:gosha', 'clean:gosha']);
  } else if (grunt.file.exists(__dirname, 'sass', 'style.scss')) {
    grunt.registerTask('gosha', ['sass:style', 'copy:gosha', 'clean:gosha']);
  } else {
    grunt.registerTask('gosha', ['copy:gosha', 'clean:gosha']);
  }
};
