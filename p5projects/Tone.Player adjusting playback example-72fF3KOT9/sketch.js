// Original code by Luisa Pereira
// allows for adjusted playback of the sample

let player = new Tone.Player("samples/congas.m4a");
// Properties:
// playbackRate:1
// loop:false
// autostart:false
// loopStart:0
// loopEnd:0
// retrigger:false
// reverse:false

player.loop = true;
player.retrigger = true;

//Make loop shorter
// player.loopStart = 0;
// player.loopEnd = "8n";
player.toMaster();

function setup() {
	console.log("Play spacebar to start/stop. Mouse left and right to change speed. Click to reverse");
}

function draw() {
  player.playbackRate = map(mouseX, 0, width, 0.1, 1);
}

function keyPressed() {
  if (key == ' ') {
    if (player.state == "stopped") {
      player.start();
    } else {
      player.stop();
    }
  }
}

function mouseReleased() {
  player.reverse = !(player.reverse);
}