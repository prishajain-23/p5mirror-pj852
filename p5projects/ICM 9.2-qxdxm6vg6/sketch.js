let sounds = [];
let d = 0;

function preload() {
  for (i = 0; i < 7; i++) {
    sounds.push(loadSound(i + ".mp3"));
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function mousePressed() {
  if (!sounds[d].isPlaying()) {
    sounds[d].play();
  } else {
    sounds[d].pause();
    if (d < 8) {
      d++;
    } else {
      d = 0;
    }
  }
}
