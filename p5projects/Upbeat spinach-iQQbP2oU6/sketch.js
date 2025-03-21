let str = '';

function setup() {
  createCanvas(400, 400);
  textAlign(LEFT, TOP);
  textSize(36);
}

let x = 0;
let y = 0;
let c = 0;

function draw() {
  background(220);
  
  if (frameCount % 10 == 1) {
    let ch = str.charAt(c);
    text(ch, x, )
  }
}