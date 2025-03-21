class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = p5.Vector.random2D(); //creates a vector with random components in the 2D plane (x, y), where both x and y are values between -1 and 1.
    this.acc.mult(random(0.05, 0.07)); //multiplies value 1 to 0.05

    this.life = inData1
    this.done = false;
    this.hueVal = 255
  }

  update() {
    this.finished();

    this.vel.add(this.acc);
    this.pos.add(this.vel); //add x,y component of pos to the x,y component of vel

    if (this.hueVal > 255){
      this.hueVal = 0
    }
    
    this.hueVal += random(5,10)
    this.life -= 2;
  }

  display() {
    
    noStroke();
    fill(inData1, inData2, 150);
    //fill(inData, inData, this.life);
    ellipse(this.pos.x, this.pos.y, 3, 3);
  }

  finished() {
    if (this.life < 0) {
      this.done = true;
    } else {
      this.done = false;
    }
  }
}
