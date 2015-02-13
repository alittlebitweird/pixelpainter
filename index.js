// Vars
var gridSize = 30;
var pixelSize = 15;
// Build Grid
var buildGrid = function(gridSize) { 
  // Build container
  $('body').append("<div id='grid-container'></div>");
  for (var row = 1; row < gridSize + 1; row++) {
    
    // Make unique id for each row and render
    var rowString = "<div class='row' id='row" + row + "'></div>";
    console.log(rowString);
    $('#grid-container').append(rowString);
    
    // Make unique id for each pixel and render
    for (var i = 1; i < gridSize + 1; i++) {
      var pixelString = "<div class='pixel' id='pixel" + i + "'></div>";
      $('#row' + row).append(pixelString);
    }
  }       

  // Set container width to width of all pixels
  $('#grid-container').css("width", gridSize * (pixelSize+1));
};  
// Build color swatch

// Initialize App

$( document ).ready(function() {
  buildGrid(gridSize);
});
