// Declare global variables for drum sounds using SimplePlayer
let hihat, kick, snare, tom;

// Declare analyzer for waveform visualization
let analyzer;

// Track whether sounds are loaded and ready to play
let loaded = false;

// Preload function for Tone.js sound files
function preload() {
  // Create SimplePlayer instances for each drum sound
  hihat = new SimplePlayer("drums/hihat.wav");
  kick = new SimplePlayer("drums/kick.wav");
  snare = new SimplePlayer("drums/snare.wav");
  tom = new SimplePlayer("drums/tom.wav");
}

function setup() {
  // Create WEBGL canvas spanning the entire window
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Create a Tone.js Waveform analyzer specifically for the tom sound
  analyzer = new Tone.Analyser("waveform", 64);
  
  // Connect tom sound to the analyzer for waveform data
  tom.connect(analyzer);
  
  // Connect all sounds to the main audio destination
  hihat.toDestination();
  kick.toDestination();
  snare.toDestination();
  tom.toDestination();
}

function draw() {
  // Set a black background with slight opacity for trailing effect
  background(0, 30);
  
  // Add ambient lighting to create depth
  ambientLight(30);
  
  // Add directional light for more dynamic 3D rendering
  directionalLight(250, 250, 250, 0.25, 0.25, -1);
  
  // Slight automatic rotation to add movement to the scene
  rotateX(frameCount * 0.001);
  rotateY(frameCount * 0.002);
  
  // Hi-hat visualization (diagonal light beams)
  if (hihat.progress() > 0) {
    push(); // Save current transformation state
    translate(-width/4, -height/4, 0); // Position the visualization
    
    // Draw multiple diagonal light beams
    for (let i = 0; i < 5; i++) {
      // Random purple-pink stroke color with transparency
      stroke(random(200, 255), 0, 150, 150);
      strokeWeight(2);
      
      // Calculate beam length based on hi-hat sound progress
      let beamLength = hihat.progress() * 200;
      
      // Draw diagonal lines radiating from a point
      line(0, 0, 0, beamLength * cos(i), beamLength * sin(i), beamLength);
    }
    pop(); // Restore transformation state
  }
  
  // Kick drum visualization (pulsing 3D boxes)
  if (kick.progress() > 0) {
    push();
    translate(0, height/4, 0);
    
    // Create multiple boxes that pulse with kick sound
    for (let i = 0; i < 3; i++) {
      // Map box size to kick sound progress
      let boxSize = kick.progress() * 200;
      
      // Semi-transparent red fill and stroke
      fill(255, 0, 0, 100);
      stroke(255, 0, 0);
      
      // Stagger box positions and add rotation
      translate(i * 100, 0, i * 50);
      rotateX(frameCount * 0.01);
      
      // Draw the box
      box(boxSize);
    }
    pop();
  }
  
  // Snare visualization (rotating 3D rings)
  if (snare.progress() > 0) {
    push();
    translate(width/4, -height/4, 0);
    
    // Rotate rings based on snare progress
    rotateZ(snare.progress() * TWO_PI);
    
    // Draw multiple interconnected rings
    for (let i = 0; i < 6; i++) {
      // Cyan-colored, semi-transparent rings
      stroke(0, 255, 255, 150);
      noFill();
      
      // Calculate ring positions in a circular pattern
      let radius = 100;
      let angle = TWO_PI / 6 * i;
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      
      // Draw the rings
      strokeWeight(5);
      circle(x, y, 50);
    }
    pop();
  }
  
  // Tom visualization (3D waveform landscape)
  if (tom.progress() > 0) {
    push();
    translate(-width/4, height/4, 0);
    
    // Get waveform data from the analyzer
    let waveform = analyzer.getValue();
    
    // Create a rippling terrain effect based on waveform
    for (let y = -100; y < 100; y += 10) {
      beginShape(TRIANGLE_STRIP);
      for (let x = -100; x < 100; x += 10) {
        // Use noise and waveform to create dynamic terrain
        let z = map(noise(x * 0.1, y * 0.1, frameCount * 0.05), 0, 1, -50, 50);
        z += waveform[floor(random(waveform.length))] * 100;
        
        // Semi-transparent green fill and stroke
        fill(0, 255, 0, 100);
        stroke(0, 255, 0);
        
        // Create terrain vertices
        vertex(x, y, z);
        vertex(x, y + 10, z);
      }
      endShape();
    }
    pop();
  }
}

// Handle key press events for playing sounds
function keyTyped() {
  // Play corresponding drum sound when specific keys are pressed
  if (key === 'a') {
    hihat.start(); // Play hi-hat on 'a' key
  } else if (key === 's') {
    kick.start(); // Play kick drum on 's' key
  } else if (key === 'd') {
    snare.start(); // Play snare on 'd' key
  } else if (key === 'f') {
    tom.start(); // Play tom on 'f' key
  }
}

// Resize canvas when window is resized
function windowResized() {
  // Maintain full window coverage
  resizeCanvas(windowWidth, windowHeight);
}

// Ensure sounds are fully loaded before allowing playback
Tone.loaded().then(function() {
  // Set loaded flag to true
  loaded = true;
  
  // Log confirmation to console
  console.log("Sounds loaded!");
});