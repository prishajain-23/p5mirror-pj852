let video;
let videoSize = 5;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);

  // hide the DOM element
  video.hide();

  colorMode(HSB);
}

function draw() {
  background(220);

  video.loadPixels();

  for (let x = 0; x < width; x+=videoSize) {
    for (let y = 0; y < height; y+=videoSize) {
      let i = (x + y * width) * 4;
      let c = color(video.pixels[i], video.pixels[i + 1], video.pixels[i + 2]);
      let b = brightness(c);

      // console.log(b)
      
      fill(b > 50 ? 0 : 255);

      // Draw a big rect to represent this pixel
      rect(x, y, videoSize, videoSize);
    }
  }
}
