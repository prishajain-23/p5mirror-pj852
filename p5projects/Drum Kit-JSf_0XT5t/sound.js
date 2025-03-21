// Sound Class
class Sound {
  constructor(instrument, bhol, row) {
    this.instrument = instrument;
    this.bhol = bhol;
    this.x = 50;
    this.y = row * 40 + height / 2;
    this.size = 20;
  }

  display() {
    fill(0, 200, 100);
    rect(this.x, this.y, this.size, this.size);
  }

  play() {
    if (!loaded) {
      console.log("Waiting for Tone.js to load...");
      return;
    }
    if (this.instrument && this.instrument.has(this.bhol)) {
      this.instrument.player(this.bhol).start();
    }
  }
}