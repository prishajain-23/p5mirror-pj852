let classifier;
let video;
let label;

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
}
function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.hide();
  
  classifier.classifyStart(video, gotResult);
}

function draw() {
  background(220);
  image(video, 0, 0);
  fill("white");
  text(label, 20, 20);
}

function gotResult(result) {
  console.log(result);
  label = 
}