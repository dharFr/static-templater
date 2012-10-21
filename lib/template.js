/*global module:false*/
module.exports.init = function(grunt) {

  "use strict";

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