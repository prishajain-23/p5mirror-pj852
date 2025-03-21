let str = "I wish to wash my Irish wristwatch.";
console.log(str, str.length, str.charAt(0));
let c = 0;
let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  
  // Create a paragraph element
  createP(str);
  textSize(random(50, 100));
}

function draw() {
  //background(220);
  //text(str, 0, 0);
  //for(let c = 0; c < str.length; c++) {
  if(frameCount % 30 == 1) {
    // Get the character from the string
    let character = str.charAt(floor(c));
    
    // Calculate the width of the character
    let w = textWidth(character);
    
    // Caculate the height of the character
    let h = textAscent() + textDescent();
    
    // Wrap around, make space for the last character
    if( x > width - w) {
      x = 0;
      y += textAscent() + textDescent();
    }
    
    // Draw the character to the canvas
    text(character, x, random(height - h));
    
    // Shift over to the right
    x += w;
    
    // Advance to the next cahracter
    c++;
    c%=str.length;
  }
}