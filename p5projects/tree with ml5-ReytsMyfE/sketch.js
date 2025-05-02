let video;
let bodyPose;
let poses = [];

let smoothedNose;
let wind = 0;

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  stroke(255);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodyPose.detectStart(video, gotPoses);

  smoothedNose = createVector(width / 2, height / 2);
}

function draw() {
  background(0);

  // Get current nose position
  let currentNose = createVector(smoothedNose.x, smoothedNose.y); // fallback to last smoothed
  if (poses.length > 0) {
    let kpArray = poses[0].keypoints || poses[0].pose?.keypoints;
    if (kpArray) {
      let noseKeypoint = kpArray.find(
        (k) => k.name && k.name.toLowerCase() === "nose"
      );
      if (noseKeypoint) {
        currentNose.set(noseKeypoint.x, noseKeypoint.y);
      }
    }
  }

  // Smooth the nose position
  smoothedNose.lerp(currentNose, 0.05);

  // Map nose x-position to wind force
  wind = map(smoothedNose.x, 0, video.width, -PI / 8, PI / 8);

  // Draw the tree with wind applied
  push();
  translate(width / 2, height);
  branch(120);
  pop();
}

function branch(len) {
  stroke(255, map(len, 2, 120, 50, 255));
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 8) {
    push();
    rotate(20 + degrees(wind));
    branch(len * 0.67);
    pop();

    push();
    rotate(-20 + degrees(wind));
    branch(len * 0.67);
    pop();
  }
}

function gotPoses(results) {
  poses = results;
}