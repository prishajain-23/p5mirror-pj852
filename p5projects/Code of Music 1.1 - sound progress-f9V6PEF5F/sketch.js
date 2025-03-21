const sound = new SimplePlayer("sounds/blip.wav");
let analyzer = new Tone.Waveform(256);
sound.toDestination();
sound.connect(analyzer);

let loaded = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (loaded) {
    background(0);

    let waveform = analyzer.getValue();
    
  } else {
    background(220);
    text("loading...", 20, 20);
  }
  let x = map(sound.progress(), 0, 1, 0, width);
  ellipse(x, height / 3, 100);
}

function mouseClicked() {
  if (loaded) {
    sound.start();
  }
}

Tone.loaded().then(function () {
  loaded = true;
});
