/*global module:false*/
module.exports.init = function(grunt) {

  "use strict";

  return function targetSequence(folders, targetData){
  
    if (typeof folders === 'string') {
      folders = grunt.file.expandDirs(folders);
    }
    else if (Array.isArray(folders)) {
      folders = folders.map(function(f){ return f + '/'; });
    }
    var obj = {};

    var createReplacer = function(folder){
      return function(prop){
        return prop.replace(/%%/g, folder);
      };
    };

    for (var i = 0; i < folders.length; i++) {
      
      var folder = folders[i];
      var replacer = createReplacer(folder);
      obj[folder] = {};
      
      for(var key in targetData){
        
        if(targetData.hasOwnProperty(key)){
          var taskProp = targetData[key];

          if (typeof taskProp === 'string') {
            obj[folder][key] = replacer(taskProp);
          }
          else if (Array.isArray( taskProp )) {
            obj[folder][key] = taskProp.map(replacer);
          }
        }
      }
    }
    return obj;
  };
};