if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define (['now', 'http', 'fs', 'path', 'util', 'child_process'],
function(now, http, fs, path, util, child_process) {

var initServer = function(server) { 

  var everyone = now.initialize(server);

  everyone.now.log = function(msg) {
    console.log (msg);
  };

  // @todo Consider replacing exec(...) with spawn(...).
  // @url http://stackoverflow.com/questions/10232192/exec-display-stdout-live
  everyone.now.exec = function(command, callback) {
    var exec = child_process.exec;
    var child = exec(command, function(error, stdout, stderr) {
      var result = "";
      if (error) {
        // result = error;
        result = "Command not found: " + command;
      }
      else if (stdout) {
        // result = stdout.replace(/(\r\n|\n|\r)/gm, "<br />");
        result = stdout;
      }
      else if (stderr) {
        // result = stderr.replace(/(\r\n|\n|\r)/gm, "<br />");
        result = stderr;
      }

      callback(result);
    }); 
  };

  everyone.now.openFile = function(filename, callback) 
  {
    console.log (filename);
    path.exists(filename, function(exists) 
    {
      if (!exists) 
      {
        everyone.now.onFileLoaded("No such file.", "");
        return;
      }

      fs.readFile(filename, function(error, content) 
      {
          callback(error, content.toString('utf8'));
      });
    });
  };
}; // end initServer()

return {
  init: initServer
};

}); // end define()
