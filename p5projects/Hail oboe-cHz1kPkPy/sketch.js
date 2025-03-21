// Declare global variables
let video; // Variable to hold the video element
let detector; // Variable for the object detection model
let detections = []; // Array to store detected objects

// Preload function runs before the setup to load external assets
function preload() {
  // Load a video file and prepare it with the `videoReady` callback
  video = createVideo(createCapture(VIDEO), videoReady);
}

// The setup function initializes the sketch
function setup() {
  video.size(1080, 1920); // Set the size of the video
  video.play(); // Start playing the video
  video.hide(); // Hide the video element (it will be displayed on the canvas)
  frameRate(10); // Limit frame rate to 10 frames per second
  createCanvas(1080, 600); // Create a canvas to display the video and results
  OPC.toggle("showConfidence", false); // Toggle to hide confidence levels in detections
  OPC.toggle("people", true); // Enable detection and display for people
  OPC.toggle("cars", true); // Enable detection and display for cars
  OPC.toggle("motorcycles", true); // Enable detection and display for motorcycles
}

// Callback when the video is ready
function videoReady() {
  // Initialize the COCO-SSD object detection model
  detector = ml5.objectDetector("cocossd", modelReady);
}

// Callback for when the COCO-SSD model is ready
function modelReady() {
  // Start detecting objects in the video
  detector.detect(video, gotDetections);
}

// Callback for processing detection results
function gotDetections(error, results) {
  if (error) {
    console.error(error); // Log any errors to the console
  }
  detections = results; // Store the detected objects in the `detections` array
  detector.detect(video, gotDetections); // Continue detecting in a loop
}

// The draw function is called continuously to render the canvas
function draw() {
  image(video, 0, 0); // Display the video frame on the canvas

  // Loop through all detected objects
  for (let i = 1; i < detections.length; i += 1) {
    let object = detections[i]; // Get the current detected object

    // Check if the detected object is a person and display it
    if (object.label == "person" && people == true) {
      stroke(0, 255, 0); // Set a green stroke for the bounding box
      strokeWeight(2); // Set stroke weight
      noFill(); // Disable fill for the rectangle
      rect(object.x, object.y, object.width, object.height); // Draw bounding box around the object
      noStroke(); // Disable stroke for text
      fill(255); // Set text color to white
      textSize(24); // Set text size
      if (showConfidence == true) {
        // Display object label with confidence percentage
        text(
          object.label + " " + round(object.confidence * 100) + "%",
          object.x + 10,
          object.y - 24
        );
      } else {
        // Display object label only
        text(object.label, object.x + 10, object.y - 24);
      }
    }

    // Check if the detected object is a car and display it
    if (object.label == "car" && cars == true) {
      stroke(0, 255, 0); // Set green stroke
      strokeWeight(2); // Set stroke weight
      noFill(); // Disable fill
      rect(object.x, object.y, object.width, object.height); // Draw bounding box
      noStroke(); // Disable stroke for text
      fill(255); // Set text color to white
      textSize(24); // Set text size
      if (showConfidence == true) {
        text(
          object.label + " " + round(object.confidence * 100) + "%",
          object.x + 10,
          object.y - 24
        );
      } else {
        text(object.label, object.x + 10, object.y - 24);
      }
    }

    // Check if the detected object is a motorcycle and display it
    if (object.label == "motorcycle" && motorcycles == true) {
      stroke(0, 255, 0); // Set green stroke
      strokeWeight(2); // Set stroke weight
      noFill(); // Disable fill
      rect(object.x, object.y, object.width, object.height); // Draw bounding box
      noStroke(); // Disable stroke for text
      fill(255); // Set text color to white
      textSize(24); // Set text size
      if (showConfidence == true) {
        text(
          object.label + " " + round(object.confidence * 100) + "%",
          object.x + 10,
          object.y - 24
        );
      } else {
        text(object.label, object.x + 10, object.y - 24);
      }
    }
  }
}
