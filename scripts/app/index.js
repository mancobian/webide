define([ 'jquery', 'underscore', 'angular', 'editor/index', 'console/index' ], 
function( $, _, angular, Editor, Console ) {

var initialize = function() {
  Editor.initialize(Module);
  Console.initialize(Module);
};

var ApplicationController = function($scope) {
  $scope.editor = { url: 'scripts/editor/layout.partial' };
  $scope.console = { url: 'scripts/console/layout.partial', visible: false, el: $("#console") };
  $scope.debug = 0;

  $scope.$on('$includeContentLoaded', function(event) {
    Editor.create();
    $scope.console.el.hide();
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
    $scope.console.visible ? $scope.console.el.show() : $scope.console.el.hide();
  };
};

var Module = angular.module('webide', []).
  controller('ApplicationController', [ '$scope', function($scope) {
    ApplicationController($scope);
  }]).
  directive('onKeyDown', function() {
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
