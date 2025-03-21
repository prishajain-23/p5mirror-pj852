// Tone.Oscillator allows you to deal with multiple oscillators at the same time
let osc = new Tone.Oscillator(261.63, "sine");
osc.volume.value = -12;
osc.toMaster();

setInterval(randomPartials, 1000);

function randomPartials() {
  let partials = [];
  for (let i = 0; i < 8; i++) {
    partials[i] = random();
  }
  console.log(partials);
  osc.partials = partials;
}

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
