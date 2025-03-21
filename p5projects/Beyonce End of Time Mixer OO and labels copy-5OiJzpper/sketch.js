// load 4 tracks
// create 4 sliders
// connect the value of the sliders to the volume of the tracks

let playButton;
let trackNames = [
  "adlibs", 
  "bass", 
  "drums1", 
  "drums2", 
  "fx", 
  "horns", 
  "percussion", 
  "strings", 
  "vox1", 
  "vox2", 
  "vox3", 
  "vox4" 
];
let tracks = [];

function setup() {
  noCanvas();
  
  // I've added a play button element directly to index.html:
  // <button id="play" disabled="disabled">, 
  playButton = select("#play");
  // alternatively, create the play button dynamically using: 
  // playButton = createButton("Play");
  // playButton.attribute("ID", "play");
  // playButton.attribute("disabled", "disabled");
  playButton.mousePressed(play);
  
  for(let i = 0; i < trackNames.length; i++){
    tracks[i] = new Track(trackNames[i], "stems/" + trackNames[i] + ".mp3");
  }
  
  // calling Tone.loaded() from setup to make sure it happens after p5 has been loaded, and the tracks have been created. 
  Tone.loaded().then(function(){  
    select("#play").removeAttribute("disabled");
  });
}

function draw() {
  background(220);
}

function play(){
  Tone.start();
  for(let i = 0; i < tracks.length; i++){
    tracks[i].player.start();
  }
}