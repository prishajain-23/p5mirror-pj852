let players = [];
let sliders = [];

// load a track
players[0] = new Tone.Player("stems/blobtower.mp3");
players[0].autostart = true;
players[0].toDestination();

players[1] = new Tone.Player({
      url: "stems/brazen_mo.mp3", 
      autostart: true
    });
players[1].toDestination();

players[2] = new Tone.Player({
      url: "stems/breezy_point_rd.mp3", 
      autostart: true
    }).toDestination();
  

// connect the vallue of the slider to volume of the track 

function setup() {
  noCanvas();
  // for each index in the players array
  for(let i in players) {
    // create a slider, connect it to the event listener
    sliders[i] = createSlider(-60, 0);
    sliders[i].id = i;
    sliders[i].input(volumeInput);
  }
}

function volumeInput(){
  console.log(this.id, this.value());
  let i = this.id;
  players[i].volume.rampTo(this.value());
}

function draw() {
  background(220);
}
