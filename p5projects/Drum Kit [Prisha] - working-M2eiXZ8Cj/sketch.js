let loaded = false;
let img; // for the image
let transportStarted = false; // flag to start the Transport once

// Dynamic grid configuration:
const numRows = 14; // change this value to alter the number of rows
const numCols = 16; // change this value to alter the number of columns

// Define instruments with their sound mappings and connect them to destination.
const tabla = new Tone.Players({
  num: "Tabla/NUM.wav",
  ta: "Tabla/TA.wav",
  tha: "Tabla/THA.wav",
  thi: "Tabla/THI.wav",
  thom: "Tabla/THOM.wav",
}).toDestination();

const mruthangam = new Tone.Players({
  num: "Mruthangam/NUM.wav",
  ta: "Mruthangam/TA.wav",
  tha: "Mruthangam/THA.wav",
  thi: "Mruthangam/THI.wav",
  thom: "Mruthangam/THOM.wav",
}).toDestination();

const kartal = new Tone.Player("kartal.mp3").toDestination();
const sitar = new Tone.Player("sitar.mp3").toDestination();

// Hardcoded labels for each row (length should match numRows).
const labels = [
  "tabla num",
  "tabla ta",
  "tabla tha",
  "tabla tham",
  "tabla thi",
  "tabla thom",
  "mruthangam num",
  "mruthangam ta",
  "mruthangam tha",
  "mruthangam tham",
  "mruthangam thi",
  "mruthangam thom",
  "kartal",
  "sitar",
];

let buttons = []; // 2D array for grid buttons

// Set BPM and adjust time signature so that the number of beats equals numCols.
// (If you want each column to be a beat, set the beats per measure to numCols.)
Tone.Transport.bpm.value = 180;
Tone.Transport.timeSignature = [16, 4];

function preload() {
  img = loadImage("india-outline.jpg");
}

function setup() {
  createCanvas(1000, 600);

  // Define grid parameters: the grid occupies the left 2/3 of the canvas.
  let gridX = 0;
  let gridY = 0;
  let gridW = (2 / 3) * width;
  let gridH = height;

  // Calculate cell dimensions based on dynamic rows/cols.
  let cellW = gridW / numCols;
  let cellH = gridH / numRows;

  // Create grid buttons.
  for (let r = 0; r < numRows; r++) {
    buttons[r] = [];
    for (let c = 0; c < numCols; c++) {
      buttons[r][c] = new Button(
        gridX + c * cellW,
        gridY + r * cellH,
        cellW,
        cellH,
        r, // row index
        c, // column index
        labels[r] // label for that row (e.g., "tabla num")
      );
    }
  }

  // Schedule the repeating loop.
  // We trigger playBeat every eighth note ("8n").
  // still need to work on this to find the right one
  Tone.Transport.scheduleRepeat(playBeat, "8n");

  // Create Clear button.
  let clearIt = createButton("Clear", "0");
  clearIt.position(width - 50, 10);
  clearIt.mousePressed(clearInstruments);
}

function draw() {
  background(220);

  // Define grid parameters (must match setup).
  let gridX = 0;
  let gridY = 0;
  let gridW = (2 / 3) * width;
  let gridH = height;
  let cellW = gridW / numCols;
  let cellH = gridH / numRows;

  // Draw grid buttons.
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      buttons[r][c].display();
    }
  }

  // Draw vertical segmentation lines (every 4 columns, if applicable).
  push();
  strokeWeight(2);
  stroke(10, 0, 100);
  for (let i = 1; i < numCols; i++) {
    if (i % 4 === 0) {
      line(gridX + i * cellW, gridY, gridX + i * cellW, gridY + gridH);
    }
  }
  pop();

  // Highlight current step.
  blendMode(ADD);
  push();
  noStroke();
  fill(255, 30);
  // Get the current beat from Tone.Transport.position.
  // Tone.Transport.position is in "bars:beats:sixteenths" format.
  let posParts = Tone.Transport.position.split(":");
  // Use the "beats" part and take modulo numCols in case the measure has rolled over.
  let beatIndex = parseInt(posParts[1]) % numCols;
  rect(beatIndex * cellW, gridY, cellW, gridH);
  pop();

  // Draw the hardcoded labels along the left side of the grid.
  blendMode(BLEND);
  push();
  noStroke();
  fill(0);
  for (let r = 0; r < numRows; r++) {
    text(labels[r], 5, gridY + r * cellH + cellH / 2);
  }
  pop();

  // Draw the image in the right 1/3 of the canvas.
  let imgX = (2 / 3) * width;
  let imgW = width - imgX;
  image(img, imgX, 0, imgW, height);
}

function mousePressed() {
  // Start the Transport on the first mouse press.
  if (!transportStarted) {
    Tone.start();
    Tone.Transport.start();
    transportStarted = true;
    console.log("Transport started");
  }
  // Check for clicks on grid buttons.
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      buttons[r][c].click(mouseX, mouseY);
    }
  }
}

function clearInstruments() {
  // Reset all buttons.
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      buttons[r][c].on = false;
    }
  }
}

// Returns the instrument corresponding to a given row.
function getInstrumentForRow(row) {
  if (row < 6) {
    return tabla;
  } else if (row < 12) {
    return mruthangam;
  } else if (row === 12) {
    return kartal;
  } else if (row === 13) {
    return sitar;
  }
}

// The playBeat function is called every quarter note ("4n").
// It extracts the beat index from Tone.Transport.position and
// only plays sounds for cells in that column.
function playBeat(time) {
  // Get the current beat index (modulo numCols).
  let posParts = Tone.Transport.position.split(":");
  let beatIndex = parseInt(posParts[1]) % numCols;

  // For each row, check the cell at column beatIndex.
  for (let r = 0; r < numRows; r++) {
    let cell = buttons[r][beatIndex];
    if (cell.on) {
      let instrument = getInstrumentForRow(r);
      // For Tone.Players, extract the key (the second word of the label).
      if (typeof instrument.has === "function") {
        let parts = labels[r].split(" ");
        let key = parts[1]; // e.g., "num" from "tabla num"
        if (instrument.has(key)) {
          instrument.player(key).start(time);
        }
      } else {
        // For single-sample instruments.
        instrument.start(time);
      }
    }
  }
}


Tone.loaded().then(function () {
  loaded = true;
  console.log("loaded!");
});