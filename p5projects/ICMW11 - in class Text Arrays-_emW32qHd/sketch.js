let p;
let str = "";
let words = [];

function preload() {
  loadStrings("turkey.txt", process);
}

function setup() {
  noCanvas();
  p = createP();
}

function draw() {
  background(255);
  if (frameCount % 30 == 1) {
    str += random(words) + " ";
    p.html(str);
  }
}

function process(lines) {
  // use this kind of for loop when you want to call the whole array
  for (let line of lines) {
    console.log(line);
    // gives back a tokens array that removes all white spaces from text
    let tokens = splitTokens(line);
    words.push(...tokens);
    words.concat(tokens);
    console.log(tokens);
  }

  // in words loop pulls out 0
  for (let w in words) {
    let word = words[w];
    console.log("before", word);
    
    
    word.trim();
    word.toLowerCase();
    // dash needs to go first - if you want to put it later put a backslash in front of it
    word = word.replace(/[-_?!:;,.()]/g, '')
    console.log("after", word);
    words[w] = word;
  }
}
