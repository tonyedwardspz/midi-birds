"use strict"

class PlayCardsGame{
    constructor() {
      
    }

    processKeyPress(state, key, velocity){
        // [on/off, key, velocity]
        // keys = [145/129, 48-72, 0-127] 
        // pads = [144/128, 0-39, 127]
        // dials = [176, 48-59, 0-127]

        if ((key >= 48 && key <= 72) && state === 145){ // Keyboard/On
            // fetch the bird selected
            // store selected bird in the game state
            

            // play thhe bird song


            // update the view with the selected bird

        } else if ((key >= 48 && key <= 72) && state === 129){ // Keyboard/Off
            // stop bird singing

        }

        if ((key >= 0 && key <= 39) && state === 144){ // pad/on
            // if the top left pad, select lower

            // if the top right pads, select higher

            // if the bottom left, show answer

            // if the bottom right, next round
                // add bird to the top view row
                // update the game state

        } else if ((key >= 0 && key <= 39) && state === 128){ // pad/Off

        }
        
    }

    higher(){

    }

    lower(){

    }

    showAnswer(){

    }

    stopSinging(){

    }

    addBirdToTopBar(){

    }

    addBirdToLeftPannel(){

    }

    addBirdToRightPanel(){
        
    }
  }
