// // 2. Make a beat, change its tempo
// // create a loop to play the kick drum twice per second (120 bpm)
// // add a button to toggle play/pause
// // add a slider to change the tempo

// let loaded = false;
// let button;

// const kit = new Tone.Players({
//   hh: "samples/505/hh.mp3",
//   hho: "samples/505/hho.mp3",
//   kick: "samples/505/kick.mp3",
//   snare: "samples/505/snare.mp3",
// });
// kit.toDestination();

// // set a default tempo speed using Tone.Transport:
// Tone.Transport.bpm.value = 120;

// // Create a loop!
// // call the function playBeat every quarter note
// // syntax for notes are "4n", "2n", "8n", etc.
// // See documentation here: https://github.com/Tonejs/Tone.js/wiki/Time
// Tone.Transport.scheduleRepeat(playBeat, "4n");

// function playBeat(time) {
//   kit.player("kick").start(time);
// }

// function setup() {
//   createCanvas(200, 200);
//   background(0);

//   button = createButton("play");
//   button.mousePressed(togglePlay);
//   button.position(width / 8, height / 6);

//   slider = createSlider(80, 180);
//   slider.position(width / 2, height / 2);
//   slider.size(80);
// }

// function togglePlay() {
//   if (Tone.Transport.state == "started") {
//     Tone.Transport.pause();
//     button.html("play");
//   } else {
//     Tone.Transport.start();
//     button.html("pause");
//   }
// }

// function draw() {
//   // stroke(255);
//   // line(width / 2, 0, width / 2, height);
//   // line(0, height / 2, width, height / 2);

//   // update the tempo every frame
//   Tone.Transport.bpm.value = slider.value();
// }

// Tone.loaded().then(function () {
//   loaded = true;
//   console.log("loaded!");
// });

// 2. Make a beat, change its tempo
// create a loop to play the kick drum twice per second (120 bpm)
// add a button to toggle play/pause
// add a slider to change the tempo
