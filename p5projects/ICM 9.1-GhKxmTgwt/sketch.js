let sound;

function preload() {
  sound = loadSound("bell.wav");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function mousePressed() {
  sound.play();
}