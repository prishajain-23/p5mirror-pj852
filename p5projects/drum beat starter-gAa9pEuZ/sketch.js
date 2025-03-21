
const kit = new Tone.Players({
  "kick": "samples/505/kick.mp3", 
  "snare": "samples/505/snare.mp3"
});
kit.toDestination();

function setup(){
  createCanvas(200, 200); 
  background(0);
}

function draw(){
  
}
