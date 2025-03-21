// defined indexes for each sound
let bass = 0;
let hihat = 1;
let kick = 2;
let shloop = 3;
let ambient = 4;

let fDha = 5;
let fDhin = 6;
let fNa = 7;
let fThete = 8;

let pDha = 9;
let pDhin = 10;
let pNa = 11;
let pThete = 12;

let slider;
let vol;
let reverb;

// create sounds array to store loaded sounds
let sounds = [];

// define beats per minute
let bpm = 170;

let framesPerBeat = (60 / bpm) * 60; // Frames per beat at 60 fps
let totalBeats = 16; // Total beats in Teentaal

// last state
let lastBeat = -1;

// preload all sounds using for loop
function preload() {
  for (let i = 0; i < 13; i++) {
    // console.log(i);
    if (i < 4) {
      sounds.push(loadSound("./sounds/" + i + ".mp3"));
    } else {
      sounds.push(loadSound("./sounds/" + i + ".m4a"));
      // console.log(sounds[i]);
    }
    // console.log(i);
  }
}

function setup() {
  createCanvas(400, 400);
//   slider = createSlider(0, 255, 0, 0);
//   slider.position(10, 10);
//   slider.size(80);
  
  // voices = createSlider(0,255,0,0);
  // voices.position(10,30);
  // voices.size(80)

  vol = new p5.Gain(100);
  // osc = new p5.Oscillator();
  // osc.start();
  // osc.amp(1);
  // osc.disconnect();

  reverb = new p5.Reverb();

//   sounds[ambient].disconnect();
//   sounds[ambient].connect(vol);
  vol.connect(reverb);
  // osc.connect(vol);
  
  sounds[ambient].disconnect();
  sounds[ambient].connect(reverb);
  reverb.drywet(0.5); // Set a balance between dry and wet (0.0 to 1.0)
  reverb.process(sounds[ambient], 5, 5); // Add reverb to the sound with decay time and damping

  for (let i = 5; i < 13; i++) {
    sounds[i].disconnect();
    sounds[i].connect(reverb);
    reverb.drywet(0.95);
    reverb.process(sounds[i], 5, 5);
    
  }
}

function draw() {
  background(0);

  let beat = floor((frameCount / framesPerBeat) % totalBeats);

  // Trigger sound only on new beat
  if (beat !== lastBeat) {
    // update last beat
    lastBeat = beat;
    if (beat == 1) {
      sounds[ambient].play();
      // let ambientLevel = slider.value() / 255;
      // vol.amp(0.5);
    }

    // play beats at different times
    if (beat % 4 === 0) {
      // console.log("Dha");
      if (sounds[kick]) {
        sounds[kick].play();
        sounds[kick].amp(1);
        sounds[fDha].play();
        sounds[fDha].amp(1)
        sounds[pDha].play();
        sounds[pDha].amp(1)
      }
    } else if (beat === 7 || beat === 15) {
      // console.log("Na");
      if (sounds[shloop]) {
        sounds[shloop].play();
        sounds[shloop].amp(1);
        sounds[fNa].play();
        sounds[fNa].amp(1)

        sounds[pNa].play();
        sounds[pNa].amp(1)

      }
    } else {
      // console.log("Thin");
      if (sounds[hihat]) {
        sounds[hihat].play();
        sounds[hihat].amp(1);
        sounds[fDhin].play();
        sounds[fDhin].amp(1)

        sounds[pDhin].play();
        sounds[pDhin].amp(1)

        
        
      }
    }
  }

  // visualization
  noFill();
  stroke(255);
  ellipse((beat % 4) * 100 + 50, floor(beat / 4) * 100 + 50, 50, 50);
}
