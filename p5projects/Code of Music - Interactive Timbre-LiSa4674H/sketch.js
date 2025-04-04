let oscList = [];
let envList = [];
let numOsc = 5;
let freqSlider;
let time = 0;
const freqs = [220, 261.63, 329.63, 392.0, 523.25];
const colors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"];

function setup() {
  createCanvas(400, 300);
  noFill();

  for (let i = 0; i < numOsc; i++) {
    let osc = new Tone.Oscillator(freqs[i], "sine").start();
    let env = new Tone.AmplitudeEnvelope({
      attack: 0.01,
      decay: 0.6,
      sustain: 0.8,
      release: 0.8,
    });
    osc.volume.value = -12;

    let filter = new Tone.Filter(100, "lowpass");
    osc.connect(env);
    env.connect(filter);
    filter.toDestination();

    oscList.push(osc);
    envList.push(env);
  }

  // Slider to control the number of frequencies being played
  freqSlider = createSlider(0, numOsc, 0, 1);
  freqSlider.position(10, 10);
}

function draw() {
  background(0);
  // background(245, 245, 220, 50); // Light beige background 
  // textSize(16);
  // textAlign(CENTER);
  fill(0, 50);
  // text("Active Frequencies: " + freqSlider.value(), width / 2, 30);

  // Stop all audio first
  stopAllAudio();

  // Trigger envelopes and animate watercolor-like sine waves
  for (let i = 0; i < freqSlider.value(); i++) {
    envList[i].triggerAttackRelease(0.5);
    
    stroke(colors[i]);
    strokeWeight(5);
    for (let j = 0; j < 5; j++) { // Multiple overlapping strokes for watercolor effect
      beginShape();
      for (let x = 0; x < width; x += 5) {
        let y = height / 2 + sin((x * 0.02 * (freqs[i] / 50)) + time + j * 0.3) * (40 + random(-5, 5));
        vertex(x, y);
      }
      endShape();
    }
  }

  time += 0.1; // Increment time for animation
}

// Stops all audio envelopes
function stopAllAudio() {
  for (let env of envList) {
    env.triggerRelease();
  }
}