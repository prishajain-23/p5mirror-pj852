const serial = new p5.WebSerial();
let portButton;
let inData1, inData2;
let outByte = 0;
const PROCESS_INTERVAL = 30; 

let ps = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);

  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
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
}

function draw() {
  background(0);

  if (frameCount % PROCESS_INTERVAL === 0) {
    // Example logic using the three data values
    if (inData1 > 5) {
      ps.push(new System(width / 2, height / 2));
    }
    
    if (inData2 > 10) {
      ps.push(new System(width / 2, height / 2));
    }

//     if (inData3 > 100) {
//       ps.push(new System(width / 2, height / 2));
//     }
  }

  for (let i = ps.length - 1; i >= 0; i--) {
    ps[i].update();
    ps[i].display();

    if (ps[i].done) {
      ps.splice(i, 1);
    }
  }
}

// if there's no port selected,
// make a port select button appear:
function makePortButton() {
  portButton = createButton("choose port");
  portButton.position(10, 10);
  portButton.mousePressed(choosePort);
}

function choosePort() {
  serial.requestPort();
}

function openPort() {
  serial.open().then(initiateSerial);

  function initiateSerial() {
    console.log("port open");
  }

  if (portButton) portButton.hide();
}

function portError(err) {
  alert("Serial port error: " + err);
}

function serialEvent() {
  // read a string from the serial port:
  var inString = serial.readLine();

  // check to see that there's actually a string there:
  if (inString) {
    // Assume incoming data is comma-separated (e.g., "12,34,56")
    let data = inString.split(","); // Split string by commas into an array

    if (data.length === 2) {
      inData1 = Number(data[0]); // First data
      inData2 = Number(data[1]); // Second data
      // inData3 = Number(data[2]); // Third data
    }
  }
}

function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}

function closePort() {
  serial.close();
}

// function mouseClicked() {
//   ps.push(new System(width/2,height/2));
// }
