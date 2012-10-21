/*global module:false, require:false*/
var path = require('path');

module.exports = function(grunt) {
  'use strict';

  // targetSequence helper function
  var targetSequence = require('./lib/targetSequence').init(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      name: 'static-template-engine',
      banner: '<!--\n' +
              'Generated with <%= meta.name %> - v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>\n' +
              '<%= pkg.homepage %>\n' +
              'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
              ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n' +
              '-->'
    },
    lint: {
      files: ['lib/*', 'grunt.js']
    },

    template: targetSequence( 'projects/*', {
      src: '%%templates/*/*.html',
      json:'%%data/*.json',
      dest:'%%out'
    }),

    wkhtmltopdf: targetSequence( 'projects/*', {
      src: '%%out/*/*.html',
      dest:'%%out'
    }),

    watch: targetSequence( 'projects/*', {
      files: ['%%templates/*/*.html', '%%data/*.json'],
      tasks:'template:%% wkhtmltopdf:%%'
    }),

    jshint: {
      options: {
        maxcomplexity: 4,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint template wkhtmltopdf');

  //grunt.loadTasks('../grunt-wkhtmltopdf/tasks');
  grunt.loadNpmTasks('grunt-wkhtmltopdf');

  // Create templating task.
  require('./lib/template').init(grunt);
};