define([ 'jquery', 'underscore', 'angular', 'editor/index', 'console/index', 'browser/index' ], 
function( $, _, angular, Editor, Console, Browser ) {

var initialize = function() {
  Editor.initialize(Module);
  Console.initialize(Module);
  Browser.initialize(Module);
};

var ApplicationController = function($scope) {
  $scope.editor = { url: 'scripts/editor/main.partial' };
  $scope.console = { url: 'scripts/console/main.partial', visible: false, el: $("#console") };
  $scope.browser = { url: 'scripts/browser/layout.partial', visible: false };
  $scope.debug = 0;
  
  $scope.$on('$viewContentLoaded', function(event) {
  });

  $scope.$on('$includeContentLoaded', function(event) {
    // Editor.create();
    // Console.hide();
  });

  $scope.onKeyDown = function(key) {
    $scope.debug = "Keycode: " + key;

    switch (key) {
      case 112: { // F1
        $scope.debug = "Key: F1";
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
    $scope.debug = "console.visible = " + $scope.console.visible
    $scope.console.visible ? Console.show() : Console.hide();
  };
}; // end ApplicationController

var Module = angular.module('webide', [])
  .controller('ApplicationController', [ '$scope', function($scope) {
    ApplicationController($scope);
  }])
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

