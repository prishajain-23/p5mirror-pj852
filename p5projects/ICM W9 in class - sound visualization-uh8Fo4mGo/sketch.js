let mic;
let fft;

function setup() {
  createCanvas(1024, 400);
  mic = new p5.AudioIn();
  mic.start();
  
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(255);
  
//   Volume Visualization
//   let level = mic.getLevel();
//   console.log(level);
  
//   let size = level * 1000
//   if(level > 0,5) background
//   ellipse(width/3, height/2, size);
//   ellipse(width/3, height/3, size);
  
//  Bins Visualization
  let bins = fft.analyze();
  for (let b = 0; b < bins.length; b++){
    let bin = bins[b];
    let y = height - bin
    line(b, height, b, y);
  }

//   Waveform Visualization
  // let wave = fft.waveform();
  // // console.log(wave);
  // beginShape();
  // for (let w = 0; w < wave.length; w++){
  //   let y = wave[w] * 100 + height/2;
  //   vertex(w, y);
  // }
  // endShape();
}