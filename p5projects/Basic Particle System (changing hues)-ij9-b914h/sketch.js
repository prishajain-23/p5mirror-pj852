let ps = [];

const serial = new p5.WebSerial();
let portbutton;
let inData, inData2;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 255);
}

function draw() {
  background(0);
  
  // if (abs(pmouseX - mouseX) > 0 || abs(pmouseY - mouseY)) {
    ps.push(new System(width/2, height/2));
  // }
  for (let i = ps.length - 1; i >= 0; i--) {
    ps[i].update();
    ps[i].display();

    if (ps[i].done) {
      ps.splice(i, 1);
    }
  }
  // console.log(ps.length);
}

function serialEvent() {
  // this is called when data is recieved, data will then live in fromSerial
  let fakeData = "150,300";
  // var stringFromSerial = serial.readLine(); // reads everything till the new line charecter
  // if (stringFromSerial) {
  //   // is there something there ?
  //   var trimmedString = trim(stringFromSerial); // get rid of all white space (returns, spaces, tabs)
    var myArray = split(fakeData, ","); // splits the string into an array on commas
    inData = Number(myArray[0]); // get the first item in the array and turn into integer
    inData2 = Number(myArray[1]); // get the second item in the array and turn into integer
    
    console.log(inData, inData2);
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