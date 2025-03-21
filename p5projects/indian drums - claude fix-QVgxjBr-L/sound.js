// Sound class handles all audio-related functionality
class Sound {
    constructor(instrument) {
        this.instrument = instrument;    // Tone.Player instance
        this.bhol = null;               // Type of sound (will be set later)
        this.x = 50;                    // X position for visual display
        this.y = 0;                     // Y position (set based on grid row)
        this.size = 20;                 // Base size for visual display
        this.duration = 1;              // Default duration in grid units
    }

    // Set the type of sound and its duration
    setBhol(bholType) {
        this.bhol = bholType;
        // Set duration based on sound type
        switch(bholType) {
            case "num":                 // Longer sounds
            case "thom":
                this.duration = 2;
                break;
            default:                    // Standard sounds
                this.duration = 1;
        }
    }

    // Update vertical position based on grid row
    setPosition(row) {
        this.y = row * 40 + height / 2;
    }

    // Draw sound representation on canvas
    display() {
        if (this.bhol) {               // Only display if sound type is set
            fill(0, 200, 100);         // Green color for sound blocks
            rect(this.x, this.y, this.size * this.duration, this.size);
        }
    }

    // Play the sound using Tone.js
    play() {
        if (!loaded) {
            console.log("Waiting for Tone.js to load...");
            return;
        }
        if (this.instrument && this.bhol && this.instrument.has(this.bhol)) {
            this.instrument.player(this.bhol).start();
        } else {
            console.log("Instrument does not have sample: " + this.bhol);
        }
    }
}