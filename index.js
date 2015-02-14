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

var buildGui = function() {

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

  // Save color to swatch on right click, use color in swatch on click 
  $(".swatch").mousedown(function(e) {
    if (e.which === 1) {
      primaryColor = $(this).css("background");
    } else if (e.which === 3) {
      $(this).css("background", primaryColor);
    }
  });

  $(".swatch").on("contextmenu", function(){
    return false;
  });

  // Build color picker
  ColorPicker.fixIndicators(
    document.getElementById('slider-indicator'),
    document.getElementById('picker-indicator'));

  ColorPicker(
    document.getElementById('slider'), 
    document.getElementById('picker'), 

    function(hex, hsv, rgb, pickerCoordinate, sliderCoordinate) {

      ColorPicker.positionIndicators(
        document.getElementById('slider-indicator'),
        document.getElementById('picker-indicator'),
        sliderCoordinate, pickerCoordinate
      );  

      // Set primary color to selected color
      $("#picker").click(function(e) {
          primaryColor = hex;
          //document.body.style.backgroundColor = hex;
      });
    }); 
      // hide cursor when selecting color
      $("#picker").mousedown(function() {
        $("#picker").css("cursor", "none");
      });
      $("#picker").mouseup(function() {
        $("#picker").css("cursor", "default");
      });

  };

  // Set photo as background
  $('input[name=background-image]').keypress(function(e) {
    if(e.which == 13) {
      console.log(imageBackground);
      e.preventDefault();
      var imageBackground = $('input[name=background-image]').val();
      $('#grid-container').css("background", "url('" + imageBackground + "')");
    }
  });

// Build File
var buildFile = function() {
  // New file object
  var file = {
    createdAt: Date.now,
    image: []
  };


  // Build save function
  var save = function(){
    for (var p = 1; p < (gridSize * gridSize); p++) {
     var color = $("#pixel-" + p).css("background");  
     file.image.push(color);
    }
    console.log(file.image);
    JSON.stringify(file.image);
    console.log(JSON.stringify(file.image));
  };

  $('#save').click(save());

  var updateImage = function(selectedPixel) {
    selectedPixel.replace('pixel-','');
    file.image[selectedPixel] = $(this).css("background", primaryColor);
  };
};

// Paint
var primaryColor = "black";
var secondaryColor = "blue";
var mouseDown = false;
var initPaint = function() {
  
  
  // Paint background of pixel to primary color on click / erase on right click
  $(".pixel").mousedown(function(e) {
    if (e.which === 1) {
      e.preventDefault();
      $(this).css("background", primaryColor);
      var selectedPixel = $(this).attr("id");
      //updateImage(selectedPixel);
    } else if (e.which === 3) { 
      e.preventDefault();
      $(this).css("background", "transparent");  
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
        $(this).css("background", "transparent");
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
  buildFile();
  initPaint();
  initHistory();
});
