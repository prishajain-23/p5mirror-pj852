class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = p5.Vector.random2D().mult(random(0.1, 0.5));
    this.life = 255; // Lifespan
    this.done = false;
    this.hueValue = 150; // Default hue if no input
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.life --; // Decrease lifespan
    this.done = this.life < 0; // Mark as done when lifespan ends
  }

  display() {
    noStroke();
    fill(this.hueValue, 255, this.life); // Use hue value with fade-out
    ellipse(this.pos.x, this.pos.y, 2); // Fixed size of 2
  }

//   finished() {
//     this.done = this.life < 0;
//   }
}