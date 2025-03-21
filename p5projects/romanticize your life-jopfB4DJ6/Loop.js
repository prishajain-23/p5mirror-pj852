class Loop {
  constructor(url, i, j, name, side) {
    this.player = new Tone.Player({
      url: url,
      loop: true // Enable looping
    });
    this.player.toDestination(); // Route audio output to speakers
    this.quantize = "@2m"; // Synchronize playback to measures

    this.button = createButton(name); // Create a button for playback
    this.button.mousePressed(this.toggle.bind(this)); // Attach click event
    this.button.style("width", "120px");
    this.button.style("height", "50px");
    this.button.style("background-color", "white");
    this.button.style("margin", "5px");
    
    // Position buttons based on side
    if (side === 'left') {
      this.button.position(50, i * 60 + 50);
    } else {
      this.button.position(windowWidth - 150, i * 60 + 50);
    }
  }

  toggle() {
    if (Tone.Transport.state !== "started") {
      Tone.start(); // Ensure audio context is running
      Tone.Transport.start(); // Start transport for synchronization
    }
    
    if (this.player.state === "started") {
      this.scheduleStop(); // If playing, schedule stop
    } else {
      this.scheduleStart(); // If stopped, schedule start
    }
  }

  start() {
    this.button.style("background-color", "black"); // Indicate active state
    this.button.style("color", "white");
  }

  stop() {
    this.button.style("background-color", "white"); // Reset button style
    this.button.style("color", "black");
  }

  scheduleStart() {
    this.player.start(this.quantize); // Schedule start on measure
    this.start(); // Update button style immediately
  }

  scheduleStop() {
    this.player.stop(this.quantize); // Schedule stop on measure
    this.stop(); // Update button style immediately
  }
}
