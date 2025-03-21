let osc1 = new Tone.Oscillator(261.63, "sine");
osc1.volume.value = -12;

let ampEnv1 = new Tone.AmplitudeEnvelope({
  "attack": 0.01,
  "decay": 0.6,
  "sustain": 0.8,
  "release": 0.8
}
)

let aFilter = new Tone.Filter(150, "lowpass");

osc1.connect(ampEnv1);
ampEnv1.connect(aFilter);
aFilter.toDestination();

osc1.start();

function keyPressed() {
  ampEnv1.triggerAttack();
}

function keyReleased() {
  ampEnv1.triggerRelease();
}

let slider;

function setup() {
  slider = createSlider(-60, 0, -12);
  slider.input(updateVolume);
}

function updateVolume() {
  osc1.volume.rampTo(this.value());
}

function draw() {
  background(220);
}
