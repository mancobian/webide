define([ 'jquery', 'underscore', 'angular' ],
function( $, _, Angular ) {

var Module = null;

var BrowserController = function($scope) {
  $scope.title = "BROWSER";
  var self = this;
  $scope.tree = [];

  $scope.setFiles = function(files) {
    for (var i = 0; i < files.length; ++i) {
      $scope.tree.push(files[i]);
    };
  };

  $scope.getFileList = function() {
    var files = now.getFileList("scripts", function(files){
      $scope.setFiles(files.children);
    });
  };

  $scope.getFileList();
}; // end BrowserController

var BrowserDirective = {
  controller: BrowserController,
  restrict : 'E',
  replace : false,
  transclude : true,
  templateUrl: 'scripts/browser/main.partial'
}; // end NodesDirective

var NodesDirective = {
  controller: BrowserController,
  restrict : 'E',
  replace : false,
  transclude : true,
  templateUrl: 'scripts/browser/nodes.partial',
  scope : { items: "=ngModel" }
}; // end NodesDirective

var NodeDirective = function($compile) {
  return {
    controller: BrowserController,
    restrict : 'E',
    templateUrl: 'scripts/browser/node.partial',
    link: function(scope, element, attributes) {
      if (scope.item.children.length > 0) {
        var child = $compile("<nodes ng-model='item.children'></nodes>")(scope);
        element.append(child);
      }
    } // end link()
  };
}; // end NodeDirective 

var initialize = function(App) {
  Module = App
    .controller('BrowserController', [ '$scope', function($scope) {
      BrowserController($scope);
    }])
    .directive('browser', function() { 
      return BrowserDirective;
    })
    .directive('nodes', function() { 
      return NodesDirective;
    })
    .directive('node', function($compile) {
      return NodeDirective($compile);
    });
};

return {
  initialize: initialize,
  Module: Module
};

}); // end define()
