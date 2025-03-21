let recorder;
let player;
let isRecording = false;

function setup() {
    // Start audio context
    Tone.start();
    
    // Create recorder
    recorder = new Tone.Recorder();
    
    // Connect microphone to recorder
    const mic = new Tone.UserMedia();
    mic.open().then(() => {
        mic.connect(recorder);
        console.log('Microphone ready');
    }).catch(e => {
        console.log('Error opening microphone:', e);
    });
}

function draw() {
    // Optional: Add visual feedback for recording state
}

function keyPressed() {       
    if (keyCode === 32) { // Space key
        if (!isRecording) {
            // Start recording
            recorder.start();
            isRecording = true;
            console.log('Recording started');
        } else {
            // Stop recording and play back
            isRecording = false;
            console.log('Recording stopped');
            
            recorder.stop().then(recording => {
                // Create a new blob URL from the recording
                const url = URL.createObjectURL(recording);
                
                // If there's an existing player, stop and dispose of it
                if (player) {
                    player.stop();
                    player.dispose();
                }
                
                // Create a new player with the recording
                player = new Tone.Player({
                    url: url,
                    loop: true,
                    autostart: true
                }).toDestination();
                
            });
        }
    }
}

function keyReleased() {       
    // Optional: Add key release handling
}