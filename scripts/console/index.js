define([ 'jquery', 'underscore', 'angular' ],
function( $, _, Angular ) {

var Module = null;

var initialize = function(App) {

  Module = App.
    controller('ConsoleController', [ '$scope', function ConsoleController($scope) {
      $scope.console = {
        text: "",
      };

      $scope.executeCommand = function() {
        // alert($scope.console.text);
        $scope.console.text = "";
      }; 

    }] // end function()
  ); // end controller()

};

return {
  initialize: initialize,
  Module: Module
};

}); // end define()
