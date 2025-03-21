/*
  Project: Indian Classical Music Rhythm Sequencer                // Project name
  Description: An interactive grid-based interface for creating rhythmic patterns 
  using traditional Indian percussion sounds (tabla, mruthangam, etc.)   // Brief project description

  TODO:
  - Sunday: Complete Sound class and Instrument class implementation   // Tasks to complete on Sunday
  - Research needed:
    1. Implement varying button lengths for different sounds             // Research varying button lengths
    2. Research timing of Carnatic music (beats of 16, 4, etc.)            // Research Carnatic music timing
    3. Figure out coordination of multiple sound samples timing           // Coordinate timing of multiple samples
  - Monday: Integrate sound research with existing code                  // Task for Monday
  
  Implementation Flow:
  1. Preload and buffer all sounds                                      // Step 1: Preload sounds
  2. When loaded, make buttons interactive                              // Step 2: Activate buttons after load
  3. Handle instrument button clicks                                    // Step 3: Handle instrument selection
  4. Create Sound instances                                               // Step 4: Create Sound objects for grid
  5. Create Button instances based on selected sound                      // Step 5: Create grid buttons
*/

// Initialize instruments with their sound samples
const tabla = new Tone.Players({                             // Create tabla instrument using Tone.Players
  num: "Tabla/NUM.wav",                                      // Sample for "num": Long resonant stroke
  ta: "Tabla/TA.wav",                                        // Sample for "ta": Sharp tap sound
  tha: "Tabla/THA.wav",                                      // Sample for "tha": Bass stroke
  thi: "Tabla/THI.wav",                                      // Sample for "thi": Edge stroke
  thom: "Tabla/THOM.wav",                                    // Sample for "thom": Center stroke
});                                                          // End of tabla instrument definition
tabla.bhols = ["num", "ta", "tha", "thi", "thom"];          // Define available bhols for tabla

const mruthangam = new Tone.Players({                        // Create mruthangam instrument (South Indian drum)
  num: "Tabla/NUM.wav",                                      // Reusing tabla sample for "num"
  ta: "Tabla/TA.wav",                                        // Reusing tabla sample for "ta"
  tha: "Tabla/THA.wav",                                      // Reusing tabla sample for "tha"
  thi: "Tabla/THI.wav",                                      // Reusing tabla sample for "thi"
  thom: "Tabla/THOM.wav",                                    // Reusing tabla sample for "thom"
});                                                          // End of mruthangam instrument definition
mruthangam.bhols = ["num", "ta", "tha", "thi", "thom"];     // Define available bhols for mruthangam

// Single-sample instruments
const kartal = new Tone.Player("kartal.mp3");                // Create kartal instrument (wooden clapping)
kartal.bhols = ["play"];                                     // Define a default bhol for kartal (single sample)
const sitar = new Tone.Player("sitar.mp3");                  // Create sitar instrument (stringed instrument)
sitar.bhols = ["play"];                                      // Define a default bhol for sitar (single sample)

// Store all instruments for easy access and switching
let instruments = [tabla, mruthangam, kartal, sitar];        // Array containing all instrument objects

// Initialize global arrays and state variables
let cells = [];                                            // Array to store active sound objects on the grid
let buttons = [];                                          // 2D array to store grid button objects
// let clicks = [];                                        // (Old bhol selection buttons code commented out)
// let countinstruments = 0;                               // (Old counter for selected instruments, commented out)
// let selectedInstruments = [];                           // (Old array for storing selected instrument names, commented out)
let started = 0;                                           // Flag indicating whether the sequence has started
let currentInstrument = tabla;                             // Default selected instrument is tabla

// Set global tempo
Tone.Transport.bpm.value = 120;                            // Set the global tempo to 120 beats per minute

// Preload required assets
function preload() {                                      
    img = loadImage("india-outline.jpg");                // Load the background image from file "india-outline.jpg"
}

