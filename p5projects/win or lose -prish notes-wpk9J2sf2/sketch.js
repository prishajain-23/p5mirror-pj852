
let x,y;
let r,g,b;
let circleX,circleY;
//rad=radius of circle; we do width-rad because it represents the edge of the circle instead of the center; center is circleX
let rad=10;

// var speed = 3; had to delete this bc "x*+=1 is already doing the work for it"

//goal rectangle parameters
let rectLeft,rectRight,rectTop,rectBottom;

//paddle parameters
let paddleX, paddleY, paddleW, paddleH;
//this is for no trail for the paddle
// let paddleOverlay;

// ball-trail layer
let trail;          // <-- new

let state="play";
let gameOver=false;
//confetti
// let cr, cg, cb;


// 1. call setup function to run once
function setup() {
  // 2. create the canvas, make it the same size as the window wxh
  // note for cathy from prisha: check out windowResized() function in the p5 reference or look it up and you'll find some example code. this makes it dynamically resize when you change the canvas instead of having to stop and play each time
  createCanvas(windowWidth, windowHeight);
    //ball setup 
  //figure out what these (3,7) means--> picks random floating number

  //ball trail
  
  // 3. create a graphics layer same size as the canvas
  // we use graphics layer for easier rendering rather than painting straight on the canvas, which makes things slow
  trail = createGraphics(windowWidth, windowHeight);
  // 4. remove the stroke from the graphics layer
  // prisha: not sure if this is needed here, we would use this for new pixels, not the layer where we're going to put them
  trail.noStroke()
  
  // 5. define x and y to be between 3 and 6
  x = random(3,6);
  y = random(3,6);
  
  // 6. define a W radius and a H radius for the circle
  // ^ setup runs once so this creeates a 
  circleX=random(rad,width-rad);
  circleY=random(rad,height/2);
  r = random(255);
  g = random(255);
  b = random(255);
  

  //goal rectangle setup 
rectLeft = width/2 - 100;
rectRight = width/2 + 100;
rectTop = -20;
rectBottom = 20;
  
  //paddle setip 
paddleW = 100;
paddleH = 20;
paddleX = mouseX;
paddleY = height - 20;
trail = createGraphics(windowWidth, windowHeight);
}

//makes it restart in middle --> doesnt work anymore bc x and y are random 
// function mousePressed(){
//   x=width/2;
//   y=height/2;
// }
    

function drawLose() {
  background(0, 0, 0, 200);        // dim last frame

  // translucent red veil
  fill(255, 0, 0, 255);
  rectMode(CORNER);
  noStroke();
  rect(0, 0, width, height);

  // text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(90);
  text("YOU LOSE!", width / 2, height / 2);
  textSize(40);
    textAlign(CENTER, CENTER);
  text("(Click to play again)",width/2,height/1.75);
}

function drawWin() {
  background(0, 0, 0, 20);        // dim last frame

  // confetti burst
  for (let i = 0; i < 30; i++) {
    fill(random(255), random(255), random(255));
    noStroke();
    ellipse(random(width), random(height), 10, 10);
  }

  // text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(90);
  text("YOU WIN!", width / 2, height / 2);
  textSize(40);
    textAlign(CENTER, CENTER);
  text("(Click to play again)",width/2,height/1.75);
}

function draw() {
   if (state === "play") {
    playLoop();                 // ← your existing gameplay routine
    return;
  }

  if (state === "win")  { drawWin();  return; }
  if (state === "lose") { drawLose(); return; }
  //GAME OVER
 if (state==="win") {
   //confetti
for (let i = 0; i < 30; i++) {
      let starX = random(width);
      let starY = random(height);
      let cr = random(255);
      let cg = random(255);
      let cb = random(255);
      noStroke();
      fill(cr, cg, cb);
      ellipse(starX, starY, 8, 8);
}
// 📝 Game Over Text

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(100);
  text("GAME OVER", width / 2, height / 2);
      
  return;
}
}

function playLoop () {
//CIRCLE SHIT
  //the last number (alpha) creates trail
    background(0,0,0,25);    //(0,0,0,x) x is how evident the trail is--> bigger=smaller trail 
   //ball movement
    circleX+=x;
    circleY+=y;
  
    //DRAW CIRCLE
    noStroke();
    fill(r,g,b);
    circle(circleX,circleY,rad*2);
  
  trail.fill(0, 0, 0, 25);           // translucent wash → trail effect
  trail.rect(0, 0, width, height);   // cover the whole off-screen layer

  trail.fill(r, g, b);               // fresh ball
  trail.noStroke();
  trail.circle(circleX, circleY, rad * 2);

  image(trail, 0, 0);                // blit the layer to the main canvas


  //THIS WHOLE CODE MAKES IT BOUNCE FROM EDGE TO EDGE 
  //width-rad is the right edge; rad is the left edge; x*=-1 flips horizontal speed direction
    //end of game
    if(circleX>width-rad || circleX<rad){
      x*=-1;
      r = random(255);
      g = random(255);
      b = random(255);
    }
//width-rad is the bottom; rad is the top; x*=-1 flips vertical speed direction
    if(circleY<rad){
      y*=-1;
      r = random(255);
      g = random(255);
      b = random(255);
    }

  
//PADDLE SHIT 
//paddle code setup 
  paddleX = mouseX;
  paddleY = height - 20;


  // Paddle collision
  let hittingPaddle =
    circleY + rad >= paddleY - paddleH / 2 &&
    circleY + rad <= paddleY + paddleH / 2 &&
    circleX >= paddleX - paddleW / 2 &&
    circleX <= paddleX + paddleW / 2;

  if (hittingPaddle && y > 0) {
    y *= -1;
    x += random(-1, 1);
    y += random(-0.5, 0.5);
    r = random(255);
    g = random(255);
    b = random(255);
  } else if (circleY + rad > height) {
  // Missed the paddle
  state = "lose";
  }
  
  //MAKES PADDLE HAVE NO TRAIL 
// paddleOverlay.clear();
fill(255);
// paddleOverlay.noStroke();
// paddleOverlay.rectMode(CENTER);
rect(paddleX, paddleY, paddleW, paddleH);
  // image(, 0, 0);

   //GOAL RECTANGLE
//draws goal rectangle
  fill(255);
  rectMode(CENTER);
  rect(width/2,10,200,40);

  //game over winning code
  
if (circleX + rad > rectLeft && 
    circleX - rad < rectRight &&
    circleY + rad > rectTop &&
    circleY - rad < rectBottom) {
state = "win";        // ← instead of gameOver = true;
}
  
}
function mousePressed() {
  // ignore clicks while the ball is in play
  if (state === "play") return;

  //------------------------------------------
  // 1. wipe the visual layers
  //------------------------------------------
  trail.clear();        // remove the faded ball streaks
  background(0);        // clear whatever overlay was on-screen

  //------------------------------------------
  // 2. re-initialise the ball and colours
  //------------------------------------------
  circleX = random(rad, width - rad);
  circleY = random(rad, height / 2);
  x = random(3, 6);
  y = random(3, 6);
  r = random(255);
  g = random(255);
  b = random(255);

  //------------------------------------------
  // 3. back to live play
  //------------------------------------------
  state = "play";
}
// // how to restart game
// function mousePressed() {
//     // Reset ball
//     circleX = width / 2;
//     circleY = height / 2;
//     x = random(3, 7);
//     y = random(3, 7);
//     r = random(255);
//     g = random(255);
//     b = random(255);

//     // Reset overlays and game state
//     //makes confetti build up 
//     background(0);