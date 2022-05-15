"use strict"

class FortunesGame{
    constructor() {
        this.setupGameBoard();
        this.scores = [0, 0];
        this.guessNumber = 0;
        this.guesses = [];
        this.currentTeam = 100;

        this.teamOneBirdButtons = [32, 24, 16, 8, 0];
        this.teamOneWrongButton = 34;
        this.teamTwoBirdButtons = [39, 31, 23, 15, 7]
        this.teamTwoWrongButton = 37;
    }

    processKeyPress(state, key, velocity){
        if ((key >= 48 && key <= 72) && state === 145){ // Keyboard/On
            console.log('GAME: Key press received in game controller');
            
            // Team 1
            if (key === 48 && this.guessNumber === 0) {
                console.log('Team 1 won the buzzer press');

                this.currentTeam = 1;
            // Team 2
            } else if (key === 72 && this.guessNumber === 0) {
                console.log('Team 2 won the buzzer press');

                this.currentTeam = 2;
            }
        }

        if ((key >= 0 && key <= 39) && state === 144){ // pad/on
            console.log('GAME: Pad press received in game controller');
            
            // Team 1 buttons
            // outer left column for team 1 lights, answers 1 through 5 top to bottom
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

    checkAnswer(guess, team) {
        this.guessNumber++;

        if (this.guesses.includes(guess) === false){
            let answer = app.answers[guess];
            this.guesses.push(guess);

            console.log('Answer: ', answer);
            this.updateTeamScore(team, answer.sightings);
            this.showAnswer(guess);
        } 
    }

    showAnswer(answer){
        let answerLi = document.getElementById('answer-' + answer);
        answerLi.innerHTML = app.answers[answer].commonName + ' - ' + app.answers[answer].sightings;
    }

    updateTeamScore(team, score){
        this.scores[team - 1] += score;
        console.table('GAME: Scores: ', this.scores);
    }

    wrongGuess(team){
        let guessLi = document.querySelectorAll('li.team-' + team + '-guess-empty');
        guessLi[0].classList.remove('team-' + team + '-guess-empty');
        console.log(guessLi);
        guessLi[0].innerHTML = 'X'
    } 
}
