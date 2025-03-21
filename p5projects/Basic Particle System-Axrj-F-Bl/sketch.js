let ps = [];

let sound;
let fft;

function preload() {
  // loadSound("0.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);
  allSerialStuff();
}

function draw() {
  background(0);
  
  // let y = map(amplitude, 0, 255, height, 0);
  // let x = map(s, 0, spectrum.length, 0, width);
  ps.push(new System(mouseX, mouseY));
  
  // if (abs(pmouseX - mouseX) > 0 || abs(pmouseY - mouseY)) {
    
  // }
  for (let i = ps.length - 1; i >= 0; i--) {
    ps[i].update();
    ps[i].display();

    if (ps[i].done) {
      ps.splice(i, 1);
    }
  }
  // console.log(ps.length);
}
