/*global module:false*/
module.exports = function(grunt) {

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
      files: ['grunt.js']
    },
    template: {
      src: 'in/templates/*/*.html',
      data: 'in/data/*.json',
      dest: 'out'
    },
    wkhtmltopdf: {
      src: 'out/*/*.html',
      dest: 'out'
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint template wkhtmltopdf');

  grunt.loadNpmTasks('grunt-wkhtmltopdf');

  // Create templating task.
  grunt.registerTask('template', 'Apply templates', function() {

    grunt.config.requires('template.src');
    grunt.config.requires('template.data');

    var conf = grunt.config('template');

    var tplFiles = grunt.file.expandFiles(conf.src),
        dataFiles = grunt.file.expandFiles(conf.data),
        dest = (conf.dest && conf.dest !== '') ? conf.dest + '/' : '';

    tplFiles.forEach(function(tplpath) {

      dataFiles.forEach(function(datapath){

        grunt.log.writeln("Processing template '"+tplpath+"' with data from '"+datapath+"'");
        var tpl = grunt.file.read(tplpath);
        var data = grunt.file.readJSON(datapath);

        var content = grunt.template.process(tpl, data),
            destpath  = dest +
                        tplpath.replace(/.*\/([^\/]+)\/[^\/]+\.html/, '$1') +
                        '/' +
                        datapath.replace(/.*\/([^\/]+)\.json/, '$1.html');

        grunt.log.writeln("Writing processed file to '"+destpath+"'");

        grunt.file.write(destpath, content);

        //content = grunt.helper('concat', [destpath, '<banner>']);
        //grunt.file.write(destpath, content);
      });
    });
  });
};