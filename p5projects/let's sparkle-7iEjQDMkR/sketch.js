let sparkle;
let rSparkle, gSparkle, bSparkle;

function preload() {
  sparkle = loadImage("sparkle.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  rSparkle = createImage(sparkle.width, sparkle.height);
}

function draw() {
  background(0);
  // Center the cat image on the canvas
  translate((width - sparkle.width) / 2, (height - sparkle.height) / 2);

  sparkle.loadPixels();
  rSparkle.loadPixels();

  // Copy sparkle pixels to rSparkle
  for (let i = 0; i < sparkle.pixels.length; i++) {
    rSparkle.pixels[i] = sparkle.pixels[i];
  }

  // Manipulate rSparkle pixels
  for (index = 0; index < rSparkle.pixels.length; index += 4) {
    rSparkle.pixels[index + 1] = 0; // Zero out Green
    rSparkle.pixels[index + 2] = 0; // Zero out Blue
    rSparkle.pixels[index + 3] = 85; // Set Alpha
    if ()
  }
  

  rSparkle.updatePixels();

  image(rSparkle, 0, 0);
}
