// The Code of Music
// NYU ITP/IMA Fall 2024
// Luisa Pereira

// Starter code for the Melody chapter

// Create a Synth instrument, which can play specific frequencies
const synth = new Tone.Synth();
synth.toDestination();

// let event = new Tone.Loop(callback, "8n");

// Tone.Sequence example

// let event = new Tone.Sequence(callback, [100, 200, 160, 340, 560], "8n");

// function callback(time, frequency) {
//   synth.triggerAttackRelease(frequency, "16n", time);
// }

// Tone.Part example
let event = new Tone.Part(callback, 
                          [0, 100],
                          [0.2, 200],
                          [0.3, 160],
                          [0.5, 340],
                          [0.8, 560]
                         );
function callback(time, frequency) {
  synth.triggerAttackRelease(time, frequency);
}

event.loop = true;

let fMin = 80;
let fMax = 1300;

function mousePressed() {
  let frequency = yToF(mouseY);
  console.log(frequency);
  let velocity = mouseX / width;
  synth.triggerAttack(frequency, velocity);
}

// function yToF(y){
//   // return map(y, height, 0, fMin, fMax);
//   let turns = 2;
//   let steps = map(y, height, 0, 0, turns);
//   return fMin * Math.pow(2, steps);
  
// }

function mouseReleased() {
  // Release (stop playing) the tone
  synth.triggerRelease();
}

// Create p5.js' setup function - this is just to make sure p5.js is initialized 
// and the event handlers we defined above (mousePressed, mouseReleased) are called
function setup() {
  createCanvas(200, 200);
}

function draw(){
  background(0);
}
