// Vars
var size = 50;

// Build Grid
$( document ).ready(function() {
  // Build container
  $('body').append("<div id='grid-container'></div>");
  for (var row = 0; row < size; row++) {
    // Make unique id for each row and render
    var rowString = "<div class='row' id='row" + (row + 1) + "'></div>";
    console.log(rowString);
    $('#grid-container').append(rowString);
    
    // Make unique id for each pixel and render
    for (var i = 0; i < (size); i++) {
      var pixelString = "<div class='pixel' id='pixel" + i + "'></div>";
      $('#row' + (i +1)).append(pixelString);
    }
  }       
});
