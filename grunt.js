/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // pkg: '<json:package.json>',
    // meta: {
    //   banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    //     '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    //     '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
    //     '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    //     ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    // },
    lint: {
      files: ['grunt.js']
    },
    // concat: {
    //   dist: {
    //     src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   }
    // },
    // min: {
    //   dist: {
    //     src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
    //     dest: 'dist/<%= pkg.name %>.min.js'
    //   }
    // },
    template: {
        src: 'templates/*/*.html',
      data: 'data/*.json',
      dest: 'out/html'
    },
    wkhtmltopdf: {
      src: 'out/html/*/*.html',
      dest: 'out/pdf'
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint template wkhtmltopdf');

  grunt.loadNpmTasks('grunt-wkhtmltopdf');
  //grunt.loadTasks('../grunt-wkhtmltopdf/tasks');

  // Create a new task.
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
      });
    });
  });
};