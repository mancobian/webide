define([ 'jquery', 'underscore', 'angular', 'ace/ace', "ace/theme/textmate", "ace/keyboard/vim" ],
function( $, _, Angular, Ace, Theme, Keybinding ) {

var Module = null;
var Editor = null;

var create = function(elem) {
  Editor = Ace.edit(elem);
  Editor.setTheme(Theme);
  Editor.setKeyboardHandler(Keybinding.handler);
  Editor.focus();
};

var adjustSize = function(direction, amount) {
  var amount = amount;
  switch (direction) {
    case 0: {
      $("editor").css("marginTop", amount);
      var height = $("body").height() - amount;
      $("editor").height(height);
      break;
    }
    case 1: {
      $("editor").css("marginRight", amount);
      var width = $("body").width() - amount;
      $("editor").width(width);
      break;
    }
    case 2: {
      $("editor").css("marginBottom", amount);
      var height = $("body").height() - amount;
      $("editor").height(height);
      break;
    }
    case 4: {
      $("editor").css("marginLeft", amount);
      var width = $("body").width() - amount;
      $("editor").width(width);
      break;
    }
    default: {
      alert ("@todo");
      break;
    }
  };
}

var EditorController = function($scope) {
}; // end EditorController

var EditorDirective = {
  controller: EditorController,
  restrict : 'E',
  replace : false,
  transclude : true,
  templateUrl: 'scripts/editor/main.partial',
  link: function(scope, element, attributes) {
    attributes.$set("id", "editor");
    create("editor");
    scope.$emit("editorLoaded");
  } // end link()
}; // end EditorDirective

var initialize = function(App) {
  Module = App
    .controller('EditorController', [ '$scope', function($scope) {
      EditorController($scope);
    }]) // end controller()
    .directive("editor", function() {
      return EditorDirective;
    });
};

return {
  initialize: initialize,
  create: create,
  adjustSize: adjustSize,
  Editor: Editor,
  Module: Module
};

}); // end define()

