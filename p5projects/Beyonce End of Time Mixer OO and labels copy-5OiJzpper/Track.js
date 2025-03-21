class Track{
  constructor(name, url){
    this.player = new Tone.Player(url);
    this.player.toDestination();
    
    this.label = createSpan(name);
    this.slider = createSlider(-60, 0);
    this.slider.input(this.setVolume.bind(this));
    this.br = createElement("br");
  }
  setVolume(){
    this.player.volume.rampTo(this.slider.value());
  }
}