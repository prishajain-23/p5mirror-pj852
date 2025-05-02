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
  C2: [
    { value: "G2", probability: 0.3 },
    { value: "C2", probability: 0.7 },
  ],
  C2: [
    { value: "G2", probability: 0.3 },
    { value: "C2", probability: 0.7 },
  ],
});

function setup() {}

function draw() {}

function keyPressed() {
  synth.triggerAttack(random(100, 900));
}

function keyReleased() {
  synth.triggerRelease();
}
