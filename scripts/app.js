define([ 'jquery', 'underscore', 'angular', 'editor/index' ], 
function( $, _, angular, Editor ) {

var initialize = function() {
  Editor.initialize(Module);
};

var Module = angular.module('webide', []).
  controller('ApplicationController', [ '$scope', function ApplicationController($scope) {
    $scope.templates = [
      { url: 'scripts/editor/layout.partial' },
    ];
    $scope.template = $scope.templates[0];
  }]);

return {
  initialize: initialize
}

}); // end define()
