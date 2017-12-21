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
y2=0,

//third point for triangle coords
x3=0,
y3=0,

//previous x,y coords
lx=0,
ly=0,


//what shape we are drawing
shape='',

//have we started drawing YeoyyrtisDrawing=false;
isDrawing=false;

//private data is above return
return{

setIsDrawing: function(bool) {
  isDrawing = bool;
},

getIsDrawing: function() {
  return isDrawing;
},


getShape: function() {
  return shape;

},

//return a random color
randColor: function() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
},


//Sets the shape to be drawn
setShape(shp) {
  shape = shp;
},
//Set the x,y coords
    setXY: function(evt) {
//Set tht previous coords
      lx = x;
      ly = y;

      x = (evt.clientX - rect.left) - canvas.offsetLeft;
      y = (evt.clientY - rect.top);

      console.log({'x':x, 'y':y, 'lx': lx, 'ly':ly});
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

    drawRect: function(){
      ctx.fillStyle = this.randColor();
      ctx.strokeStyle = this.randColor();
      ctx.fillRect(x1, y1, (x2-x1), (y2-y1));
      ctx.strokeRect(x1, y1, (x2-x1), (y2-y1));
    },

    drawLine: function() {
      ctx.strokeStyle = this.randColor();
      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.stroke();
    },

    drawCircle: function() {
      ctx.fillStyle = this.randColor();
      ctx.strokeStyle = this.randColor();

      let a = (x1-x2);
      let b = (y1-y2);
      let radius = Math.sqrt(a*a + b*b);

      ctx.beginPath();
      ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    },

    drawPath: function() {
      ctx.strokeStyle = this.randColor();
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(x,y);
      ctx.stroke();
    },

    //Draw a triangle
    drawTriangle: function() {
      ctx.strokeStyle = this.randColor();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.closePath();
      ctx.stroke();
    },

//Draws a selected shape
draw: function() {
  ctx.restore();
  if(shape==='rectangle'){
    this.drawRect();
  }else if(shape==='line'){
      this.drawLine();
    }else if(shape==='circle'){
        this.drawCircle();
      }else if(shape==='path'){
            this.drawPath();
          }else if(shape==='triangle'){
                this.drawTriangle();
          }
      else{
    alert('Please choose a shape');
  }
  ctx.save();
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

//Choose to draw a rectangle
  document.getElementById('btnRect').addEventListener('click', function(){
  draw.setShape('rectangle');
});

//Choose to draw a line
  document.getElementById('btnLine').addEventListener('click', function(){
  draw.setShape('line');
});

//Choose to draw a circle
  document.getElementById('btnCircle').addEventListener('click', function(){
  draw.setShape('circle');
});

//Choose to draw a path
  document.getElementById('btnPath').addEventListener('click', function(){
  draw.setShape('path');
});

//Choose to draw a triangle
  document.getElementById('btnTriangle').addEventListener('click', function(){
  draw.setShape('triangle');
});

//Track the x,y postion
draw.getCanvas().addEventListener('mousemove', function(evt){
  draw.setXY(evt);
  draw.writeXY();

  if(draw.getShape()==='path' && draw.getIsDrawing()===true){
    draw.draw();
  };


});

draw.getCanvas().addEventListener('mousedown', function(){
  draw.setStart();
  draw.setIsDrawing(true);
});

draw.getCanvas().addEventListener('mouseup', function(){
  draw.setEnd();
  draw.draw();
  draw.setIsDrawing(false);
});

//Get the height and width of the main element we will use this set canvas to the full
//size of the main element.
