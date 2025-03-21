const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    
    const particlesLength = Math.floor(window.innerWidth / 9);
    
    for (let i = 0; i < particlesLength; i++) {
        particles.push(new Particle());     
    }
}

function draw() {
    background(0);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        // p.checkParticles(particles.slice(index));
        p.repel();
    })
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

class Particle {
    constructor() {
        //POSITION
        this.pos = createVector(random(width), random(height));
        //VELOCITY
        this.vel = createVector(random(-1, 1), random(-1, 1));
        //SIZE
        this.size = 10;

        this.r = random(0, 255);
        this.g = random(0, 255);
        this.b = random(0, 255);
    }

    //Update movement by adding velocity
    update(){
        this.pos.add(this.vel);
        this.edges();
    }

    //draw single particle
    draw() {
        noStroke();
        fill(this.r,this.g, this.b)
        circle(this.pos.x, this.pos.y, this.size);
    }

    //Detect edges
    edges() {
        if(this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }
        if(this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        }
    }

    // Connect particles
    // checkParticles(particles) {
    //     particles.forEach(particle => {
    //         const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
    //         if (d < 120) {
    //             stroke(this.r,this.g, this.b);
    //             line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
    //         }
    //     });
    // };

    repel() {
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
        let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        let mouse = createVector(mouseX, mouseY);
        let difference = p5.Vector.sub(mouse, this.pos);
        difference.setMag(1);
        //If the mouse comes near a particle, it moves away
        if (distance < 400) {
          this.pos.sub(difference);
        }
      }
}