module.exports = function(grunt) {

   //grunt.loadNpmTasks('grunt-contrib-copy');
   //grunt.loadNpmTasks('grunt-contrib-clean');
   //grunt.loadNpmTasks('grunt-contrib-less');
   //grunt.loadNpmTasks('grunt-sass');
   //grunt.loadNpmTasks('grunt-githooks');
   //grunt.loadNpmTasks('grunt-lintspaces');
   //grunt.loadNpmTasks('grunt-notify');
   //grunt.loadNpmTasks('grunt-contrib-watch');
   //grunt.loadNpmTasks('grunt-grunticon');
   //grunt.loadNpmTasks( 'grunt-svgmin' );

require('load-grunt-tasks')(grunt);
//require('load-grunt-tasks')(grunt, {scope: ['devDependencies', 'dependencies']});

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
      },



      svg: {
        options: {
          title: '!',  // optional
          message: 'Все ок!', //required
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
          'js/scripts.js',
          'js/mustache.min.js',
          'less/*.less',
          'sass/*.sass'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      },
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
      ],
      svg: [
        'css/icons.data.png.css',
        'css/icons.data.svg.css',
        'css/icons.fallback.css',
        'img/png-grunticon',
        '_svg/svgmin'
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
            cwd: '_svg/svgmin',
            src: ['*.svg', '*.png'],
            dest: "./"
        }],
        options: {
          enhanceSVG   : true,
          datasvgcss   : 'css/icons.data.svg.css',
          datapngcss   : 'css/icons.data.png.css',
          urlpngcss    : 'css/icons.fallback.css',
          loadersnippet: 'js/grunticon.loader.js',
          previewhtml  : 'icon-preview.html',
          pngfolder    : 'img/png-grunticon',
          pngpath      : '../img/spng-grunticon',
          template     : '_svg/template.hbs',
          defaultWidth : '200px',
          defaultHeight: '200px',
          customselectors: {
                "twitter": [".social__btn--twitter:before"],
                "facebook": [".social__btn--facebook:before"],
                "youtube": [".social__btn--youtube:before"],
                "blog-post-icon": [".article-preview--icon:before"],
                "quotes": [".context--quotes:before"]
          },
        }
      }
    }
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
