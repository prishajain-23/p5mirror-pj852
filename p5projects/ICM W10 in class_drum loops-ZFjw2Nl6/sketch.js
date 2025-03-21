let drums = [];

function preload() {
  for (i = 0; i < 7; i++) {
    let drum = loadSound('drums/' + i + '.mp3');
    drums.push(drum);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

let x = 0;

function draw() {
  background(220);
  x++;
  
  if(x > width) {
    x = 0;
    background(255);
  }
  
  let y+= height/drums.length;
  fill(0);
  
  if(frameCount % 60 == 1) { //using 1 instead of 0 makes it start immediately
    drums[0].play();
    rect(x, y, 5, 15);
  }
  
  // Mango
    if(frameCount % (60/2) == 1) { //using 1 instead of 0 makes it start immediately
    drums[1].play();
    rect(x, y, 5, 15);
  }
  
  // Pineapple
    if(frameCount % (60/3) == 1) { //using 1 instead of 0 makes it start immediately
    drums[2].play();
    rect(x, y, 5, 15);
  }
  
  // new event inside same time window: using diff remainders to generate syncopation
    if(frameCount % 60 == 41) { //using 1 instead of 0 makes it start immediately
    drums[3].play();
    rect(x, y, 5, 15);
  }
}

function keyPressed() {
  drums[key - 1].play();
}