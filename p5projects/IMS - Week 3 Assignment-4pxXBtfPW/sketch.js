// Prisha's Comments and Edits
// Added colors and more randomness with types of shapes using switch case
//
// Dan Shiffman's Code
// Self Avoiding Walk (Random Walk with Alpha)
// The Coding Train / Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/IEw2RkDnJ

// Default values for spacing and step
let spacing = 5;
let step = 2;

// Parse URL parameters using URLSearchParams (supported in most modern browsers)
// written with GPT 3o-mini-high
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('spacing')) {
  const s = Number(urlParams.get('spacing'));
  if (!isNaN(s) && s > 0) {
    spacing = s;
  }
}
if (urlParams.has('step')) {
  const st = Number(urlParams.get('step'));
  if (!isNaN(st) && st > 0) {
    step = st;
  }
}

let x;
let y;
let grid;
let cols, rows;

// The "my" object holds settings and state variables.
let my = {};

// This function makes an array of arrays to create a 2D grid.
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  // Set width, height, and other settings.
  my.width = windowWidth;
  my.height = windowHeight;
  my.changeTime = 5.0;
  my.debug = 1;
  my.startTime = millis() / 1000.0;
  
  createCanvas(my.width, my.height);
  noStroke();
  
  setup_fullScreenButton();
  
  // Calculate the number of columns and rows based on spacing.
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  x = cols / 2;
  y = rows / 2;
  
  background(0);
  grid = make2DArray(cols, rows);
  
  // Use HSB for a rainbow effect.
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  check_time();
  noFill();
  
  // Map x and y to Hue and Brightness.
  let hueValue = map(x * spacing, 0, width, 0, 360);
  let brightnessValue = map(y * spacing, 0, height, 50, 100);
  let alphaValue = 80;
  stroke(hueValue, 100, brightnessValue, alphaValue);
  
  // Randomly choose a shape.
  const shape = floor(random(3));
  switch (shape) {
    case 0:
      rect(x * spacing, y * spacing, spacing);
      break;
    case 1:
      strokeWeight(spacing);
      point(x * spacing, y * spacing);
      break;
    case 2:
      strokeWeight(1);
      triangle(
        x * spacing,
        y * spacing,
        (x + spacing * 0.5) * spacing,
        y * spacing,
        (x + spacing * 0.25) * spacing,
        (y + spacing * 0.25) * spacing
      );
      break;
  }
  
  // Apply a random movement pattern.
  const pattern = floor(random(4));
  switch (pattern) {
    case 0:
      blendMode(HARD_LIGHT);
      x = x + step;
      break;
    case 1:
      blendMode(ADD);
      x = x - step;
      break;
    case 2:
      blendMode(EXCLUSION);
      y = y + step;
      break;
    case 3:
      blendMode(SCREEN);
      y = y - step;
      break;
  }
}

function check_time() {
  let now = millis() / 1000;
  if (now - my.startTime > my.changeTime) {
    my.startTime = now;
  }
}

// Create a full screen button.
function setup_fullScreenButton() {
  my.fullScreenButton = createButton("?=v7 Full Screen");
  my.fullScreenButton.mousePressed(fullScreen_action);
  my.fullScreenButton.style("font-size:42px");
  my.fullScreenButton.position(0, 0);
}

function fullScreen_action() {
  my.fullScreenButton.remove();
  fullscreen(1);
  let delay = 100;
  setTimeout(() => {
    ui_present_window();
  }, delay);
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
}

// Recalculate layout if the window is resized.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  x = cols / 2;
  y = rows / 2;
  grid = make2DArray(cols, rows);
}
