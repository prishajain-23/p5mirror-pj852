// send 2 ascii values from arduino to P5 with webSerial
// based on Tom Igoe's lab examples

const serial = new p5.WebSerial();
let portButton;
let inData, inData2;

function setup() {
  createCanvas(800, 600);
  background(0);
  allSerialStuff();
}

function draw() {
  // do your drawing stuff here
  // no serial info here
  // let xPosition = map(inData, 0, 1023, 0, width);
  // let yPosition = map(inData2, 0, 1023, 0, height);
  for (x = 0; x < width; x+=20) {
    for (y = 0; y <= height; y+=20) {
      let r = map(inData, 0, 1023, 0, 255);
      let g = map(inData2, 0, 1023, 0, 255);
      fill(r, g, random(100, 255));
      noStroke();
      ellipse(x, y, 15, 15);
    }
  }
}

function mousePressed() {
  background(255);
}

function serialEvent() {
  // this is called when data is recieved, data will then live in fromSerial
  var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  if (stringFromSerial) {
    // is there something there ?
    var trimmedString = trim(stringFromSerial); // get rid of all white space (returns, spaces, tabs)
    var myArray = split(trimmedString, ","); // splits the string into an array on commas
    inData = Number(myArray[0]); // get the first item in the array and turn into integer
    inData2 = Number(myArray[1]); // get the second item in the array and turn into integer
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
