// over the weekend:
// by sunday: prisha make sound class and instrument class
// meghna research timing and find the sounds (i.e. 1. figure out how to do varying button lengths per sound, 2. figure out timing of carnatic music and 16, 4, etc. 3. figure out how that coordinates together with multiple samples (are they all the same time ? ))
// on monday: meghna show prisha research and sounds integrated with code

//preload everything (load sounds and buffer)>> when loaded, buttons become cute >> instrument button click >> Sound Class >> Instrument Class>> button create (based on sound) - all called in draw loop

// store instances of instrument class in an instruments array
// should instrument class and tone.player be merged?

const tabla = new Tone.Players({
  num: "Tabla/NUM.wav",
  ta: "Tabla/TA.wav",
  tha: "Tabla/THA.wav",
  thi: "Tabla/THI.wav",
  thom: "Tabla/THOM.wav",
});

// replace tabla with mruthangam folder
const mruthangam = new Tone.Players({
  num: "Tabla/NUM.wav",
  ta: "Tabla/TA.wav",
  tha: "Tabla/THA.wav",
  thi: "Tabla/THI.wav",
  thom: "Tabla/THOM.wav",
});

//
const kartal = new Tone.Player("kartal.mp3");
const sitar = new Tone.Player("sitar.mp3");

let instruments = [tabla, mruthangam, kartal, sitar];
let instrumentNames = ["tabla", "mruthangam", "kartal", sitar]

let cells = [];

// let sounds = [
//   "mruthangam",
//   "kartal",
//   "tabla",
//   "dhol",
//   "harmonium",
//   "sitar",
//   "voice",
//   "something",
//   "something2",
// ]; //list of sounds available, depending on number of sounds, adjust the formula for making the buttons (in setup)
//can adjust this array so that it has other attributes as well, like each instrument is a list instead of one index, list of lists : [ [sound filename, display name for button, selected/unselected (true or false), south/north, [list of sounds associated]]]

//in the Sound class, pass in from the button clicked, then pass in the file name

//Instrument Class
//per instrument, what sounds need to get loaded

// An array of buttons
var buttons = [];
let countinstruments = 0;
var clicks = []; //list of buttons
let clearIt;
let selectedInstruments = [];

let started = 0;

////// SOUND CODE. . . ...

// create tone.players
// load in sounds
// instrument folder for each sound
// buttons for each instrument
// click button to make x sounds per instrument appear on side
// concat sounds to the sounds array on the side?
// set tempo - connect to a slider
// schedule repeat - call a playback function
// playback function - play the input loop
// sound class
// duration, velocity
// array of sounds

Tone.Transport.bpm.value = 120;

////////// DISPLAY CODE....

function preload() {
  img = loadImage("india-outline.jpg");
}

function setup() {
  createCanvas(700, 700);

  //Create drum loop buttons
  // A loop to evenly space out the buttons along the window
  for (let y = 0; y < 10; y++) {
    buttons[y] = [];
    for (let x = 0; x < 16; x++) {
      buttons[y][x] = new Button(
        80 + (x * width) / 20,
        (y * width) / 20 + height / 2,
        width / 20,
        width / 20
      ); //Calling the BUTTON class!!
    }
  }

  //make the buttons for the instrument options
  for (a = 0; a < instruments.length; a++) {
    clicks[a] = createButton(instruments[a], instruments[a]);
    if (a * 100 < width) {
      clicks[a].position(a * 100, height / 2 - height / 15);
    } else {
      clicks[a].position((a - 7) * 100 + 50, height / 2 - height / 25);
    }
    clicks[a].value(instruments[a]);
    clicks[a].mousePressed(chooseInstrument);
  }
  //make a Clear button
  let clearIt = createButton("Clear", 0);
  clearIt.position(width - 50, 10);
  clearIt.mousePressed(clearInstruments);
}

function draw() {
  background(220);

  // Draw buttons
  for (let y = 0; y < buttons.length; y++) {
    for (let x = 0; x < buttons[y].length; x++) {
      buttons[y][x].display();
    }
  }

  // Display active sound objects
  for (let sound of cells) {
    sound.display();
  }

  // for (var i = 0; i < buttons.length; i++) {
  //   buttons[i].display();

  //lines to segment four count
  push();
  strokeWeight(2);
  stroke(10, 0, 100);
  line(
    80 + (4 * width) / 20,
    height / 2,
    80 + (4 * width) / 20,
    (16 * height) / 2
  );
  line(
    80 + (8 * width) / 20,
    height / 2,
    80 + (8 * width) / 20,
    (16 * height) / 2
  );
  line(
    80 + (12 * width) / 20,
    height / 2,
    80 + (12 * width) / 20,
    (16 * height) / 2
  );
  pop();

  //
  push();
  strokeWeight(3);
  //Label each drum pad line
  for (
    let instrument = 0;
    instrument < selectedInstruments.length;
    instrument++
  ) {
    text(
      selectedInstruments[instrument],
      5,
      (instrument * width) / 20 + width / 40 + height / 2
    );
  }
  pop();

  // for (let y = 0; y < 10; y++ ){
  // for (let x = 0; x < 16; x++ ){
  // square(x*width/20 + 4*width/20, y*width/20 +height/2, width/20);

  // }}

  //}
}

function mousePressed() {
  for (let y = 0; y < buttons.length; y++) {
    for (let x = 0; x < buttons[y].length; x++) {
      buttons[y][x].click(mouseX, mouseY);
    }
  }
}

function chooseInstrument() {
  started = 1;
  countinstruments++;
  let label = append(selectedInstruments, this.value());
  console.log(this.value());
}

function clearInstruments() {
  started = 0;
  countinstruments = 0;
  selectedInstruments = [];
  clear();
  for (let y = 0; y < 10; y++) {
    buttons[y] = [];
    for (let x = 0; x < 16; x++) {
      buttons[y][x] = new Button(
        80 + (x * width) / 20,
        (y * width) / 20 + height / 2,
        width / 20,
        width / 20
      );
      console.log(buttons[y]);
    }
  }
}
