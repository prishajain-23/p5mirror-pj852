let osc;

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(0);
  osc.start();
}

function draw() {
  background(220);
}

function keyPressed() {
  // let f = random(50, 500);
  let f = random(ratios)
  osc.freq(f);
}