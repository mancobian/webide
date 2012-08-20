define([
  'jquery',
  'underscore',
  'backbone',
  'app/view',], 
function( $, _, Backbone, AppView ){

var AppRouter = Backbone.Router.extend({
  routes: {
    // Default
    '*actions': 'defaultAction'
  },
  defaultAction: function(actions){
    // We have no matching route, lets display the home page
    AppView.render();
  }
});

var initialize = function(){
  var appRouter = new AppRouter;
  Backbone.history.start();
};

return {
  initialize: initialize
};

});

