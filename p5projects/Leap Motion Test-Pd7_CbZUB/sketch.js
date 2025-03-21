function setup() {
  createCanvas(800, 600);
  background(0);
  
  // First verify Leap exists
  if (typeof Leap === 'undefined') {
    console.error('Leap is not defined - library not loaded');
    return;
  }
  
  console.log('Leap is defined!');
  
  // Try to create controller
  try {
    const controller = new Leap.Controller();
    console.log('Controller created successfully');
    
    controller.on('connect', () => {
      console.log('Controller connected!');
    });
    
    controller.connect();
    console.log('Connect method called');
  } catch (error) {
    console.error('Error creating controller:', error);
  }
}

function draw() {
  background(0);
  fill(255);
  textSize(24);
  text("Check console for Leap status", 20, 30);
  text("Press Command+Option+J to open console", 20, 60);
}