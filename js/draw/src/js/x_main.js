var draw = (function(){
//Get the height and the width of the main element
var mWidth = document.querySelector('main').offsetWidth,
mHeight = document.querySelector('main').offsetHeight,

//Create the canvas
canvas = document.createElement("canvas");

//create a drawing context
ctx = canvas.getContext('2d'),

//create the initial bounding box
rect = canvas.getBoundingClientRect(),

//current x,y coords
x=0,
y=0,

//starting x,y coords
x1=0,
y1=0,

//ending x,y coords
x2=0,
y2=0;


//private data is above return
  return{

//Set the x,y coords
    setXY: function(evt) {
      x = (evt.clientX - rect.left) - canvas.offsetLeft;
      y = (evt.clientY - rect.top);
    },

    setStart: function() {
      x1=x;
      y1=y;
    },

    setEnd: function() {
      x2=x;
      y2=y;
    },

    //Write the cords back to the UI
    writeXY: function(){
    document.getElementById('trackX').innerHTML = 'X: ' + x;
    document.getElementById('trackY').innerHTML = 'Y: ' + y;
    },

    drawRect: function(x,y,h,w){
      ctx.fillStyle = '#'+ Math.floor(Math.random()*16777215).toString(16);
      ctx.fillRect(x1, y1, (x2-x1), (y2-y1));
    },

    getCanvas: function(){
      return canvas;
    },

    init: function(){
        //Create the canvas
    canvas.height = mHeight;
    canvas.width = mWidth;
    document.querySelector('main').appendChild(canvas);
  }
  };

})();
//Declaring the object up there and executing it down there

draw.init();
//Track the x,y postion
draw.getCanvas().addEventListener('mousemove', function(evt){
  draw.setXY(evt);
  draw.writeXY();
});
draw.getCanvas().addEventListener('mousedown', function(){
  draw.setStart();
});

draw.getCanvas().addEventListener('mouseup', function(){
  draw.setEnd();
  draw.drawRect();
});

//Get the height and width of the main element we will use this set canvas to the full
//size of the main element.
