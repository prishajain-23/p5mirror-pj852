// Increase the max alpha value for brightness-based adjustments
let maxAlpha = 150;

// image variables
let sparkle;
let rSparkle, gSparkle, bSparkle;

//alpha variables
let rA, gA, bA;
let rSpeed, gSpeed, bSpeed;

function preload() {
  sparkle = loadImage("sparkle.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  sparkle = loadImage("sparkle.png");
  sparkle.loadPixels();

  // Initialize each modified image
  rSparkle = createImage(sparkle.width, sparkle.height);
  gSparkle = createImage(sparkle.width, sparkle.height);
  bSparkle = createImage(sparkle.width, sparkle.height);

  // Start the alpha values and speeds
  rA = random(0, maxAlpha);
  gA = random(0, maxAlpha);
  bA = random(0, maxAlpha);
  rSpeed = 0.05;
  gSpeed = 0.1;
  bSpeed = 0.15;
}

function draw() {
  background(0);
  translate((width - sparkle.width) / 2, (height - sparkle.height) / 2);

  rA = constrain(rA + rSpeed, 0, maxAlpha);
  gA = constrain(gA + gSpeed, 0, maxAlpha);
  bA = constrain(bA + bSpeed, 0, maxAlpha);

  if (rA <= 0 || rA >= maxAlpha) rSpeed *= -1;
  if (gA <= 0 || gA >= maxAlpha) gSpeed *= -1;
  if (bA <= 0 || bA >= maxAlpha) bSpeed *= -1;

  colorSpotlight(rSparkle, "rValue", rA);
  colorSpotlight(gSparkle, "gValue", gA);
  colorSpotlight(bSparkle, "bValue", bA);

  image(rSparkle, 0, 0);
  image(gSparkle, 0, 0);
  image(bSparkle, 0, 0);
}

function colorSpotlight(image, colorToKeep, alphaValue) {
  image.loadPixels();
  for (let i = 0; i < sparkle.pixels.length; i += 4) {
    let brightnessValue = (sparkle.pixels[i] + sparkle.pixels[i + 1] + sparkle.pixels[i + 2]) / 3;
    let pixelAlpha = map(brightnessValue, 0, 255, 0, alphaValue);

    if (colorToKeep === "rValue") {
      image.pixels[i] = sparkle.pixels[i];
      image.pixels[i + 1] = 0;
      image.pixels[i + 2] = 0;
      image.pixels[i + 3] = pixelAlpha;
    } else if (colorToKeep === "gValue") {
      image.pixels[i] = 0;
      image.pixels[i + 1] = sparkle.pixels[i + 1];
      image.pixels[i + 2] = 0;
      image.pixels[i + 3] = pixelAlpha;
    } else if (colorToKeep === "bValue") {
      image.pixels[i] = 0;
      image.pixels[i + 1] = 0;
      image.pixels[i + 2] = sparkle.pixels[i + 2];
      image.pixels[i + 3] = pixelAlpha;
    }
  }
  image.updatePixels();
}
