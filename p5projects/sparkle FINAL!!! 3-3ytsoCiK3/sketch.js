let sparkle;
let originalColors = []; // Store the original colors of each pixel
let colorOffsets = []; // Store an offset for each pixel to animate color changes

// Variable for changing the HSB values
// off for offset
let off = 0;
let offspeed = 0.1;

function preload() {
  sparkle = loadImage("sparkle.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  sparkle.loadPixels();

  // Initialize arrays to store original colors and offsets for each pixel
  for (let i = 0; i < sparkle.pixels.length; i++) {
    // Store the original color for each pixel
    originalColors[i] = sparkle.pixels[i];

    // Initialize color offset for animation (use random for variation)
    colorOffsets[i / 4] = random(0, 1); // One offset per pixel (1 per 4 values in array)
  }
}

function draw() {
  colorMode(RGB);

  // Center the image on the canvas
  translate((width - sparkle.width) / 2, (height - sparkle.height) / 2);
  // Load pixels to manipulate them directly
  sparkle.loadPixels();
  // Move the hue
  off += offspeed;
  if (off < 0 || off > 350) {
    offspeed *= -1;
  }

  // Loop through every pixel in the image by x and y coordinates
  for (let x = 0; x < sparkle.width; x++) {
    for (let y = 0; y < sparkle.height; y++) {
      let i = (x + y * sparkle.width) * 4; // set index for each pixel

      // store the original color values
      let rOrig = originalColors[i];
      let gOrig = originalColors[i + 1];
      let bOrig = originalColors[i + 2];

      // store brightness values of original image --> use to sort
      let brightnessValue = brightness(color(rOrig, gOrig, bOrig));

      // conditionals for rates of change --> we use this value to change colorOffsets[]
      let sinFood;
      if (brightnessValue > 75) {
        sinFood = 0.02;
      } else if (brightnessValue > 50) {
        sinFood = 0.015;
      } else {
        sinFood = 0.01;
      }
      
      // change animation rates of different pixels based on their brightness
      colorOffsets[i / 4] += sinFood;

      // Calculate oscillating factor between -1 and 1 for each color channel --> we use sin() to make the movement stable
      let oscillate = sin(colorOffsets[i / 4]);
      
      // variable for oscillation modifier
      let oscMod = 100;
      
      /* 
      NOTE: sinFood is the rate of change. oscillate is the rate of change of the rate of change. oscMod is the intensity of the color manipulation.
      */

      // Modify pixel colors based on brightness and oscillation
      if (brightnessValue > 25 && brightnessValue < 50) {
        // Shift red up and green/blue down
        sparkle.pixels[i] = rOrig + oscillate * oscMod; // Redder
        sparkle.pixels[i + 1] = gOrig - oscillate * oscMod; // Less green
        sparkle.pixels[i + 2] = bOrig - oscillate * oscMod; // Less blue
      } else if (brightnessValue > 50 && brightnessValue < 75) {
        // Shift green up and red/blue down
        sparkle.pixels[i] = rOrig - oscillate * oscMod; // Less red
        sparkle.pixels[i + 1] = gOrig + oscillate * oscMod; // Greener
        sparkle.pixels[i + 2] = bOrig - oscillate * oscMod; // Less blue
      } else if (brightnessValue > 75) {
        // Shift blue up and red/green down
        sparkle.pixels[i] = rOrig - oscillate * oscMod; // Less red
        sparkle.pixels[i + 1] = gOrig - oscillate * oscMod; // Less green
        sparkle.pixels[i + 2] = bOrig + oscillate * oscMod; // Bluer
      } else {
        // Default: Oscillate each channel toward the original value
        sparkle.pixels[i] = rOrig + oscillate; // Small red adjustment
        sparkle.pixels[i + 1] = gOrig + oscillate; // Small green adjustment
        sparkle.pixels[i + 2] = bOrig + oscillate; // Small blue adjustment
      }

      // Manual check to ensure colors stay in range 0-255
      if (sparkle.pixels[i] < 0) sparkle.pixels[i] = 0;
      if (sparkle.pixels[i] > 255) sparkle.pixels[i] = 255;
      if (sparkle.pixels[i + 1] < 0) sparkle.pixels[i + 1] = 0;
      if (sparkle.pixels[i + 1] > 255) sparkle.pixels[i + 1] = 255;
      if (sparkle.pixels[i + 2] < 0) sparkle.pixels[i + 2] = 0;
      if (sparkle.pixels[i + 2] > 255) sparkle.pixels[i + 2] = 255;
    }
  }

  // Update the pixels on the canvas
  sparkle.updatePixels();

  // Draw the modified image
  image(sparkle, 0, 0);
}
