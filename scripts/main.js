"use strict";

require.config({
  paths: {
    "jquery": 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min',
    "underscore": 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min',
    "angular": "http://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.min",
    "text": 'libs/require/text',
    "now": 'nowjs/now',
    "ace": '../node_modules/ace/lib/ace',
    "templates": '../templates'
  },
  shim: {
    angular: {
      exports: "angular"
    }
  }
});

require([ 'angular', 'app/index' ],
function( angular, app ) {
  app.initialize();
  angular.bootstrap(document, [ 'webide' ]);
});

