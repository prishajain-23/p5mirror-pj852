let synth = new Tone.Synth();
synth.toDestination();

/*
pseudocode

let chain = new Markove({
  "C": [G 70%, C 30%],
  "G": [G 30%, C 70%]
})
*/

let chain = new Markov({
  "C2": [
    { value: "G2", probability: 0.3 },
    { value: "C2", probability: 0.7 },
  ],
  "G2": [
    { value: "C2", probability: 0.3 },
    { value: "G2", probability: 0.7 },
  ],
});
chain.value = "C2";

function setup() {}

function draw() {}

let loop = new Tone.Loop(function(time){
let nextPitch = chain.next();
synth.triggerAttack(nextPitch, "16n", time);
}, "8n").start(0);
Tone.Transport.start()

// INTERACTIVE VERSION:
// function keyPressed() {
//   let nextPitch = chain.next();
//   synth.triggerAttack(nextPitch);
// }

// function keyReleased() {
//   synth.triggerRelease();
// }
