let video; // Video element for playback
let featureExtractor; // Feature extractor for ML5.js
let classifier; // Classifier to label images
let currentLabel = ""; // Stores the current label to be added to regions
let boxes = []; // Array to store bounding box coordinates
let videoReady = false; // Tracks if the video is ready for processing
let loss; // Variable to track training loss

// Load the video file before setup
function preload() {
  video = createVideo("0.mp4", () => { // Load the video file
    console.log("Video loaded"); // Log when the video is loaded
    videoReady = true; // Mark the video as ready
  });
  video.hide(); // Hide the video element since we'll draw it to the canvas
}

// Initial setup for the canvas and ML5 feature extractor
function setup() {
  createCanvas(640, 480); // Create a canvas with 640x480 dimensions

  // Initialize MobileNet feature extractor
  featureExtractor = ml5.featureExtractor("MobileNet", modelLoaded);
  // Initialize a classifier tied to the video input
  classifier = featureExtractor.classification(video, videoReadyCallback);

  // Create buttons for labeling and actions
  let loveButton = createButton("Label Love"); // Button to set the label "love"
  loveButton.mousePressed(() => (currentLabel = "love")); // Set the label when pressed

  let lonelinessButton = createButton("Label Loneliness"); // Button to set the label "loneliness"
  lonelinessButton.mousePressed(() => (currentLabel = "loneliness")); // Set the label when pressed

  let saveBoxButton = createButton("Save Region"); // Button to save labeled regions
  saveBoxButton.mousePressed(saveBoxRegions); // Call function to save regions when pressed

  let trainButton = createButton("Train Model"); // Button to train the model
  trainButton.mousePressed(trainModel); // Call function to start training when pressed
}

// Callback when the feature extractor model is loaded
function modelLoaded() {
  console.log("FeatureExtractor (MobileNet) loaded!"); // Log success
}

// Callback when the video is ready for classification
function videoReadyCallback() {
  console.log("Video ready for classification!"); // Log readiness
  video.loop(); // Start the video in a loop
  videoReady = true; // Mark video as ready
}

// Main drawing loop
function draw() {
  background(0); // Clear the canvas with a black background

  if (videoReady) {
    image(video, 0, 0, width, height); // Draw the current video frame onto the canvas
    loadPixels(); // Ensure the canvas pixels are loaded into memory
    console.log("Video frame drawn on canvas."); // Debug log to confirm the video is drawn
  }

  // Draw all saved bounding boxes
  noFill();
  stroke(255, 0, 0); // Red outline for rectangles
  strokeWeight(2); // Thickness of rectangle outline
  boxes.forEach((box) => {
    rect(box.x, box.y, box.w, box.h); // Draw each bounding box
  });
}

// Handle key presses for video controls
function keyPressed() {
  if (key === 'p') { // Press 'p' to play the video
    video.play(); // Play the video
    console.log("Video playing."); // Log the action
  }

  if (key === 'a') { // Press 'a' to pause the video
    video.pause(); // Pause the video
    console.log("Video paused. Use mouse to draw bounding boxes."); // Log the action
  }

  if (key === 'r') { // Press 'r' to restart the video
    video.time(0); // Restart the video from the beginning
    video.pause(); // Pause the video
    console.log("Video restarted."); // Log the action
  }
}

// Start a new bounding box on mouse press
function mousePressed() {
  if (currentLabel !== "") { // Only start drawing if a label is selected
    boxes.push({ x: mouseX, y: mouseY, w: 0, h: 0 }); // Add a new bounding box
    console.log("Started a new bounding box:", boxes[boxes.length - 1]); // Log the new box
  }
}

// Update the size of the bounding box as the mouse is dragged
function mouseDragged() {
  let box = boxes[boxes.length - 1]; // Get the most recently added box
  if (box) {
    box.w = abs(mouseX - box.x); // Calculate width
    box.h = abs(mouseY - box.y); // Calculate height
    if (mouseX < box.x) box.x = mouseX; // Adjust for reverse dragging on x-axis
    if (mouseY < box.y) box.y = mouseY; // Adjust for reverse dragging on y-axis
    console.log("Updated bounding box:", box); // Log updated box dimensions
  }
}

// Save labeled regions by extracting bounding box pixel arrays
function saveBoxRegions() {
  if (currentLabel !== "" && boxes.length > 0) { // Ensure label and boxes exist
    boxes = boxes.filter((box) => box.w > 0 && box.h > 0); // Remove invalid boxes

    let added = 0; // Counter for successfully added images
    setTimeout(() => { // Add delay to ensure canvas rendering
      loadPixels(); // Load all pixel data into memory
      boxes.forEach((box) => {
        if (
          typeof box.w === "number" &&
          typeof box.h === "number" &&
          box.w > 0 &&
          box.h > 0 &&
          box.x >= 0 &&
          box.y >= 0 &&
          box.x + box.w <= width &&
          box.y + box.h <= height
        ) {
          // Create a p5.Image to hold the region's pixel data
          let img = createImage(box.w, box.h);
          img.loadPixels();
          for (let y = 0; y < box.h; y++) {
            for (let x = 0; x < box.w; x++) {
              let idxCanvas = ((box.y + y) * width + (box.x + x)) * 4; // Canvas pixel index
              let idxImage = (y * box.w + x) * 4; // Image pixel index
              img.pixels[idxImage] = pixels[idxCanvas];       // Red
              img.pixels[idxImage + 1] = pixels[idxCanvas + 1]; // Green
              img.pixels[idxImage + 2] = pixels[idxCanvas + 2]; // Blue
              img.pixels[idxImage + 3] = pixels[idxCanvas + 3]; // Alpha
            }
          }
          img.updatePixels();

          // Pass the created image to the classifier
          if (img) {
            console.log(`Extracted region for box:`, box);
            classifier.addImage(img, currentLabel); // Add the p5.Image object to the classifier
            added++;
          } else {
            console.log("Failed to create image for box:", box);
          }
        } else {
          console.log("Invalid bounding box skipped:", box); // Log skipped box
        }
      });
      console.log(`${added} regions labeled as ${currentLabel}`); // Log successfully added regions
      boxes = []; // Clear all boxes after saving
    }, 50); // 50ms delay for canvas update
  } else {
    console.log("No label selected or no bounding boxes drawn."); // Log if no boxes/labels exist
  }
}

// Train the model after labeling regions
function trainModel() {
  const numLabels = classifier.getNumLabels(); // Get the number of labeled categories
  if (numLabels === 0) { // Ensure there are labeled examples
    console.log("No examples added. Please add examples before training."); // Log error
    return;
  }

  console.log("Training model..."); // Log training start
  classifier.train((lossValue) => { // Start training
    loss = lossValue; // Update loss value
    if (loss == null) { // Check if training is complete
      console.log("Training complete!"); // Log success
    } else {
      console.log("Loss: " + loss); // Log the current loss value
    }
  });
}