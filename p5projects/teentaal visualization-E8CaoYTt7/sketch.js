let bass = 0;
let hihat = 1;
let kick = 2;
let shloop = 3;

let sounds = [];

let bpm = 120; // Beats per minute
let framesPerBeat = (60 / bpm) * 60; // Frames per beat at 60 fps
let totalBeats = 16; // Total beats in Teentaal

let lastBeat = -1;

function preload() {
  for (let i = 0; i < 4; i++) { // Correctly loop from 0 to 4
    sounds.push(loadSound('./sounds/' + (i) + '.mp3')); // Adjust file path logic
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  let beat = floor((frameCount / framesPerBeat) % totalBeats);

  // Trigger sound only on new beat
  if (beat !== lastBeat) {
    lastBeat = beat;

    if (beat % 4 === 0) {
      console.log("Dha");
      if (sounds[kick]) sounds[kick].play();
    } else if (beat === 7 || beat === 15) {
      console.log("Na");
      if (sounds[bass]) sounds[bass].play();
    } else {
      console.log("Thin");
      if (sounds[hihat]) sounds[hihat].play();
    }
  }

  ellipse((beat % 4) * 100 + 50, floor(beat / 4) * 100 + 50, 50, 50);
}
