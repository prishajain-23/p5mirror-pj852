
// Button class handles grid interaction
class Button {
    constructor(x, y, w, h, row, col, sound) {
        this.x = x;                     // X position on canvas
        this.y = y;                     // Y position on canvas
        this.w = w;                     // Width
        this.h = h;                     // Height
        this.on = false;                // Button state
        this.row = row;                 // Grid row index
        this.col = col;                 // Grid column index
        this.sound = sound;             // Associated Sound object
    }

    // Handle mouse clicks
    click(mx, my) {
        if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {
            this.on = !this.on;         // Toggle button state
            if (this.on && this.sound) {
                this.sound.setPosition(this.row);  // Update sound position
                cells.push(this.sound);            // Add to active sounds
                this.sound.play();                 // Play the sound
            }
        }
    }

    // Draw button on canvas
    display() {
        stroke(10);                     // Border color
        fill(this.on ? color(0, 0, 140) : color(220, 220, 220));  // Blue when on, gray when off
        rect(this.x, this.y, this.w, this.h);
    }
}