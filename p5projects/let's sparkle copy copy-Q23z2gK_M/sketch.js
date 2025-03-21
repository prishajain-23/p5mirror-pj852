//image variables
let sparkle;
let rSparkle, gSparkle, bSparkle;

//alpha variables
let rA = 25;
let gA = 80; 
let bA = 50;
let rSpeed = 0.5 
let gSpeed, bSpeed;

function preload() {
  sparkle = loadImage("sparkle.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  rSparkle = createImage(sparkle.width, sparkle.height);
  gSparkle = createImage(sparkle.width, sparkle.height);
  bSparkle = createImage(sparkle.width, sparkle.height);
}

function draw() {
  // background(0);

  // Center sparkle image on the canvas
  translate((width - sparkle.width) / 2, (height - sparkle.height) / 2);

  //Load pixels for all images
  sparkle.loadPixels();
  rSparkle.loadPixels();
  gSparkle.loadPixels();
  bSparkle.loadPixels();

  // Copy sparkle pixels to rSparkle, gSparkle, bSparkle
  for (let i = 0; i < sparkle.pixels.length; i++) {
    rSparkle.pixels[i] = sparkle.pixels[i];
    gSparkle.pixels[i] = sparkle.pixels[i+1];
    bSparkle.pixels[i] = sparkle.pixels[i+2];
  }

  //Set baseline aSpeed depending on pixel brightness in sparkle image
  // for (i = 0; i < sparkle.pixels.length; i += 4) {
  //   colorMode(HSB);
  //   let c = color(
  //     sparkle.pixels[i],
  //     sparkle.pixels[i + 1],
  //     sparkle.pixels[i + 2]
  //   );
  //   let b = brightness(c);
  //   if (b < 85) {
  //     rSpeed = 0.25;
  //     gSpeed = 0.75;
  //     bSpeed = 1;
  //   } else if (b < 170) {
  //     rSpeed = 0.75;
  //     gSpeed = 1
  //     bSpeed = 0.25
  //   } else {
  //     rSpeed = 1;
  //     gSpeed = 0.25
  //     bSpeed = 0.75
  //   }
  // }

  rA += rSpeed
    // rSpeed++
  gA += gSpeed
    // gSpeed++
  bA += bSpeed
    // bSpeed++
  if (rA < 0 || rA > 85){
   rSpeed*=-1  
  }
  
  console.log(rA, gA, bA);

  // Manipulate pixels of each modified sparkle image
  colorSpotlight(rSparkle, "rValue");
  colorSpotlight(gSparkle, "gValue");
  colorSpotlight(bSparkle, "bValue");

  for (i = 0; i<rSparkle.pixels.length; i+=4){
    rSparkle.pixels[i+3] = rA;
  }
  
  //Update pixels for all modified sparkle images
  rSparkle.updatePixels();
  gSparkle.updatePixels();
  bSparkle.updatePixels();

  image(rSparkle, 0, 0);
  image(gSparkle, 0, 0);
  // image(bSparkle, 0, 0);
}

function colorSpotlight(image, highlight) {
  for (index = 0; index < image.pixels.length; index += 4) {
    if (highlight == "rValue") {
      image.pixels[index + 1] = 0; // Zero out green
      image.pixels[index + 2] = 0; // Zero out blue
      image.pixels[index + 3] = rA;
    } else if (highlight == "gValue") {
      image.pixels[index + 0] = 0; // Zero out red
      image.pixels[index + 2] = 0; // Zero out blue
      // image.pixels[index + 3] = gA * gSpeed;
    } else if (highlight == "bValue") {
      image.pixels[index + 0] = 0; // Zero out red
      image.pixels[index + 1] = 0; // Zero out green
      // image.pixels[index + 3] = bA * bSpeed;
    }
    // image.pixels[index + 3] = a*aSpeed;
  }
}

//   // Manipulate gSparkle pixels
//   for (index = 0; index < rSparkle.pixels.length; index += 4) {
//     rSparkle.pixels[index + 1] = 0; // Zero out Green
//     rSparkle.pixels[index + 2] = 0; // Zero out Blue
//     rSparkle.pixels[index + 3] = 85; // Set Alpha
//   }

//   // Manipulate bSparkle pixels
//   for (index = 0; index < rSparkle.pixels.length; index += 4) {
//     rSparkle.pixels[index + 1] = 0; // Zero out Green
//     rSparkle.pixels[index + 2] = 0; // Zero out Blue
//     rSparkle.pixels[index + 3] = 85; // Set Alpha
//   }
