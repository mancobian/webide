define([ 'jquery', 'underscore', 'angular', 'editor/index', 'console/index', 'browser/index' ], 
function( $, _, angular, Editor, Console, Browser ) {

var initialize = function() {
  Editor.initialize(Module);
  Console.initialize(Module);
  Browser.initialize(Module);
};

var ApplicationController = function($scope) {
  $scope.editor = {  };
  $scope.console = { visible: false, el: $("#console") };
  $scope.browser = { visible: false };
  $scope.debug = 0;
  
  $scope.$on('$viewContentLoaded', function(event) {
  });

  $scope.$on('$includeContentLoaded', function(event) {
  });

  $scope.onKeyDown = function(key) {
    // $scope.debug = "Keycode: " + key;

    switch (key) {
      case 112: { // F1
        // $scope.debug = "Key: F1";
        $scope.toggleConsole();
        break;
      }
      default: {
        break;
      }
    }; // end switch()
  };

  $scope.toggleConsole = function() {
    $scope.console.visible = !$scope.console.visible;
    // $scope.debug = "console.visible = " + $scope.console.visible
    $scope.console.visible ? Console.show() : Console.hide();
  };

  $scope.adjustEditorSize = function() {
    var width = $("browser").outerWidth(true);
    Editor.adjustSize(4, width);    
    $scope.debug = "Browser.width = " + width;
  };
}; // end ApplicationController

var ApplicationDirective = {
  controller: ApplicationController,
  restrict : 'EC',
  replace : false,
  transclude : true,
  // templateUrl: 'scripts/editor/main.partial',
  link: function(scope, element, attributes) {
  } // end link()
}; // end EditorDirective

var Module = angular.module('webide', [])
  .controller('ApplicationController', [ '$scope', function($scope) {
    ApplicationController($scope);
    $scope.$on("fileListLoaded", function() {
      $scope.adjustEditorSize();
    });
  }])
  .directive('application', function() {
    return ApplicationDirective;
  })
  .directive('onKeyDown', function() {
    return function(scope, element, attributes) {
      var eventHandler = scope.$eval(attributes.onKeyDown);
      element.bind("keydown", function(event) {
        scope.$apply(function() {
          eventHandler.call(scope, event.which);
        });
      });
    };
  });

return {
  initialize: initialize
}

}); // end define()

