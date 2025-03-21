// Define track categories
let lifeLessonNames = ["Lesson1", "Lesson2", "Lesson3", "Lesson4"];
let instrumentalNames = ["Inst1", "Inst2", "Inst3", "Inst4"];
let lifeLessonLoops = [];
let instrumentalLoops = [];
let n = 1; // Number of variations per track (keeping it 1 for simplicity)

function setup() {
  noCanvas(); // No need for a canvas in this project
  loadLoops(); // Load the audio loops
}

function loadLoops() {
  Tone.Transport.bpm.value = 120; // Set the tempo for synchronization
  
  // Load life lesson loops
  for (let i = 0; i < lifeLessonNames.length; i++) {
    lifeLessonLoops[i] = [];
    for (let j = 0; j < n; j++) {
      let name = lifeLessonNames[i] + " " + j;
      lifeLessonLoops[i][j] = new Loop("loops/" + lifeLessonNames[i] + j + ".mp3", i, j, name, 'left');
    }
  }
  
  // Load instrumental loops
  for (let i = 0; i < instrumentalNames.length; i++) {
    instrumentalLoops[i] = [];
    for (let j = 0; j < n; j++) {
      let name = instrumentalNames[i] + " " + j;
      instrumentalLoops[i][j] = new Loop("loops/" + instrumentalNames[i] + j + ".mp3", i, j, name, 'right');
    }
  }
}

// Wait for Tone.js to load before starting
Tone.loaded().then(function() {
  console.log("All audio files loaded successfully");
});