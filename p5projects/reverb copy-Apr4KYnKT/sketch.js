
const sound = new SimplePlayer("sounds/congas.m4a");
sound.loop = true;
let reverb = new Tone.Reverb({decay: 0.5, 
                              wet: 0});
sound.connect(reverb);
reverb.toDestination();
sound.autostart = true;


let loaded = false;

let reverbSlider;
function setup(){
  createCanvas(100,100);
  reverbSlider = createSlider(0, 1, 0, 0.1);
  reverbSlider.input(updateReverb);
}

function draw(){
  
}

function updateReverb(){
  // reverb.wet.value = reverbSlider.value();
  reverb.wet.rampTo(reverbSlider.value());
}

