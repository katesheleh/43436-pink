module.exports = function(grunt) {

require('load-grunt-tasks')(grunt);


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    less: {
      style: {
        files: {
          'src/css/style.css': 'src/less/style.less'
        }
      },
       dist: {
        files: {
          'dist/css/style.css': 'src/less/style.less'
        }
      }
    },





    watch: {
      styles: {
        files: ['src/less/**/*.less'],
        tasks: ['less','notify:less'],
        options: {
            spawn: false,
            livereload: true
        }
      },

      livereload: {
        files: ['src/*.html'],
        tasks: ['notify:html'],
        options: {
          livereload: true
        }
      },

       scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['notify:concat'],
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
          title: 'SVG',  // optional
          message: 'Все ок!', //required
        }
      },

      concat: {
        options: {
          title: 'Ты крут!',  // optional
          message: 'работаешь с JS', //required
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
          'src/*.html',
          '!src/icon-preview.html',
          'src/js/scripts.js',
          'src/less/*.less',
          'src/sass/*.sass'
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
      },
      make: {
        files: [{
          expand: true,
          cwd: 'src',
          src: [
            'img/**/*',
            'css/**',
            'index.html',
            'form.html',
            'blog.html',
            'post.html',
            'js/build/*.js',
            'js/lib/*.js'
          ],
          dest: 'dist',
        }]
      }
    },


    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      file: {
        src: 'dist/css/style.css'
      }
    },


    cmq: {
      style: {
        files: {
          'dist/css/style.css': ['dist/css/style.css']
        }
      }
    },


    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: 'gzip'
        },
        files: {
          'dist/css/style.min.css': ['dist/css/style.css']
        }
      }
    },



    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      },
      html: {
        files: {
          'dist/index.min.html': 'dist/index.html',     //'destination': 'source'
          'dist/form.min.html': 'dist/form.html',
          'dist/blog.min.html': 'dist/blog.html',
          'dist/post.min.html': 'dist/post.html'
        }
      }
    },



    prettify: {
      options: {
        config: '.htmlprettifyrc'
      },
      all: {
        expand: true,
        //cwd: 'dist/*.html',
        ext: '.html',
        src: ['dist/*.html']
        //dest: 'dist/*.html'
      }
    },




    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          //cwd: 'dist/img/**/*',
          src: ['dist/img/**/*.{png,jpg}']
          //dest: 'dist/img/**/*'
        }]
      }
    },



    csscomb: {
      style: {
        expand: true,
        src: ["src/less/**/*.less"]
      }
    },



    concat: {
      app: {
        src: ['src/js/modules/*.js', 'src/js/scripts.js'],
        dest: 'src/js/build/scripts.js'
      }
    },



    clean: {
      gosha: [
        'gosha/img/README',
        'gosha/js/README'
      ],
      svg: [
        'src/css/icons.data.png.css',
        'src/css/icons.data.svg.css',
        'src/css/icons.fallback.css',
        'src/img/png-grunticon',
        'src/_svg/svgmin'
      ],
      finish: [
        'dist'
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
          cwd: 'src/_svg/origin',
          src: ['!!ai','*.svg'],
          dest: 'src/_svg/svgmin'
        }]
      }
    },

    grunticon: {
    mysvg: {
        files: [{
            expand: true,
            cwd: 'src/_svg/svgmin',
            src: ['*.svg', '*.png'],
            dest: "src"
        }],
        options: {
          enhanceSVG   : true,
          datasvgcss   : 'src/css/icons.data.svg.css',
          datapngcss   : 'src/css/icons.data.png.css',
          urlpngcss    : 'src/css/icons.fallback.css',
          loadersnippet: 'src/js/lib/grunticon.loader.js',
          previewhtml  : 'src/icon-preview.html',
          pngfolder    : 'src/img/png-grunticon',
          pngpath      : '../img/spng-grunticon',
          template     : 'src/_svg/template.hbs',
          defaultWidth : '200px',
          defaultHeight: '200px',
          customselectors: {
                "twitter": [".social__btn--twitter:before"],
                "facebook": [".social__btn--facebook:before"],
                "youtube": [".social__btn--youtube:before"],
                "blog-post-icon": [".article-preview--icon:before"],
                "quotes": [".context--quotes:before"],
                "triangle-white-footer": [".map--triangle-white-footer:before"]
          },
        }
      }
    }
  });



  grunt.registerTask('fit', [
   'clean:finish',
   'copy:make',
   'less:dist',
   'autoprefixer',
   'cmq',
   'cssmin',
   'imagemin',
   'prettify',
   'htmlmin'
  ]);


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
