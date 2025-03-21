class System {
  constructor(x, y, velData = []) {
    this.pos = createVector(x, y);
    this.particles = [];
    this.velData = velData;
    this.done = false;
  }

  addParticle() {
    // Pass velData to each new particle
    this.particles.push(new Particle(this.pos.x, this.pos.y, this.velData));
  }

  update() {
    // Add new particles
    if (random(1) < 0.9) { // High probability for frequent particles
      this.addParticle();
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].done) {
        this.particles.splice(i, 1);
      }
    }

    // Check if all particles are done
    this.done = this.particles.length === 0;
  }

  display() {
    for (let particle of this.particles) {
      particle.display();
    }
  }
}