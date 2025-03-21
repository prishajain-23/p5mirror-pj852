let cam;

function setup() {
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
  
  cam.hide();
}

function draw() {
  background(220);
  
  image(cam, 0, 0);
  push();
  scale(-1, 1)
  copy(cam, 0, 0, width/2, height, -width, 0, width/2, height) // can copy an image and you can specify where you want it to start/end copying (like a selection tool)
  pop(); // push and pop create a matrix between them (like a piece of paper)
  
  
}