// loops triggered by user

let loaded = false;
const bass = new Tone.Player({
          url: "loops/Bass0.mp3",
          loop: true
        });
bass.toDestination();

const chords = new Tone.Player({
          url: "loops/Chords0.mp3",
          loop: true
        });
chords.toDestination();

const melody = new Tone.Player({
          url: "loops/Melody0.mp3",
          loop: true
        });
melody.toDestination();

const drums = new Tone.Player({
          url: "loops/Drums0.mp3",
          loop: true
        });
drums.toDestination();

function setup() {  
  noCanvas();
  
}

function draw() {
  // not drawing anything for now
  
}

function keyTyped(){
  if(loaded){
		if(key == 'a'){
			if(drums.state =="stopped"){
				drums.start();		
			}
			else{
				drums.stop();
			}
		}
        if(key == 's'){
            if(bass.state =="stopped"){
                bass.start();		
            }
            else{
                bass.stop();
            }
        }
        if(key == 'd'){
            if(chords.state =="stopped"){
                chords.start();		
            }
            else{
                chords.stop();
            }
        }
        if(key == 'f'){
            if(melody.state =="stopped"){
                melody.start();		
            }
            else{
                melody.stop();
            }
        }
	}
}

Tone.loaded().then(function(){  
  loaded = true;
});

