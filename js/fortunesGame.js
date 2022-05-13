"use strict"

class FortunesGame{
    constructor() {
        this.setupGameBoard();
        this.teamOneScore = 0;
        this.teamTwoScore = 0;
        this.currentGuess = {};
        this.currentTeam = 100;
    }

    processKeyPress(state, key, velocity){
        // [on/off, key, velocity]
        // keys = [145/129, 48-72, 0-127] 
        // pads = [144/128, 0-39, 127]
        // dials = [176, 48-59, 0-127]

        if ((key >= 48 && key <= 72) && state === 145){ // Keyboard/On
            // fetch the bird selected
            // store selected bird in the game state
            console.log('Keypress received in game controller');

            this.currentGuess = Bird.findByID(key);
            app.songs[key] = new Audio(this.currentGuess.sing());
            app.songs[key].play();
            
            // Testing tech debt for talk
            if (state === 145 && key === 48) {
                this.showAnswer(1);
            }

        } else if ((key >= 48 && key <= 72) && state === 129){ // Keyboard/Off
            // Can't stop the rook, but you can pause it to allow the browser to garbage collect
            app.songs[key].pause();
        }

        if ((key >= 0 && key <= 39) && state === 144){ // pad/on
            
            // Team 1 buttons
            // outer left column for team 1 lights, answers 1 through 5 top to bottom
            let teamOneBirdButtons = [32, 24, 16, 8, 0];
            let teamOneWrongButton = 34;
            let teamTwoBirdButtons = [39, 31, 23, 15, 7]
            let teamTwoWrongButton = 37;

            if (teamOneBirdButtons.includes(key)){
                this.currentTeam = 1;
                this.showAnswer(teamOneBirdButtons.indexOf(key));
            } else if (teamTwoBirdButtons.includes(key)){
                this.currentTeam = 2;
                this.showAnswer(teamTwoBirdButtons.indexOf(key));
            }
        }
    }

    setupGameBoard (){
        console.log('Setting up Game Board')

        this.teamOneScoreBoard = document.getElementById('team-1-guess-board');
        this.teamTwoScoreBoard = document.getElementById('team-2-guess-board');
        this.gameBoard = document.getElementById('game-board');

        Game.setStatus('game', true);

        let sortedBirds = Bird.sortBirdsBySighting();

        for (let i = 0; i < 5; i++) {
            app.answers[i] = sortedBirds[i];
        }

        console.log(app.answers);
    }

    showAnswer(answer){
        let answerLi = document.getElementById('answer-' + answer);
        answerLi.innerHTML = app.answers[answer].commonName + ' - ' + app.answers[answer].sightings;
    }

    updateTeamScore(team, score){

    }
}
