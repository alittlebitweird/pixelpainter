// IDEA
// animation tool. function that saves img to array, slices/copies array to a z-index 1 higher, allows you to set refresh speed
// see previous frame silhoutte
//

// Choose Word
var words = ['lemon', 'bat', 'rubber duck', 'zebra', 'octopus', 'skyscraper', 'violin', 'carrot', 'gnome', 'goblin', 'avocado', 'pencil', 'tree'];

var chooseWord = function(){
  var number = Math.floor((Math.random() * words.length) + 1); 
  var word = words[number].toLowerCase();
  $('.instructions').html("Draw a " + word);
};

// Vars
var gridSize = 50;
var pixelSize = 10;
// Build Grid
var buildGrid = function(gridSize) { 
  // Build container
  for (var row = 0; row < gridSize; row++) {
    // Make unique id for each row and render
    var rowString = "<div class='grid-row' id='grid-row-" + (row) + "'></div>";
    $('#grid').append(rowString);
    // Make unique id for each pixel and render
    for (var i = 1; i < gridSize + 1; i++) {
      var pixelString = "<div class='pixel' id='pixel-" + (row * gridSize + i) + "'></div>";
      $('#grid-row-' + row).append(pixelString);
      var pixelFadeIn = "top " + (i / 5) + "s linear 0";
      $("#pixel-" + (row * gridSize + i)).css("-webkit-transition", pixelFadeIn);
    }
  }

  // Set pixel height/width
  $('.pixel').css({height: pixelSize, width: pixelSize});
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
	  gridSize = parseInt(gridSize);
      $('#grid').empty();
      buildGrid(gridSize);
    }
  });
     
  // Change pixel size
  $('input[name=pixel-size]').keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      pixelSize = $('input[name=pixel-size]').val();
      $('#grid').empty();
      buildGrid(gridSize);
    }
  });

  // Build color swatch
  for (var s = 1; s < 7; s++) {
    var swatchString = "<div class='swatch' id='swatch" + s + "'></div>";
    $('#swatch-container').append(swatchString);
    $('#swatch' + s).append("<p>" + s + "</p>");
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

  // Set photo as background
  $('input[name=background-image]').keypress(function(e) {
    if(e.which == 13) {
      console.log(imageBackground);
      e.preventDefault();
      var imageBackground = $('input[name=background-image]').val();
      $('#grid').css("background", "url('" + imageBackground + "')");
    }
  });
  // Adjust grid opacity according to slider
  $('input[name=grid-opacity]').click(function() {
    var gridOpacity = $('input[name=grid-opacity]').val();
    $('.pixel, .grid-row').css("opacity", (gridOpacity/100));
  });
};

// Build File
var buildFile = function() {
  // New file object
  var file = {
    createdAt: Date.now,
    image: new Array(gridSize * gridSize)
  };

  console.log(file.image.length);


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
  chooseWord();
  buildGrid(gridSize);
  buildGui();
  buildFile();
  initPaint();
  //initHistory();
});
