let ps = []; // Array to hold particle systems
let mappedTOF = [0, 0]; // Default mapped TOF data for position
let mappedVel = [0, 0, 0]; // Default mapped Velostat data

let serial1;
let serial2;

let portButton1, portButton2; // Buttons for selecting ports

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);

  // Initialize serial ports
  serial1 = new p5.WebSerial(); // Initialize serial1 here
  serial2 = new p5.WebSerial(); // Initialize serial2 here

  initializeSerial(); // Set up WebSerial ports
}

// Serial event handler for serial1 (TOF)
function serialEvent1() {
  let stringFromSerial = serial1.readLine();
  if (stringFromSerial) {
    try {
      let trimmedString = trim(stringFromSerial);
      let myArray = split(trimmedString, ",");

      // Assuming first two values are TOF, next three are Velostat
      for (let i = 0; i < min(myArray.length, 2); i++) {
        mappedTOF[i] = map(Number(myArray[i]), 0, 8190, 0, width);
        mappedTOF[i + 1] = map(Number(myArray[i + 1]), 0, 8190, 0, height);
      }

      console.log("Mapped TOF:", mappedTOF);
      console.log("Mapped Velostat:", mappedVel);
    } catch (error) {
      console.error("Error processing serial1 data:", error);
    }
  }
}

// Serial event handler for serial2 (Velostat data for hue)
function serialEvent2() {
  let stringFromSerial = serial2.readLine();
  if (stringFromSerial) {
    try {
      let trimmedString = trim(stringFromSerial);
      let myArray = split(trimmedString, ",");

      // Map Velostat data to hue range
      for (let i = 0; i < min(myArray.length, 3); i++) {
        mappedVel[i] = map(Number(myArray[i]), 0, 8190, 0, 255);
      }

      console.log("Mapped Velostat:", mappedVel); // Debug mappedVel
    } catch (error) {
      console.error("Error processing serial2 data:", error);
    }
  }
}

// Initialize WebSerial ports
function initializeSerial() {
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
    return;
  }

  // Serial1 setup
  serial1.getPorts();
  serial1.on("portavailable", () => {
    serial1
      .open()
      .then(() => {
        console.log("Port 1 open");
        serial1.on("data", serialEvent1); // Attach event handler
      })
      .catch((err) => {
        console.error("Error opening port 1:", err);
        alert("Error opening port 1: " + err);
      });
  });
  serial1.on("requesterror", (err) => {
    console.error("Serial 1 request error:", err);
    alert("Serial 1 request error: " + err);
  });

  // Serial2 setup
  serial2.getPorts();
  serial2.on("portavailable", () => {
    serial2
      .open()
      .then(() => {
        console.log("Port 2 open");
        serial2.on("data", serialEvent2); // Attach event handler
      })
      .catch((err) => {
        console.error("Error opening port 2:", err);
        alert("Error opening port 2: " + err);
      });
  });
  serial2.on("requesterror", (err) => {
    console.error("Serial 2 request error:", err);
    alert("Serial 2 request error: " + err);
  });
}

function draw() {
  background(0, 80); // Semi-transparent background for motion trails

  // Dynamically add a new particle system using mapped TOF data for position
  let x = mappedTOF[0] || width / 2; // Use first TOF value or fallback to center
  let y = mappedTOF[1] || height / 2; // Use second TOF value or fallback to center
  ps.push(new System(mouseX, mouseY, mappedVel)); // Pass mappedVel to system

  // Update and display all active particle systems
  for (let i = ps.length - 1; i >= 0; i--) {
    ps[i].update(); // Update particle system
    ps[i].display(); // Display particle system

    // Remove systems that are done
    if (ps[i].done) {
      ps.splice(i, 1);
    }
  }
}

// Resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
