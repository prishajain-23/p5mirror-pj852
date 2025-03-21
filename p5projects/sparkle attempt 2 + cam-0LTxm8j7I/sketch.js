let sparkle;
let originalColors = []; // Store the original colors of each pixel
let colorOffsets = []; // Store an offset for each pixel to animate color changes

// Variable for changing the HSB values
// off for offset
let off = 0;
let offspeed = 0.1;

// create a variable to store webcam
let cam;

let fps;

function preload() {
  sparkle = loadImage("sparkle.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fps = frameRate();

  // create webcam
  cam = createCapture(VIDEO);
  cam.size(width, height);
  cam.hide();

  sparkle.loadPixels();

  // Initialize arrays to store original colors and offsets for each pixel
  for (let i = 0; i < sparkle.pixels.length; i += 4) {
    // Store the original color for each pixel
    originalColors[i] = sparkle.pixels[i]; // Red
    originalColors[i + 1] = sparkle.pixels[i + 1]; // Green
    originalColors[i + 2] = sparkle.pixels[i + 2]; // Blue
    originalColors[i + 3] = sparkle.pixels[i + 3]; // Alpha

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

//   // load pixels for webcam
//   cam.loadPixels();
  
//   if (fps % 60 == 0){
//     let camPoint = cam.get(width/2, height/2);
//       }

  // Loop through every pixel in the image by x and y coordinates
  for (let x = 0; x < sparkle.width; x++) {
    for (let y = 0; y < sparkle.height; y++) {
      let i = (x + y * sparkle.width) * 4; // set index for each pixel

      // store the original color values
      let rOrig = originalColors[i];
      let gOrig = originalColors[i + 1];
      let bOrig = originalColors[i + 2];
      let aOrig = originalColors[i + 3];
      
      let newA = map(mouseX, 0, width, 0, 255/2);
      
      sparkle.pixels[i+3] = newA;

      // store brightness values of original image --> use to sort
      let brightnessValue = brightness(color(rOrig, gOrig, bOrig));

      // store brightness values of webcam
      // let camBright = brightness(
      //   color(cam.pixels[i], cam.pixels[i + 1], cam.pixels[i + 2])
      // );
      // console.log(camBright);
      
      
      // // let sparkleAlpha = map(camBright, 0, 100, 0, 255);
      // if (camBright > 75) {
      //   sparkle.pixels[i+3] = camBright;
      // } else if (camBright > 50) {
      //   sparkle.pixels[i+3] = camBr;
      // } else {
      //    sparkle.pixels[i+3] = aOrig * 0.01;
      // }

      // conditionals for rate of change --> we use this value to change colorOffsets[], which lets us change different parts of the image at diff rates
      let changeSpeed;
      if (brightnessValue > 75) {
        changeSpeed = 0.02;
      } else if (brightnessValue > 50) {
        changeSpeed = 0.015;
      } else {
        changeSpeed = 0.01;
      }

      // animate each pixel at different rates based on brightnessValue
      colorOffsets[i / 4] += changeSpeed;

      // Calculate oscillating factor between -1 and 1 for each color channel; use sin() for smooth movement
      let oscillate = sin(colorOffsets[i / 4]);

      // Modify pixel colors based on brightness and oscillation
      if (brightnessValue > 25 && brightnessValue < 50) {
        // Shift red up and green/blue down
        sparkle.pixels[i] = rOrig + oscillate * 100; // Redder
        sparkle.pixels[i + 1] = gOrig - oscillate * 100; // Less green
        sparkle.pixels[i + 2] = bOrig - oscillate * 100; // Less blue
      } else if (brightnessValue > 50 && brightnessValue < 75) {
        // Shift green up and red/blue down
        sparkle.pixels[i] = rOrig - oscillate * 100; // Less red
        sparkle.pixels[i + 1] = gOrig + oscillate * 100; // Greener
        sparkle.pixels[i + 2] = bOrig - oscillate * 100; // Less blue
      } else if (brightnessValue > 75) {
        // Shift blue up and red/green down
        sparkle.pixels[i] = rOrig - oscillate * 100; // Less red
        sparkle.pixels[i + 1] = gOrig - oscillate * 100; // Less green
        sparkle.pixels[i + 2] = bOrig + oscillate * 100; // Bluer
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