// Initial setup function executed once when the program starts
function setup() {
    createCanvas(700, 700);                              // Create a drawing canvas of 700 by 700 pixels
    
    // Create instrument selection buttons (HTML buttons)
    const instrumentNames = ["Tabla", "Mruthangam", "Kartal", "Sitar"];  // Array of instrument names for buttons
    for (let i = 0; i < instruments.length; i++) {       // Loop over each instrument in the instruments array
        let btn = createButton(instrumentNames[i]);      // Create an HTML button with the instrument name as its label
        btn.position(i * 100, 10);                       // Position each button horizontally (spaced 100 pixels apart) at y = 10
        btn.mousePressed(() => {                         // Attach an event handler to respond when the button is clicked
            currentInstrument = instruments[i];          // Set the global currentInstrument to the selected instrument
            createGrid();                                // Recreate the grid to reflect the bhols of the new instrument
        });                                              // End of mousePressed event handler
    }
    
    // Old bhol selection buttons code (no longer used)
    /*
    // Create sound selection buttons
    const bhols = ["num", "ta", "tha", "thi", "thom"];
    for (let i = 0; i < bhols.length; i++) {
        clicks[i] = createButton(bhols[i]);
        
        // Position buttons in two rows if needed
        if (i * 100 < width) {
            clicks[i].position(i * 100, height / 2 - height / 15);
        } else {
            clicks[i].position((i - 7) * 100 + 50, height / 2 - height / 25);
        }
        
        // Add click functionality
        clicks[i].bhol = bhols[i];
        clicks[i].mousePressed(function() {
            selectedInstruments.push(this.bhol);
            countinstruments++;
            started = 1;
            // Set the bhol for all button sounds
            for (let row of buttons) {
                for (let button of row) {
                    button.sound.setBhol(this.bhol);
                }
            }
        });
    }
    */
    
    // Create clear button to reset the grid and sequence
    let clearIt = createButton("Clear");               // Create an HTML button labeled "Clear"
    clearIt.position(width - 50, 10);                    // Position the clear button near the top right of the canvas
    clearIt.mousePressed(clearInstruments);            // Attach clearInstruments function to run when the button is clicked
    
    // Initially create the grid using the default instrument (tabla)
    createGrid();                                      // Call createGrid() to generate the grid based on currentInstrument's bhols
}

// Define grid creation function that builds the grid based on the current instrument
function createGrid() {
    // Determine number of grid rows from the number of bhols in the current instrument
    const GRID_ROWS = currentInstrument.bhols.length;  // Set grid rows equal to number of available bhols for the instrument
    const GRID_COLS = 16;                                // Set the number of grid columns to 16
    const GRID_START_X = 80;                             // Set starting x-coordinate for the grid to 80 pixels from the left edge
    const BUTTON_SIZE = width / 20;                      // Calculate each grid button's size as canvas width divided by 20

    buttons = [];                                      // Reset the buttons array to empty before creating new buttons
    for (let y = 0; y < GRID_ROWS; y++) {              // Loop over each row (each row corresponds to one bhol)
        buttons[y] = [];                             // Initialize the row in the buttons array as an empty array
        for (let x = 0; x < GRID_COLS; x++) {          // Loop over each column in the grid
            let buttonSound = new Sound(currentInstrument);  // Create a new Sound object using the current instrument
            buttonSound.setBhol(currentInstrument.bhols[y]);   // Set the Sound object's bhol based on the current row's bhol
            buttons[y][x] = new Button(               // Create a new Button object for this grid cell
                GRID_START_X + (x * BUTTON_SIZE),      // Calculate the x position: grid start plus column index times button size
                (y * BUTTON_SIZE) + height / 2,         // Calculate the y position: row index times button size plus vertical offset
                BUTTON_SIZE,                           // Set the button's width to BUTTON_SIZE
                BUTTON_SIZE,                           // Set the button's height to BUTTON_SIZE
                y,                                     // Pass the row index to the Button constructor
                x,                                     // Pass the column index to the Button constructor
                buttonSound                          // Associate the previously created Sound object with this button
            ); // End of Button constructor call
        }
    }
}

// Main draw loop runs continuously to update the canvas
function draw() {
    background(220);                                  // Clear the canvas with a light gray background

    // Loop over each button in the grid and display it
    for (let y = 0; y < buttons.length; y++) {        // Loop over each row in the buttons array
        for (let x = 0; x < buttons[y].length; x++) {   // Loop over each button in the current row
            buttons[y][x].display();                   // Call the display method to draw the button on the canvas
        }
    }

    // Loop to display all active sound objects (sound blocks)
    for (let sound of cells) {                         // Iterate over each Sound object stored in the cells array
        sound.display();                              // Call the display method of the Sound object
    }

    // Draw vertical beat segment lines to visually divide the grid into segments
    push();                                           // Save current drawing style settings
    strokeWeight(2);                                  // Set the stroke weight (line thickness) to 2 pixels
    stroke(10, 0, 100);                               // Set the stroke color to a dark blue tone
    for (let i = 4; i <= 12; i += 4) {                 // Loop to draw lines at every 4th column between 4 and 12
        let x = 80 + (i * (width / 20));               // Calculate the x-coordinate of the line using GRID_START_X and button size
        line(x, height / 2, x, height);                // Draw a vertical line from the top of the grid to the bottom of the canvas
    }
    pop();                                            // Restore previous drawing style settings

    // Optionally display the current instrument's bhols along the left side of the canvas
    push();                                           // Save current drawing style settings
    strokeWeight(3);                                  // Set stroke weight to 3 for text drawing
    for (let i = 0; i < currentInstrument.bhols.length; i++) {  // Loop over each bhol in the current instrument
        text(currentInstrument.bhols[i], 5, (i * width) / 20 + width / 40 + height / 2); // Draw the bhol text label on the canvas
    }
    pop();                                            // Restore previous drawing style settings
}

