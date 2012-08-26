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

  // @url http://stackoverflow.com/questions/11194287/convert-a-directory-structure-in-the-filesystem-to-json-with-node-js
  /*
  // info = {
  //   path: <string>,
  //   name: <string>,
  //   type: directory | symlink | file,
  //   children: { info[0] .. info [n] },
  // }
  */
  function dirTree (dir) {
    var stats = fs.lstatSync(dir),
      info = {
          path: dir,
          name: path.basename(dir),
          children: []
      };

    if (stats.isDirectory()) {
        info.type = "directory";
        var files = fs.readdirSync(dir);
        files.sort();
        for (var i = 0; i < files.length; ++i) {
          var file = files[i];
          var filepath = path.join(dir, file);
          info.children.push(dirTree(filepath));
        }
    }
    else if (stats.isSymbolicLink()) {
      info.type = "symlink";
    }
    else {
        // Assuming it's a file. In real life it could be a symlink or something else!
        info.type = "file";
    }
    return info;
  };

  everyone.now.getFileList = function(dir, callback) {
    if (dir === "" || dir === 'undefined') {
      dir = ".";
    }

    var files = dirTree(dir);
    // console.log (util.inspect(files, false, null));
    callback(files);
  };

  // asynchronous tree walk
  // root - root path
  // fileCb - callback function (file, next) called for each file
  // -- the callback must call next(falsey) to continue the iteration,
  //    or next(truthy) to abort the iteration.
  // doneCb - callback function (err) called when iteration is finished
  // or an error occurs.
  //
  // example:
  //
  // forAllFiles('~/',
  //     function (file, next) { sys.log(file); next(); },
  //     function (err) { sys.log("done: " + err); });
  // @url http://grammerjack.blogspot.com/2010/12/asynchronous-directory-tree-walk-in.html

  function forAllFiles(root, fileCb, doneCb) {
      fs.readdir(root, function processDir(err, files) {
          if (err) {
              fileCb(err);
          } else {
              if (files.length > 0) {
                  var file = root + '/' + files.shift();
                  fs.stat(file, function processStat(err, stat) {
                      if (err) {
                          doneCb(err);
                      } else {
                          if (stat.isFile()) {
                              fileCb(file, function(err) {
                                  if (err) {
                                      doneCb(err);
                                  } else {
                                      processDir(false, files);
                                  }
                              });
                          } else {
                              forAllFiles(file, fileCb, function(err) {
                                  if (err) {
                                      doneCb(err);
                                  } else {
                                      processDir(false, files);
                                  }
                              });
                          }
                      }
                  });
              } else {
                  doneCb(false);
              }
          }
      });
  };

}; // end initServer()

return {
  init: initServer
};

}); // end define()
