var widthSlider;
var circleWidth = 10;

var heightSlider;
var circleHeight = 10;

function setup() {
  createCanvas(400, 400);
  
  widthSlider = createSlider(0, 500, 10);
  widthSlider.position(10, 40);
  widthSlider.addClass("mySliders");
  
  heightSlider = createSlider(0, 500, 10);
  heightSlider.position(150, 40);
  heightSlider.addClass("mySliders");
}

function draw() {
  background(220);
  circleWidth = widthSlider.value();
  circleHeight = heightSlider.value();
  
  ellipse(width/2, height/2, circleWidth, circleHeight);
}