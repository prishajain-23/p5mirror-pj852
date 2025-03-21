const sound = new SimplePlayer("sounds/blip.wav");
sound.toDestination();

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function mouseClicked() {
  if (loaded) {
    sound.start();
  }
}

function keyTyped() {
  if (key == "a") {
    if (loaded) {
      sound.start();
    }
  if (key == "a") {
    if (loaded) {
      sound.start();
    }
  }
}

let loaded = false;

Tone.loaded().then(function () {
  loaded = true;
  console.log("loaded!");
}); // returns a promise when all the audio files are loaded

// why use tone over p5sound -- the way p5 does it is with the preload function
