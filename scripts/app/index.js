define([ 'jquery', 'underscore', 'angular', 'editor/index', 'console/index' ], 
function( $, _, angular, Editor, Console ) {

var initialize = function() {
  Editor.initialize(Module);
  Console.initialize(Module);
};

var Module = angular.module('webide', []).
  controller('ApplicationController', [ '$scope', function ApplicationController($scope) {
    $scope.editor = { url: 'scripts/editor/layout.partial' };
    $scope.console = { url: 'scripts/console/layout.partial', visible: false, el: $("#console") };
    $scope.debug = 0;

    $scope.$on('$includeContentLoaded', function(event) {
      Editor.create();
      $scope.console.el.hide();
    });

    $scope.onKeyDown = function(key) {
      $scope.debug = key;

      switch (key) {
        case 112: { // F1
          $scope.debug = "F1";
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
      $scope.debug = $scope.console.visible
      $scope.console.visible ? $scope.console.el.show() : $scope.console.el.hide();
    };
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
