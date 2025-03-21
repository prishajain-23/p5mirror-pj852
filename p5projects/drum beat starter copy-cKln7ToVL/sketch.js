// can load multiple sounds in the same constructor and then label them using .Players

// **THINK: maybe changing volume/another parameter as the mouse moves away from the center

const kit = new Tone.Players({
  kick: "samples/505/kick.mp3",
  snare: "samples/505/snare.mp3",
  hh: "samples/505/hh.mp3",
  hho: "samples/505/hho.mp3",
});
kit.toDestination();

let bpm = 120;
let interval = 60 / bpm;

let count = -1;
let louder = 10;
let softer = -20;

let beat;
let measure;
let beatsPerMeasure = 16;

// Tone.Loop(callback function, interval)
// interval controls the pulse
const repeatEvent = new Tone.Loop(playDrum, interval);
repeatEvent.start(0); // putting the loop at the beginning of the timeline



function playBeat(time) {
  kit.player("kick").start();
  kit.player("snare").start();

  if (beat === 15) {
    kit.player("kick").volume.rampTo(louder);
  } else {
    kit.player("kick").volume.rampTo(softer);
  }
  count++; // whenever drum plays, add to the count
  beat = count % beatsPerMeasure; // will always give a number from 0-3
  measure = floor(count/beatsPerMeasure);
  console.log(beat, measure, beatsPerMeasure);
}

function keyPressed() {
  // actually starts the "playhead"
  Tone.Transport.start();
}

function setup() {
  createCanvas(200, 200);
  background(0);
}

function draw() {}
