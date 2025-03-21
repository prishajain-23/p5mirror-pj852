function setup() {
  createCanvas(200, 200);
}

function draw() {
background(0);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      stroke(255, 0, 0);
      point(x, y);
    }
  }
}
