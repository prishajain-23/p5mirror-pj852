const synth = new Tone.PolySynth().toDestination();

// Just intonation: C
let referencePitch = 16.35;  // middle C: 261.6; 
let octave = 4; // middle C: 4 
let factors = [1 / 1, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 15 / 8];

// 22 Srutti system subset: Shadja Grama Sa 1/1
// let factors = [9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2/1];
// let referencePitch = 195.99771799087463;

let dl = new Tone.Loop(droneLoop, "2n");
function droneLoop(time) {
  let dronePitch = getPitch
}

let ml = new Tone.Loop(melodyLoop, "8n");
function melodyLoop(time){

  let pos = floor(random(0, 24));
  let pitch = getPitch(pos);
  console.log(pitch);  
  synth.triggerAttackRelease(pitch, "8n", time);  
}

function getPitch(pos){
  let scaleDegree = pos % factors.length;  
  let adjustedOctave = octave + floor(pos / factors.length);  
  let pitch = getPitchAtModePos(scaleDegree, adjustedOctave);
  console.log(" pos:", pos,
               " deg:", scaleDegree, 
                " oct:", adjustedOctave, 
              " w: ", Math.pow(2, octave),
              " pitch:", pitch
  );
  return pitch;
}

function getPitchAtModePos(pos, octave){  
  return referencePitch * factors[pos] * Math.pow(2, octave);
}

function mousePressed(){
  Tone.Transport.start();
  ml.start();
  dl.start();
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

