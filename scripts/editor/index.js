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

var initialize = function(App) {

  Module = App.
    controller('EditorController', [ '$scope', function EditorController($scope) {
      
      $scope.editorTemplates = [
        { url: 'scripts/editor/layout2.partial' },
      ];

      $scope.editorTemplate = $scope.editorTemplates[0];
      
      $scope.$on('$includeContentLoaded', function(event) {
        create();
      });

    }] // end function()
  ); // end controller()

};

return {
  initialize: initialize,
  Editor: Editor,
  Module: Module
};

}); // end define()
