/*global module:false, require:false*/
var path = require('path');

module.exports = function(grunt) {

  function targetSequence(folders, targetData){
  
    if (typeof folders === 'string') {
      folders = grunt.file.expandDirs(folders);
    }
    else if (typeof folders === 'array') {
      folders = folders.map(function(f){ return f + '/'; });
    }
    var obj = {};
    for (var i = 0; i < folders.length; i++) {
      var folder = folders[i];
      obj[folder] = {};
      
      for(var key in targetData){
          if(targetData.hasOwnProperty(key)){
              obj[folder][key] = folder + targetData[key];
          }
      }
    }
    return obj;
  }
  console.log (">>>>>>>", targetSequence(
      'projects/*',
      {
        src: 'templates/*/*.html',
        data:'data/*.json',
        dest:'out'
      }
    ));

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

//    wkhtmltopdf: {
//      src: 'projects/sample/out/*/*.html',
//      dest: 'projects/sample/out'
//    },

    template: targetSequence( 'projects/*', {
      src: 'templates/*/*.html',
      json:'data/*.json',
      dest:'out'
    }),

    wkhtmltopdf: targetSequence( 'projects/*', {
      src: 'out/*/*.html',
      dest:'out'
    })
  });

  // Default task.
  grunt.registerTask('default', 'lint template wkhtmltopdf');

  //grunt.loadTasks('../grunt-wkhtmltopdf/tasks');
  grunt.loadNpmTasks('grunt-wkhtmltopdf');

  // Create templating task.
  grunt.registerMultiTask('template', 'Apply templates', function() {

    var tplFiles = grunt.file.expandFiles(this.data.src),
        dataFiles = grunt.file.expandFiles(this.data.json),
        dest = (this.data.dest && this.data.dest !== '') ? this.data.dest + '/' : '';

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