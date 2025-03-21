let sound;
let lowPass;
let freqSlider;

function preload() {
  sound = loadSound('3.mp3'); // Make sure your file path is correct
}

function setup() {
  createCanvas(400, 200);

  // Initialize the low-pass filter
  lowPass = new p5.LowPass();

  // Connect the sound to the filter, then to the output
  sound.disconnect(); // Disconnect from the master output
  sound.connect(lowPass);

  // Create a slider to control the cutoff frequency
  freqSlider = createSlider(10, 22050, 1000); // Cutoff frequency range: 10 Hz to 22050 Hz
  freqSlider.position(10, 10);

  // Button to play/pause the sound
  let playButton = createButton('Play/Pause');
  playButton.position(10, 50);
  playButton.mousePressed(togglePlay);
}

function draw() {
  background(200);

  // Get the slider value and set it as the cutoff frequency for the low-pass filter
  let cutoffFreq = freqSlider.value();
  lowPass.freq(cutoffFreq);

  // Display the current cutoff frequency
  text('Cutoff Frequency: ' + cutoffFreq + ' Hz', 10, 80);
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
