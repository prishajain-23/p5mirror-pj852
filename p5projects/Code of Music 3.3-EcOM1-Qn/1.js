// // 1. make a drum pad
// const kit = new Tone.Players({
//   hh: "samples/505/hh.mp3",
//   hho: "samples/505/hho.mp3",
//   kick: "samples/505/kick.mp3",
//   snare: "samples/505/snare.mp3",
// });
// kit.toDestination();

// function mousePressed() {
//   if (kit.loaded) {
//     if (mouseX < width / 2 && mouseY < height / 2) {
//       kit.player("kick").start();
//     }
//     if (mouseX < width / 2 && mouseY > height / 2) {
//       kit.player("hh").start();
//     }
//     if (mouseX > width / 2 && mouseY < height / 2) {
//       kit.player("hho").start();
//     }
//     if (mouseX > width / 2 && mouseY > height / 2) {
//       kit.player("snare").start();
//     }
//   }
// }

// function setup() {
//   createCanvas(200, 200);
//   background(0);
// }

// function draw() {
//   stroke(255);
//   line(width / 2, 0, width / 2, height);
//   line(0, height / 2, width, height / 2);
// }
