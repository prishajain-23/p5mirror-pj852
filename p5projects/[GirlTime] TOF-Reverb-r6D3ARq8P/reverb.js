let serial = new p5.WebSerial();
let portButton;
let inData = []; // stores serial values

let osc = new Tone.Oscillator(400, "sine").toDestination();
let reverb = new Tone.Reverb({
  decay: 2,
  preDelay: 0.01,
}).toDestination();
osc.connect(reverb);

// ATTEMPTED FREQUENCY ENVELOPE
// let freqEnv = new Tone.FrequencyEnvelope({
//  	"attack" : 0.2,
//  	"baseFrequency" : "C2",
//  	"octaves" : 4
//  });
//  freqEnv.connect(osc.frequency);

function setup() {
  createCanvas(100, 100);
  allSerialStuff();
}

function draw() {
  // let mappedDecay = map(inData[6], 600, 0, 3.0, 0.5);
  // reverb.decay = mappedDecay;
}

function keyPressed() {
  osc.start();
  console.log("osc started");

  // if ((key = "s")) {
  //   osc.stop();
  //   console.log("osc stopped");
  // }
}

function serialEvent() {
  // called when data is received
  let stringFromSerial = serial.readLine(); // read until newline character
  if (stringFromSerial) {
    // console.log(stringFromSerial);
    let trimmedString = trim(stringFromSerial); // remove whitespace
    let myArray = split(trimmedString, ","); // split string into array

    // if exactly 7 values received
    if (myArray.length === 7) {
      inData = myArray.map(Number); // convert all to numbers and store in inData

      // // CONTROL REVERB WITH TOF SENSOR
      // let mappedDecay = map(inData[6], 0, 600, 0.001, 3.0);
      // reverb.decay = mappedDecay;
      // console.log(inData[6])
      // console.log(reverb.decay);
    } else {
      print("Warning: Expected 7 values, received " + myArray.length);
    }
  }
}

function allSerialStuff() {
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
  // add serial connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
}
// if there's no port selected,
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}

// make the port selector window appear:
function choosePort() {
  if (portButton) portButton.show();
  serial.requestPort();
}

// open the selected port, and make the port
// button invisible:
// open the selected port, and make the port
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);

  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}

// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}
// read any incoming data as a string
// (assumes a newline at the end of it):

// try to connect if a new serial port
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}

function closePort() {
  serial.close();
}
