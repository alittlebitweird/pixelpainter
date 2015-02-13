// Vars
var size = 50;

// Build Grid
$( document ).ready(function() {
  // Build container
  $('body').append("<div class='grid-container'></div>");
  for (var row = 0; row < size; row++) {
    $('.grid-container').append("<div class='row' "+ row + "></div>");
    for (var i = 0; i < (size); i++) {
      $('.row[i]').append("<div class='pixel" + i + "'></div>");
    }
  }       
});
