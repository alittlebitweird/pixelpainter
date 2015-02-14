// Vars
var gridSize = 30;
var pixelSize = 25;
// Build Grid
var buildGrid = function(gridSize) { 
  // Build container
  for (var row = 0; row < gridSize; row++) {
    
    // Make unique id for each row and render
    var rowString = "<div class='row' id='row-" + (row) + "'></div>";
    $('#grid-container').append(rowString);
    
    // Make unique id for each pixel and render
    for (var i = 1; i < (gridSize + 1); i++) {
      var pixelString = "<div class='pixel' id='pixel-" + (row * gridSize + i) + "'></div>";
      $('#row-' + row).append(pixelString);
    }
  }       

  // Set pixel height/width
  $('.pixel').css("height", pixelSize).css("width", pixelSize);
  // Set row height
  $('.row').css("height", pixelSize);
  // Set container width to width of all pixels
  $('#grid-container').css("width", gridSize * (pixelSize+1)).css("height", gridSize * (pixelSize+1));
};  

// Build GUI
var buildGui = function() {
// Build heading 
  $('#grid-container').after("<div id='gui-container'><h1>Pixel Paint</h1></div>");

// Build Grid Options
  $('#gui-container').append("<div id='grid-options-container'></div>");
  $('#gui-container').append("<h3 class='grid-options-label'>Grid Size</h3>");
  $('#grid-options-container').append("<form><input type='text', placeholder='30', name='grid-size'/>");

  $('#gui-container').append("<h3 class='grid-options-label'>Pixel Size</h3>");
  $('#grid-options-container').append("<input type='text', placeholder='25', name='pixel-size'/>");

  // Change grid size
  $('input[name=grid-size]').keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      gridSize = $('input[name=grid-size]').val();
      $('#grid-container').empty();
      buildGrid(gridSize);
    }
  });
     
  // Change pixel size
  $('input[name=pixel-size]').keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      pixelSize = $('input[name=pixel-size]').val();
      $('#grid-container').empty();
      buildGrid(gridSize);
    }
  });

  // Build color swatch
  $('#gui-container').append("<div id='swatch-container'></div>");
  $('#gui-container').append("<h3 id='swatch-label'>Choose Color</h3>");
  for (var s = 1; s < 7; s++) {
    var swatchString = "<div class='swatch' id='swatch" + s + "'></div>";
    $('#swatch-container').append(swatchString);
  }

  // Change selected color when clicking swatch 
  $(".swatch").click(function selectColor() {
    selectedColor = $(this).css("background");
  });


  // Set photo as background

  // Build save function
  $('#gui-container').append("<div id='save-container'></div>");
  $('#save-container').append("<a href='#' id='save'>Save Image</a>");
  $('#save').click(function() {
    var save = [];
    for (var p = 1; p < (gridSize * gridSize); p++) {
     var color = $("#pixel-" + p).css("background");  
     save.push(color);
    }
    console.log(save);
    JSON.stringify(save);
    console.log(JSON.stringify(save));
  });
};

// Paint
var selectedColor = "red";
var mouseDown = false;
var initPaint = function() {
  
  // Change background of pixel on click
  $(".pixel").mousedown(function pencil() {
    $(this).css("background", selectedColor);  
  });

  // Change background of hovered pixels on click + drag 
  $('.pixel').mousedown(function(e) {
    e.preventDefault();
    mouseDown = true;
  })
  .mouseup(function(e) {
    mouseDown = false;
  });

  $(".pixel").mouseover(function paint() {
    if (mouseDown) {
      $(this).css("background", selectedColor);
    }
  });
  
};

// Initialize App
$( document ).ready(function() {
  $('body').append("<div id='grid-container'></div>");
  buildGrid(gridSize);
  buildGui();
  initPaint();
});
