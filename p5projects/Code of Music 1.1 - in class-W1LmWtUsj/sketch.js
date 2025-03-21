const blip = new SimplePlayer("sounds/blip.wav");
blip.toDestination(); // sends sound to whatever speaker device is using

const pink = new SimplePlayer("sounds/pink.wav");
pink.toDestination(); // sends sound to whatever speaker device is using

const takerimba = new SimplePlayer("sounds/takerimba.wav");
takerimba.toDestination(); // sends sound to whatever speaker device is using

const tears = new SimplePlayer("sounds/tears.wav");
tears.toDestination(); // sends sound to whatever speaker device is using

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  
  // Blip
  let x = map(blip.progress(), 0, 1, 0, 100);
  
  ellipse(width/2, height/2, x);
}

// function mouseClicked() {
//   if (loaded) {
//     blip.start();
//   }
// }

function keyTyped() {
  if (key == "a") {
    if (loaded) {
      blip.start();
    }
  }

  if (key == "s") {
    if (loaded) {
      pink.start();
    }
  }

  if (key == "d") {
    if (loaded) {
      takerimba.start();
    }
  }

  if (key == "f") {
    if (loaded) {
      tears.start();
    }
  }
}

let loaded = false;

Tone.loaded().then(function () {
  loaded = true;
});
