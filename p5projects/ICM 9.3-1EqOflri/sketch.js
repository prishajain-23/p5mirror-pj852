let mic;
let fft;

function setup() {
  createCanvas(400, 400);
  
  mic = new p5.AudioIn();
  mic.start();
  
  fft = new p5.FFT();
  fft.setInput(mic);
  
}

function draw() {
  background(0);
  // // Visualize the mic level with an ellipse
  // let level = mic.getLevel()*5000;
  // if (level > width/2) {
  //   background(0, 100, 100);
  // }
  // ellipse(width/2, height/2, level, level);
  
  
}