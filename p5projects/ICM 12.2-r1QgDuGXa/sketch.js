// Array of words
let words = [];

// Variable to hold the random string being built
let str = '';

// Paragraph element to hold the text
let p;

function preload() {
  loadStrings('butter.txt', process);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = createP();
}

function draw() {
  // Draw next word every half second
  if (frameCount % 30 == 1) {
    // Add another word to the string and a whitespace
    str += random(words) + ' ';
    // Update paragraph element
    p.html(str);    
  }
}

function process(lines) {
  // Go line by line by value
  for (let line of lines) {
    // Turn each line into an array of words
    let tokens = splitTokens(line);
    // Add it to 1 big array
    words = words.concat(tokens);
  }
  // Go word by word, by index
  // Clean up each word
  for (let w = words.length-1; w >= 0; w--) {
    let word = words[w];
    // Remove punctuation
    word = word.replace(/[-_:;.,!?()]/g, "");
    // Make it all lowercase
    word = word.toLowerCase();
    // Get rid of whitespace around the word
    word = word.trim();
    // If nothing is left, get rid of it
    if (word.length < 1) words.splice(w, 1);
    // Otherwise put cleaned up word back in array
    else words[w] = word;
  }
}