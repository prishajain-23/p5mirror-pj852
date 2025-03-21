// Tone.Oscillator allows you to deal with multiple oscillators at the same time
let osc = new Tone.Oscillator(261.63, "sine");
osc.volume.value = -12;
osc.toDestination();

let slider;

function setup() {
  slider = createSlider(-60, 0, -12);
  slider.input(updateVolume);
}

function updateVolume() {
  osc.volume.rampTo(this.value());
}

function draw() {
  background(220);
}

function keyPressed() {
  osc.start();
}

function keyReleased() {
  osc.stop();
}
