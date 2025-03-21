let drums = [];

function preload() {
  for (let d = 0; d < 7; d++) {
    drums[d] = loadSound("drums/" + d + ".mp3");
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
}

function keyPressed() {
  console.log(key);
  drums[key].play();
}
