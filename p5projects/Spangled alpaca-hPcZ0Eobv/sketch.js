let cam;
let x = 0;

function setup() {
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  // background(220);
  image(cam, 0, 0);
  cam.loadPixels();
  pixelDensity(1);

  for (let y = 0; y < cam.pixels.length; y ++) {
    //grab color data at (width/2, y)
    let pixel = y * width + width/2;
    let index = pixel * 4;
    let r = cam.pixels[index];
    let g = cam.pixels[index + 1];
    let b = cam.pixels[index + 2];
    let a = cam.pixels[index + 3];
    stroke(r, g, b);
    point(x, y);
  }
  x++;
  if (x > width){
    x = 0;
  }
}
