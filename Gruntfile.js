module.exports = function(grunt) {
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
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
            'license':'<%= grunt.template.process(grunt.file.read("LICENSE.txt")) %>'
          }
        },
        'files': {
          'README.md': ['src/tmpl/README.md']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-git-authors');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task(s).
  grunt.registerTask('default', ['template']);

};