define([ 'jquery', 'underscore', 'angular', 'ace/ace', "ace/theme/textmate", "ace/keyboard/vim" ],
function( $, _, Angular, Ace, Theme, Keybinding ) {

var Module = null;
var Editor = null;

var create = function() {
  Editor = Ace.edit("editor");
  Editor.setTheme(Theme);
  Editor.setKeyboardHandler(Keybinding.handler);
  Editor.focus();
};

var EditorController = function($scope) {
}; // end EditorController

var EditorDirective = {
  controller: EditorController,
  restrict : 'E',
  replace : false,
  transclude : true,
  templateUrl: 'scripts/editor/main.partial',
  link: function(scope, element, attributes) {
    create();
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
  Editor: Editor,
  Module: Module
};

}); // end define()
