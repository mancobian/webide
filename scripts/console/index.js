define([ 'jquery', 'underscore', 'angular' ],
function( $, _, Angular ) {

var Module = null;

var ConsoleController = function($scope) {
  $scope.console = {
    text: "",
  };

  $scope.addConsoleHistoryItem = function(command, item, classType) {
    var tag = "div";
    if (classType === "response") {
      tag = "pre"; 
    }

    // Add the new item to the console history
    var html = "<div class='command console-history-item'>" + command + "</div>";
    html += "<" + tag + " class='" + classType + " console-history-item'>" + item + "</" + tag + ">";
    $('#console-history').append(html);

    // Forces console history to scroll to the bottom without delay
    $('#console-history').animate(
      { scrollTop: $('#console-history')[0].scrollHeight }, 0
    );
  }; // end function addConsoleHistoryItem()

  $scope.executeCommand = function() {
    var command = $scope.console.text;

    switch (command) {
      case "clear": {
        $('#console-history').html('');
        break;
      }
      case "open": {
        var filename = tokens[1];
        now.openFile (filename, function(error, content) {
          var mode = Mode.getModeFromPath(filename);
          console.editor.getSession().setValue(content);
          console.editor.getSession().modeName = mode.name;
          console.editor.getSession().setMode(mode.mode);
          $scope.addConsoleHistoryItem(command, 'Ok.', 'response');
        });
        break;
      }
      case "ls": {
        now.exec (command, function(result) {
          if (result) {
            $scope.addConsoleHistoryItem(command, result, 'response');
          }
        });
        break;
      }
      default: {
        // @todo ...
        // addConsoleHistoryItem("Unsupported command: " + command, 'error');
        now.exec (command, function(result) {
          if (result) {
            $scope.addConsoleHistoryItem(command, result, 'response');
          }
        });
        break;
      }
    }; // end switch() 

    $scope.console.text = "";
  }; // end function executeCommand() 
};

var initialize = function(App) {
  Module = App.
    controller('ConsoleController', [ '$scope', function($scope) {
      ConsoleController($scope);
    }]);
};

return {
  initialize: initialize,
  Module: Module
};

}); // end define()
