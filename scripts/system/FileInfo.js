define('FileInfo', [ 'jquery', 'underscore', 'angular' ], 
function( $, _, angular ) {

function FileInfo() {
  this.path = "";
  this.name = "";
  this.type = "";
  this.children = [];
}; // end FileInfo()

// FileInfo.prototype.test = function() {
// }; // end test()

return FileInfo;

}); // end define()
