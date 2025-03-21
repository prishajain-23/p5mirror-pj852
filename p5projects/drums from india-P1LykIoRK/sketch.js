// create tone.players
// load in sounds
// instrument folder for each sound
// buttons for each instrument
// click button to make x sounds per instrument appear on side
    // concat sounds to the sounds array on the side?
// set tempo - connect to a slider
// schedule repeat - call a playback function
// playback function - play the input loop
// sound class
    // duration, velocity
// array of sounds

const tabla = new Tone.Players({
  na: "tabla/na.mp3",
});

Tone.Transport.bpm.value = 120;

class Sound {
  constructor(bhol, row, length, velocity) {
    this.bhol = bhol;
    this.x = 50;
    this.y = row;
    this.size = 20;
    this.length = length;
    this.velocity = velocity;
  }
  display() {
    for (let i = 0; i < 17; i++) {
      rect(this.x, this.y, this.size);
    }
  }
  play() {
    Tone.Transport.scheduleRepeat(this.length);
  }
}