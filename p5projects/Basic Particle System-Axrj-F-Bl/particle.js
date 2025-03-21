class Particle {
  constructor(x, y) {
    // createVector() makes a vector, which can store 2-3 values. in this case, it will store 2 values: x, y
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    // creates a p5 object that pulls random values
    this.acc = p5.Vector.random2D();
    // reduces magnitude
    this.acc.mult(0.05);
    // change beginning to end
    this.life = 255;
    // var for removing objects
    this.done = false;
    this.hueValue = 150;
    this.bright = 0;
  }

  update() {
    // Calling a method inside a class
    this.finished();

    // Vector objects can't be manipulated directly --> use .add()/.sub() function
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.life -= 1;
        
    if(this.hueValue < 0) {
      this.hueValue = 255;
    }
    this.hueValue++;
  }

  display() {
    noStroke();
    fill(this.hueValue, 255, this.life);
    ellipse(this.pos.x, this.pos.y, 2);
  }

  finished() {
    if (this.life < 0) {
      this.done = true;
    } else {
      this.done = false;
    }
  }
}
