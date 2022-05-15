"use strict"

let padTeam1 = [[32, 1], [24, 1], [16, 1], [8, 1], [0, 1]];
let padTeam2 = [[39, 1], [31, 1], [23, 1], [15, 1], [7, 1]];
let padIncorrect = [[34, 3],[37, 3]];

let padColorMap = [];

class FortunesGame{
    constructor() {
        this.setupGameBoard();
        this.scores = [0, 0];
        this.guessNumber = 0;
        this.guesses = [];
        this.currentTeam = 100;

        this.teamOneBirdButtons = [32, 24, 16, 8, 0];
        this.teamOneWrongButton = 34;
        this.teamOneIncorrectGuesses = 0;
        this.teamTwoBirdButtons = [39, 31, 23, 15, 7]
        this.teamTwoWrongButton = 37;
        this.teamTwoIncorrectGuesses = 0;

        this.teamSelected = false;

        this.lastPad = 0;
        padColorMap = padTeam1.concat(padTeam2).concat(padIncorrect);
    }

    processKeyPress(state, key, velocity){
        if ((key >= 48 && key <= 72) && state === 145 && (this.teamSelected === false)){ // Keyboard/On
            console.log('GAME: Key press received in game controller');
            
            if (this.guessNumber === 0){
                app.midi.switchOnLights(padColorMap);
                this.teamSelected = true;
            
                if (key === 48) { // Team 1
                    new Audio('./audio/effects/team-buzzer.mp3').play();
                    console.log('Team 1 won the buzzer press');
                    this.currentTeam = 1;
                    document.getElementById('team-1').classList.add('blink');
                } else if (key === 72) { // Team 2
                    new Audio('./audio/effects/team-buzzer.mp3').play();
                    console.log('Team 2 won the buzzer press');
                    this.currentTeam = 2;
                    document.getElementById('team-2').classList.add('blink');
                } 
            }
        }

        if ((key >= 0 && key <= 39) && state === 144){ // pad/on
            // TODO: Make this more fancy
            document.getElementById('team-1').classList.remove('blink');
            document.getElementById('team-2').classList.remove('blink');

            console.log('GAME: Pad press received in game controller');
            this.lastPad = key;
            
            if (this.teamOneBirdButtons.includes(key)){
                this.currentTeam = 1;

                this.checkAnswer(this.teamOneBirdButtons.indexOf(key), 1)
                this.showAnswer(this.teamOneBirdButtons.indexOf(key));  
            } else if (this.teamTwoBirdButtons.includes(key)){
                this.currentTeam = 2;

                this.checkAnswer(this.teamTwoBirdButtons.indexOf(key), 2)
                this.showAnswer(this.teamTwoBirdButtons.indexOf(key));
            }

            if (key === this.teamOneWrongButton) {
                this.wrongGuess(1);
            } else if (key === this.teamTwoWrongButton) {
                this.wrongGuess(2)
            }
        }
    }

    setupGameBoard (){
        console.log('GAME: Setting up Game Board')

        let sortedBirds = Bird.sortBirdsBySighting();

        for (let i = 0; i < 6; i++) {
            app.answers[i] = sortedBirds[i];
        }
        
        console.log(app.answers);
        Game.setStatus('game', true);
    }

    checkAnswer(guess, team) {
        if (this.guesses.includes(guess) === false){
            new Audio('./audio/effects/correct.mp3').play();
            this.guessNumber++;
            let answer = app.answers[guess];
            this.guesses.push(guess);

            console.log('Answer: ', answer.commonName);
            this.updateTeamScore(team, answer.sightings);
            this.showAnswer(guess);

            this.removeLight(this.lastPad);

            if (this.guessNumber === 5){
                this.gameOver('complete');
            }
        } 
    }

    showAnswer(answer){
        let answerLi = document.getElementById('answer-' + answer);
        answerLi.innerHTML = app.answers[answer].commonName + ' - ' + app.answers[answer].sightings;
    }

    removeLight(pad){
        console.log('PAD: ', pad);
        padColorMap.forEach(light => {
            if (light[0] === pad){
                this.buildColorMap(pad);
            }
        });
        app.midi.switchOnLights(padColorMap);
    }

    buildColorMap(pad){
        if (pad === 32 || pad === 39){
            padTeam1[0][1] = 0;
            padTeam2[0][1] = 0;
        } else if (pad === 24 || pad === 31){
            padTeam1[1][1] = 0;
            padTeam2[1][1] = 0;
        } else if (pad === 16 || pad === 23){
            padTeam1[2][1] = 0;
            padTeam2[2][1] = 0;
        } else if (pad === 8 || pad === 15){
            padTeam1[3][1] = 0;
            padTeam2[3][1] = 0;
        } else if (pad === 0 || pad === 7){
            padTeam1[4][1] = 0;
            padTeam2[4][1] = 0;
        }

        padColorMap = padTeam1.concat(padTeam2).concat(padIncorrect);
    }

    updateTeamScore(team, score){
        this.scores[team - 1] += score;
        console.table('GAME: Scores: ', this.scores);
        let container = document.getElementById('team-' + team + '-score');
        container.innerHTML = this.scores[team - 1];
    }

    wrongGuess(team){
        new Audio('./audio/effects/incorrect.mp3').play();

        this.currentTeam = team;
        team === 1 ? this.teamOneIncorrectGuesses++ : this.teamTwoIncorrectGuesses++;

        let guessLi = document.querySelectorAll('li.team-' + team + '-guess-empty');
        guessLi[0].classList.remove('team-' + team + '-guess-empty');
        guessLi[0].innerHTML = 'X'

        if (this.teamOneIncorrectGuesses === 3 || this.teamTwoIncorrectGuesses === 3) {
            this.gameOver('maxGuesses');
        }
    }

    gameOver(type){

        if (type === 'complete'){
            if (this.scores[0] > this.scores[1]){
                alert('Team 1 won with a score of ' + this.scores[0]);
            } else {
                alert('Team 2 won with a score of ' + this.scores[1]);
            }
        } else if ('maxGuesses'){
            alert('GAME OVER n/ Team ' + this.currentTeam + ' looses :(');
        }
        
    }
}
