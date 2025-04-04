// setup function runs once, at the beginning
function setup() {
  // createCanvas(width, height);
  // define width and height using pixels
  createCanvas(400, 400);
  
  // set a background color (0-255) = (black-white)
  // use background (r, g, b) for colors
  background(0);
}

// draw function runs 70x/s
// this is where you put the code that needs to run on a loop
function draw() {
  // draw the album cover frame
  rectMode(CENTER);
  noFill();     // remove fill from rectangle
  stroke(255);  // set the stroke color to white
  rect(width / 2, height / 2, 70);  // check help -> reference if you forget parameters

  // draw the timeline base
  line(0, height / 2, width, height / 2);
  
  // draw the year
  fill(255);     // put the fill back for the text
  noStroke();    // delete the stroke it's ugly lol
  text("2016", width/3, height/3);
  
  // draw vertical lines
  
  
}
