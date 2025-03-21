let cat;
let myCat;

function preload() {
  cat = loadImage("cat.jpg");
}

function setup() {
  createCanvas(cat.width, cat.height);
  myCat = createImage(width, height);

  myCat.loadPixels();
  cat.loadPixels();
  pixelDensity(1);
  
  for (let i = 0; i<cat.pixels.length; i++){
    myCat.pixels[i] = cat.pixels[i];
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      if ((x+y)%2 == 0) {
        myCat.pixels[index] = 0;
        myCat.pixels[index + 1] = 255;
        myCat.pixels[index + 2] = 0;
        myCat.pixels[index + 3] = 255;
      }
    }
  }

  myCat.updatePixels();

  image(myCat, 0, 0);
}