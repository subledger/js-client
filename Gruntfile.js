module.exports = function (grunt) {

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'doc': grunt.file.read('src/tmpl/DOC.md'),
    'banner': {
      'compact': '/*! <%= pkg.title %> <%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> | <%= pkg.licenses[0].url %> */\n',
      'full': '/*!\n' +
        ' * <%= pkg.title %> v<%= pkg.version %> - <%= pkg.description %>\n' +
        ' * <%= pkg.homepage %>\n *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        ' * Released under <%= pkg.licenses[0].type %> license\n' +
        ' * <%= pkg.licenses[0].url %>\n' +
        ' */' +
        ' \n'
    },
    'concat': {
      'library': {
        'options': {
          'stripBanners': true,
          'banner': '<%= banner.full %>'
        },
        'src': ['src/subledger.js'],
        'dest': 'build/<%= pkg.name %>.js'
      },
      'web-test': {
        'src': [
          'src/web/js/libs/underscore.js',
          'src/web/js/test-start.js',
          'src/web/js/libs/nodeunit.js',
          'test/*.js',
          'src/web/js/test.js',
          'src/web/js/test-end.js'
        ],
        'dest': 'build/web/js/test.js'
      }

    },
    'uglify': {
      'build' : {
        'options': {
          'banner': '<%= banner.compact %>'
        },
        'files': {
          'build/subledger.min.js' : 'build/subledger.js'
        }
      },
      'web' : {
        'options': {
          'banner': '<%= banner.compact %>'
        },
        'files': {
          'build/web/js/subledger.min.js' : 'build/subledger.js'
        }
      }
    },
    'jshint':{
      'options':{
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        evil: true,
        globals: {
          'JSON': true
        },
        ignores: ['src/web/js/**/*.js']
      },
      'files': ['src/*.js','src/**/*.js']
    },
    'watch':{
      files: ['package.json','Gruntfile.js','src/*','src/**/*'],
      tasks: ['default']
    },
    'template': {
      'license': {
        'options': {
          'data': {
            'year': '<%= grunt.template.today("yyyy") %>',
            'author': '<%= pkg.author.name %>',
            'homepage': '<%= pkg.homepage %>'
          }
        },
        'files': {
          'LICENSE.txt': ['src/tmpl/LICENSE.txt']
        }
      },
      'readme': {
        'options': {
          'data': {
            'title': '<%= pkg.title %>',
            'description': '<%= pkg.description %>',
            'homepage': '<%= pkg.homepage %>',
            'repository': '<%= pkg.repository.url %>',
            'doc': '<%= doc %>',
            'license': '<%= grunt.template.process(grunt.file.read("LICENSE.txt")) %>',
            'contributors': '<%= grunt.option("contributors") %>'
          }
        },
        'files': {
          'README.md': ['src/tmpl/README.md']
        }
      },
      'contributors': {
        'options': {
          'data': {
            'contributors': '<%= grunt.option("contributors") %>'
          }
        },
        'files': {
          'AUTHORS.txt': ['src/tmpl/AUTHORS.txt']
        }
      },
      'web-test': {
        'options': {
          'data': {
            'contributors': '<%= grunt.option("contributors") %>'
          }
        },
        'files': {
          'build/web/test.html': ['src/web/tmpl/test.html']
        }
      }
    }
  });

  grunt.registerTask("contributors", "Generate a list of contributors in order of first contribution", function () {
    var done = this.async();

    grunt.util.spawn({
      cmd: "git",
      args: [ "log", "--pretty=%aN <%aE>"]
    }, function (err, result) {
      if (err) {
        grunt.log.error(err);
        return done(false);
      }

      var contributors,
        tracked = {};

      contributors = result.stdout.split("\n").reverse().filter(function (author) {
        var first = !tracked[ author ];
        tracked[ author ] = true;
        return first;
      }).join("\n");

      grunt.log.writeln('List of contributors generated');
      grunt.option("contributors", contributors);
      done();
    });
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-template');


  grunt.registerTask('default', ['concat:library','uglify','jshint']);
  grunt.registerTask('build', ['contributors','concat','uglify','jshint','template']);

};