// Handle mouse input for grid button clicks
function mousePressed() {
    for (let y = 0; y < buttons.length; y++) {        // Loop over each row in the grid
        for (let x = 0; x < buttons[y].length; x++) {   // Loop over each button in the current row
            buttons[y][x].click(mouseX, mouseY);        // Call the click method on the button with current mouse coordinates
        }
    }
}

// Function to clear the grid and reset the sequence when the "Clear" button is pressed
function clearInstruments() {
    started = 0;                                      // Reset the sequence started flag to 0 (off)
    // countinstruments = 0;                           // (Old code commented out: reset instrument counter)
    // selectedInstruments = [];                       // (Old code commented out: clear selected instrument names)
    cells = [];                                       // Clear the array storing active sound objects
    clear();                                          // Clear the drawing canvas
    createGrid();                                     // Recreate the grid in its initial state
}

// Sound class handles all audio-related functionality for each sound block
class Sound {
    constructor(instrument) {
        this.instrument = instrument;                // Store the associated instrument (Tone.Player or Tone.Players)
        this.bhol = null;                            // Initialize the bhol type as null (will be set later)
        this.x = 50;                                 // Set default x position for visual display
        this.y = 0;                                  // Set default y position (will be updated based on grid row)
        this.size = 20;                              // Set the base size for the visual representation of the sound block
        this.duration = 1;                           // Set the default duration in grid units (modifiable by bhol type)
    }

    // Method to set the sound's bhol and adjust its duration accordingly
    setBhol(bhol) {
        this.bhol = bhol;                            // Store the bhol type (e.g., "num", "ta", etc.)
        // Adjust duration based on specific bhol type
        switch(bhol) {
            case "num":                           // If the bhol is "num"
            case "thom":                          // Or if the bhol is "thom"
                this.duration = 2;                // Set duration to 2 grid units (longer sound)
                break;                            // Exit the switch statement
            default:                              // For all other bhols
                this.duration = 1;                // Set duration to 1 grid unit (standard sound length)
        }
    }

    // Method to update the vertical position of the sound block based on its grid row
    setPosition(row) {
        this.y = row * 40 + height / 2;              // Calculate y position using row index and a vertical offset
    }

    // Method to display the sound block visually on the canvas
    display() {
        if (this.bhol) {                             // Only draw if the bhol type is set
            fill(0, 200, 100);                       // Set the fill color to green for the sound block
            rect(this.x, this.y, this.size * this.duration, this.size); // Draw a rectangle representing the sound block
        }
    }

    // Method to play the sound using Tone.js
    play() {
        if (!loaded) {                             // Check if Tone.js assets are loaded
            console.log("Waiting for Tone.js to load..."); // Log a message if assets are not yet loaded
            return;                                // Exit the function early if not loaded
        }
        // If the instrument is a Tone.Players instance and has the specified bhol sample
        if (this.instrument && this.bhol && typeof this.instrument.has === "function" && this.instrument.has(this.bhol)) {
            this.instrument.player(this.bhol).start();  // Retrieve and start playing the sample for the specified bhol
        } 
        // Otherwise, if the instrument is a single-sample Tone.Player
        else if (this.instrument && typeof this.instrument.start === "function") {
            this.instrument.start();               // Start playing the single sample
        }
        else {
            console.log("Instrument does not have sample: " + this.bhol); // Log an error if the sample is not available
        }
    }
}

// Button class handles grid interaction for each button cell
class Button {
    constructor(x, y, w, h, row, col, sound) {
        this.x = x;                                 // Set the x position of the button on the canvas
        this.y = y;                                 // Set the y position of the button on the canvas
        this.w = w;                                 // Set the width of the button
        this.h = h;                                 // Set the height of the button
        this.on = false;                            // Initialize the button state as off (inactive)
        this.row = row;                             // Store the grid row index where the button is located
        this.col = col;                             // Store the grid column index where the button is located
        this.sound = sound;                         // Associate a Sound object with this button
    }

    // Method to handle mouse click events on the button
    click(mx, my) {
        // Check if the mouse coordinates (mx, my) are within this button's boundaries
        if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {
            this.on = !this.on;                    // Toggle the button's on/off state
            if (this.on && this.sound) {             // If the button is activated and has an associated Sound object
                this.sound.setPosition(this.row);    // Update the Sound object's vertical position based on the grid row
                cells.push(this.sound);              // Add the Sound object to the active sounds array (cells)
                this.sound.play();                   // Play the sound using Tone.js
            }
        }
    }

    // Method to display the button on the canvas
    display() {
        stroke(10);                                  // Set the border color for the button
        fill(this.on ? color(0, 0, 140) : color(220, 220, 220)); // Set the fill color: blue if active, gray if inactive
        rect(this.x, this.y, this.w, this.h);          // Draw the button as a rectangle on the canvas
    }
}