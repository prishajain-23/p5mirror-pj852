let classifier; // Variable to store the image classifier
let currentImage; // Variable to store the currently displayed image
let results = []; // Array to store classification results
let modelReady = false; // Boolean flag to indicate if the model is loaded
let imageIndex = 0; // Index to track the current image in the array
let images = []; // Array to hold all the images to be classified

// URL of the Teachable Machine model
let imageModelURL = "https://teachablemachine.withgoogle.com/models/VV0XkHNSP/";

function preload() {
  // Preload function runs before setup()
  // Load the image classification model
  classifier = ml5.imageClassifier(imageModelURL + "model.json", () => {
    console.log("Model loaded successfully!");
    modelReady = true; // Set the flag to true once the model is loaded
  });

  // Load images into the images array
  images[0] = loadImage("0.png"); // Load image 0
  images[1] = loadImage("1.png"); // Load image 1
  images[2] = loadImage("2.png"); // Load image 2
  images[3] = loadImage("3.png"); // Load image 3
  images[4] = loadImage("4.png"); // Load image 4
  images[5] = loadImage("5.png"); // Load image 5
  images[6] = loadImage("6.png"); // Load image 6
}

function setup() {
  createCanvas(640, 480); // Create a 640x480 pixel canvas
  background(0); // Set the initial background to black

  // Display the first image initially
  currentImage = images[0];
  
  // If the model is ready, classify the first image
  if (modelReady) {
    classifyImage();
  }
}

function classifyImage() {
  // Check if the model and current image are ready
  if (!modelReady || !currentImage) {
    console.log("Model or image not ready");
    return; // Exit the function if not ready
  }

  // Log the current image being analyzed
  console.log(`\nAnalyzing Image ${imageIndex + 1}...`);

  // Use the classifier to classify the current image
  classifier.classify(currentImage, gotResult);
}

function gotResult(error, newResults) {
  // If the error parameter is actually the results array
  if (Array.isArray(error)) {
    newResults = error; // Treat it as the results
    error = null; // Clear the error
  }

  // Handle any classification errors
  if (error) {
    console.error("Real classification error:", error);
    return;
  }

  // Log the classification results
  console.log(`\n📊 Results for Image ${imageIndex + 1}:`);
  newResults.forEach((result) => {
    const percentage = (result.confidence * 100).toFixed(2); // Confidence as percentage
    const emoji = result.label === "love" ? "❤️" : "😔"; // Emoji based on label
    console.log(`${emoji} ${result.label}: ${percentage}%`); // Log label and confidence
  });

  // Update the global results array with the new classification results
  results = [...newResults];
}

function draw() {
  background(0); // Clear the canvas with a black background

//   // Draw the current image on the canvas
//   if (currentImage) {
//     // // Calculate scale ratio to fit the image within the canvas while maintaining aspect ratio
//     // let scaleRatio = Math.min(
//     //   width / currentImage.width,
//     //   height / currentImage.height
//     // );
//     let newWidth = currentImage.width * scaleRatio; // Scaled width
//     let newHeight = currentImage.height * scaleRatio; // Scaled height
//     let x = (width - newWidth) / 2; // Center the image horizontally
//     let y = (height - newHeight) / 2; // Center the image vertically

//     // Draw the image at the calculated position and size
//     image(currentImage, x, y, newWidth, newHeight);
//   }
  
  image(currentImage, 0, 0, width, height);

  // Draw the classification results as an overlay
  if (results && results.length > 0) {
    console.log("Drawing results:", results); // Debug log to verify results exist

    // Draw a semi-transparent rectangle as a background for results
    noStroke();
    fill(0, 0, 0, 200); // Black with transparency
    rect(10, 10, 300, 75);

    // Title for results overlay
    fill(255); // White text
    textSize(16);
    textAlign(LEFT);

    // Loop through each classification result and display it
    results.forEach((result, i) => {
      const y = 40 + i * 25; // Y-position for each result
      const confidence = (result.confidence * 100).toFixed(1); // Confidence percentage

      // Draw a semi-transparent rectangle behind each result line
      fill(0, 0, 0, 150);
      rect(15, y - 15, 290, 20);

      // Set text color based on confidence value
      fill(confidence > 50 ? color(100, 255, 100) : 255); // Green if confidence > 50%
      text(`${result.label}: ${confidence}%`, 20, y); // Display label and confidence
    });
  }
}

function keyPressed() {
  // Check if the "P" key is pressed
  if (key === "p" || key === "P") {
    // Increment the image index to switch to the next image
    imageIndex = (imageIndex + 1) % images.length; // Loop back to start if at the end
    currentImage = images[imageIndex]; // Update the current image
    console.log("\nSwitched to image", imageIndex + 1);

    // Classify the new image
    classifyImage();
  }
}