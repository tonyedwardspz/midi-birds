"use strict"

class PlayCardsGame{
    constructor() {
      
    }

    processKeyPress(state, key, velocity){
        console.log('Keypress received in game controller', key, state, velocity);
        // [on/off, key, velocity]
        // keys = [145/129, 48-72, 0-127] 
        // pads = [144/128, 0-39, 127]
        // dials = [176, 48-59, 0-127]

        if ((key >= 48 && key <= 72) && state === 145){ // Keyboard/On
            let currentBird = Bird.findByID(key);
            // store selected bird in the game state
            
            // Play the song
            app.songs[key] = new Audio(currentBird.sing());
            app.songs[key].play();

            // update the view with the selected bird

        } else if ((key >= 48 && key <= 72) && state === 129){ // Keyboard/Off
            // stop bird singing
            // Can't stop the rook, but you can pause it to allow the browser to garbage collect
            console.log('stopping singing');
            app.songs[key].pause();
        }

        if ((key >= 0 && key <= 39) && state === 144){ // pad/on
            
            if(key === 32){
                this.higher();
            } else if (key === 0) {
                this.lower();
            } else if (key === 39) {
                this.showAnswer();
            } else if (key === 7){
                this.nextRound();
            } else if (key === 35 || key === 36){
                this.beginGame();
            }
            // add bird to the top view row
            // update the game state

        } else if ((key >= 0 && key <= 39) && state === 128){ // pad/Off

        }
        
    }

    higher(){
        console.log('Higher');
    }

    lower(){
        console.log('Lower');
    }

    showAnswer(){
        console.log('Show Answer');
    }

    nextRound(){
        console.log('Next Round');
    }

    beginGame(){
        console.log('Begin Game');
        app.midi.keypadLightsOff();
        this.setupLights();
    }

    stopSinging(){

    }

    addBirdToTopBar(){

    }

    addBirdToLeftPannel(){

    }

    addBirdToRightPanel(){
        
    }

    setupLights(){
        app.midi.switchOnLights([
            [32, 1], // Higher
            [0, 5], // Lower
            [39, 1], // Show Answer
            [7, 3] // Next Round
        ]);
    }
}
