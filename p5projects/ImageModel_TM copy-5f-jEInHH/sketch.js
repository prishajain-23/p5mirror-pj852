// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/VV0XkHNSP/";
// Video
let video;
// To store the classification results
let results = [];
let isClassifying = false;

function preload() {
  // Load the image classifier
  classifier = ml5.imageClassifier(imageModelURL + "model.json", () => {
    console.log("Model loaded successfully!");
  });
}

function setup() {
  createCanvas(640, 480);
  
  // Create video
  video = createVideo(
    ["0.mp4"],
    () => {
      console.log("Video loaded successfully");
      video.volume(0);
      video.loop();
      video.hide();
      // Start classification after a short delay
      setTimeout(startClassification, 1000);
    }
  );
}

function startClassification() {
  if (!isClassifying) {
    console.log("Starting classification process");
    isClassifying = true;
    classifyVideo();
  }
}

function classifyVideo() {
  if (!video || !video.elt) {
    console.log("No video element available");
    return;
  }

  console.log("Attempting classification...");
  console.log("Video state:", {
    readyState: video.elt.readyState,
    paused: video.elt.paused,
    currentTime: video.elt.currentTime,
    duration: video.elt.duration
  });

  // Only classify if video is actually playing
  if (video.elt.readyState === 4 && !video.elt.paused) {
    classifier.classify(video.elt, (error, results) => {
      if (error) {
        console.error("Classification error:", error);
      } else {
        console.log("Classification successful:", results);
        updateResults(results);
      }
      // Continue classification loop
      setTimeout(classifyVideo, 250);
    });
  } else {
    console.log("Video not ready for classification");
    setTimeout(classifyVideo, 1000);
  }
}

function updateResults(newResults) {
  console.log("Updating results:", newResults);
  results = [...newResults];
  console.log("Current results array:", results);
}

function draw() {
  // Draw the video
  background(0);
  if (video) {
    image(video, 0, 0, width, height);
  }

  // Draw the results
  fill(255);
  noStroke();
  textSize(32);
  textAlign(LEFT);

  // Always draw this test text
  text("Classification Results:", 10, 30);

  if (results && results.length > 0) {
    results.forEach((result, i) => {
      text(
        `${result.label}: ${(result.confidence * 100).toFixed(2)}%`,
        10,
        70 + (i * 40)
      );
    });
  } else {
    text("Waiting for results...", 10, 70);
  }
}

function keyPressed() {
  if (key === 's') {
    video.stop();
    isClassifying = false;
  } else if (key === 'p') {
    video.play();
    startClassification();
  }
}