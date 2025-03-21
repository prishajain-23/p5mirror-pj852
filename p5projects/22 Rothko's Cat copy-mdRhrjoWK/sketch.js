// Mimi Yin
// NYU ITP

let cat;
let skip = 7;

let a = 0;
let aspeed = 0.1;

// Variable for changing the HSB values
// off for offset
let off = 0;
let offspeed = 0.1;

function preload() {
  // Load rainbow cat image
  cat = loadImage('rainbow_cat.jpg');
}

function setup() {
  // Size the canvas to the browser window
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  colorMode(RGB);
  // Dark background
  background(16);
  
  // Center the cat image on the canvas
  translate((width-cat.width)/2, (height-cat.height)/2);
  cat.loadPixels();  
  // Move the hue
  off+=offspeed;
  if(off < 0 || off > 350) {
    offspeed *= -1;
  }
  
  for (let x = 0; x < cat.width; x += skip) {
    for (let y = 0; y < cat.height; y += skip) {
      //colorMode(RGB);
      // Get this pixel's color information in RGB format
      // Calculate the pixel number at x,y
      let p = y * cat.width + x;
      // Calculate the index number at pixel, p
      let i = p * 4;
      
      // Get the rgba values for pixel, p
      let r = cat.pixels[i];
      let g = cat.pixels[i+1];
      let bl = cat.pixels[i+2];
      let a = cat.pixels[i+3];
      let c = [r,g,bl,a];
      
      // Convert RGB to HSB
      let h = hue(c);
      let s = saturation(c);
      let b = brightness(c);
      // Compress hues to reds and oranges
      h = map(h, 0, 360, 0, 10) + off;
      // Compress saturation to mid-tones
      s = map(s, 0, 100, 0, 10) + off*2;
      // Compress brightness to low
      b = map(b, 0, 100, 0, 10) + off/2;
      colorMode(HSB, 360, 100, 100, 1);
      // Draw a point with HSB at 50% transparency
      stroke(h, s, b, 0.5);
      // Draw a point at x,y that's 4x the gap between points.
      strokeWeight(skip*4);
      point(x, y);
    }
  }

  //Original Cat
  colorMode(RGB);
  tint(255, a);
  image(cat, 0, 0);
  a+=aspeed;
  if(a < 0 || a > 10) {
    aspeed *= -1;
  }
}

