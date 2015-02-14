// Vars
var gridSize = 50;
var pixelSize = 15;
// Build Grid
var buildGrid = function(gridSize) { 
  // Build container
  for (var row = 0; row < gridSize; row++) {
    
    // Make unique id for each row and render
    var rowString = "<div class='grid-row' id='grid-row-" + (row) + "'></div>";
    $('#grid').append(rowString);
    
    // Make unique id for each pixel and render
    for (var i = 1; i < (gridSize + 1); i++) {
      var pixelString = "<div class='pixel' id='pixel-" + (row * gridSize + i) + "'></div>";
      $('#grid-row-' + row).append(pixelString);
    }
  }       

  // Set pixel height/width
  $('.pixel').css("height", pixelSize).css("width", pixelSize);
  // Set row height
  $('.grid-row').css("height", pixelSize + 1);
  // Set container width to width of all pixels
  $('#grid').css("width", (gridSize * (pixelSize+1)) + 1).css("height", gridSize * (pixelSize+1));
};  

// Build GUI
var buildGui = function() {
// Build Grid Options

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
  for (var s = 1; s < 7; s++) {
    var swatchString = "<div class='swatch' id='swatch" + s + "'></div>";
    $('#swatch-container').append(swatchString);
  }


  $(".swatch").on("contextmenu", function(){
    return false;
  });



  // Change primary/secondary color when clicking swatch 
  $(".swatch").mousedown(function(e) {
    if (e.which === 1) {
      primaryColor = $(this).css("background");
      console.log("1");
    } else if (e.which === 3) {
      secondaryColor = $(this).css("background");
      console.log("3");
    }
  });


  // Set photo as background

  // Build save function
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
var primaryColor = "red";
var secondaryColor = "blue";
var mouseDown = false;
var initPaint = function() {
  
  // Change background of pixel to primary color on click
  
  // Change background of pixel to secondary color on right click
  $(".pixel").mousedown(function(e) {
    if (e.which === 1) {
      e.preventDefault();
      $(this).css("background", primaryColor);
    } else if (e.which === 3) { 
      e.preventDefault();
      $(this).css("background", secondaryColor);  
      }
    return false;
  });

  // Prevent right click from opening menu
  $(".pixel").on("contextmenu", function(){
    return false;
  });

  // Change background of hovered pixels on click + drag 
  $('.pixel').mousedown(function(e) {
    e.preventDefault();
    mouseDown = true;
  })
  .mouseup(function(e) {
    mouseDown = false;
  });

  $(".pixel").mouseover(function paint(e) {
    if (mouseDown) {
      if (e.which === 1) {
        $(this).css("background", primaryColor);
      } else if (e.which === 3) {    
        $(this).css("background", secondaryColor);
      }
     
    // Prevent right click on pixel from opening contextmenu
      $(".pixel").on("contextmenu", function(){
        return false;
      });
    }
  });
};

// Build History State Functionality

// Initialize App
$( document ).ready(function() {
  buildGrid(gridSize);
  buildGui();
  initPaint();
  initHistory();
});
