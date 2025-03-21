 // Adapted from Luisa's code

// Sequencer
let bpm = 60;
let timeSignature = [4, 4];
let nMeasures = 2;

function nSteps() {
  return nMeasures * timeSignature[0];
}
let currentStep;
let playButton;

let cells = [];

// Sound
let player;
let noteNames = [
  "A1",
  "A2",
  "As1",
  "B1",
  "C2",
  "Cs2",
  "D2",
  "Ds2",
  "E2",
  "F2",
  "Fs2",
  "G2",
  "Gs1",
];
let nTracks = noteNames.length;

player = new Tone.Players({
  A1: "/samples/casio/A1.mp3",
  A2: "/samples/casio/A2.mp3",
  As1: "/samples/casio/As1.mp3",
  B1: "/samples/casio/B1.mp3",
  C2: "/samples/casio/C2.mp3",
  Cs2: "/samples/casio/Cs2.mp3",
  D2: "/samples/casio/D2.mp3",
  Ds2: "/samples/casio/Ds2.mp3",
  E2: "/samples/casio/E2.mp3",
  F2: "/samples/casio/F2.mp3",
  Fs2: "/samples/casio/Fs2.mp3",
  G2: "/samples/casio/G2.mp3",
  Gs1: "/samples/casio/Gs1.mp3",
});

player.toDestination();
Tone.Transport.scheduleRepeat(onBeat, "4n");

// declaring callback function to break down time
function onBeat(time) {
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  let beat = int(pos[1]);
  currentStep = (measure * timeSignature[0] + beat) % nSteps();
  let velocity = 0.5;

  for (let track = 0; track < nTracks; track++) {
    if (cells[track][currentStep]) {
      let note = player.player(noteNames[track]);
      note.start(time);
    }
  }
}

// Graphics
let w = 60;
let gray;
// Generate a random color for each note in noteNames
let colors = [];
function setup() {
  createCanvas(480, 240);
  cellWidth = width / nSteps();
  cellHeight = height / nTracks;
  gray = color(178, 178, 188);

  // Generate a random color for each note in noteNames
  colors = [];
  for (let i = 0; i < noteNames.length; i++) {
    // p5.js color object using random RGB values
    colors.push(color(random(255), random(255), random(255)));
  }

  // Initialize all sequencer cells. ON: 1. OFF: 0.
  for (let track = 0; track < nTracks; track++) {
    cells[track] = [];
    for (let step = 0; step < nSteps(); step++) {
      cells[track][step] = 0;
    }
  }

  playButton = createButton("play");
  playButton.position(540, 10);
  playButton.mouseClicked(togglePlay);
}

function draw() {
  background(255);
  stroke(gray);

  // Draw cells that are on
  for (let step = 0; step < nSteps(); step++) {
    for (let track = 0; track < nTracks; track++) {
      if (cells[track][step] == 1) {
        fill(colors[track]);
        rect(step * w, track * w, w, w);
      }
    }
  }

  // Draw horizontal lines
  stroke(gray);
  for (let i = 0; i <= nTracks; i++) {
    let y = i * w;
    line(0, y, width, y);
  }

  // Draw vertical lines
  for (let i = 0; i <= nSteps(); i++) {
    // Thicker line for first beat (which marks the start of the measure)
    if (i % timeSignature[0] == 0) {
      strokeWeight(1);
      stroke(234, 30, 83, 60);
    } else {
      stroke(gray);
      strokeWeight(0.5);
    }

    line(i * w, 0, i * w, height);

    // Highlight the step that is playing
    if (i == currentStep && Tone.Transport.state == "started") {
      fill(234, 30, 83, 60);
      noStroke();
      rect(i * w, 0, w, height);
    }
  }
}

function mousePressed() {
  // Determine which cell the mouse is on
  let i = floor(mouseX / w);
  let j = floor(mouseY / w);

  // Toggle cell on/off
  cells[j][i] = !cells[j][i];
}

function togglePlay() {
  if (Tone.Transport.state == "started") {
    Tone.Transport.stop();
    playButton.html("play");
  } else {
    if (player.loaded) {
      Tone.Transport.start();
      playButton.html("stop");
    }
  }
}
