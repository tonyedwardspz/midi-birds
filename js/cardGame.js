"use strict"

const padLights =  [[32, 1], [0, 5],
                    [39, 1], [7, 5],
                    [36,1]] 

class PlayCardsGame extends Game {
    constructor() {
        super();
        this.currentTeam = 0;
        this.currentBird = {};
        this.allBirdIDs = [];
        this.hasSelected = false;
        this.scores = [0,0];

        this.teamOneBirds = [];
        this.teamTwoBirds = [];

        this.higherLower = null;
        
        this.round = [0,0];

        Game.setStatus('game', true);
    }

    processKeyPress(state, key, velocity){
        console.log('GAME: Keypress received: ', key, state, velocity);

        if (key === 93 && state === 144){
            this.updateTeam(1);
            this.scores = [45,65]
            app.audience.updateTeamScores(this.scores[0], this.scores[1]);
            super.showEndScreen();
        }

        if ((key >= 48 && key <= 72) && state === 145 && !this.hasSelected){ // Keyboard/On
            this.hasSelected = true;
            this.currentBird = Bird.findByID(key);
            
            if (this.allBirdIDs.includes(key)){
                alert('Select Again');
                this.hasSelected = false;
            } else {
                this.saveBird(this.currentBird);
                this.addCard(this.currentBird);

                app.songs[key] = new Audio(this.currentBird.sing());
                app.songs[key].play();
            }
        } else if ((key >= 48 && key <= 72) && state === 129 && !this.hasSelected){ // Keyboard/Off
            console.log('GAME: stopping singing');
            app.songs[key].pause();
        }

        if ((key >= 0 && key <= 39) && state === 144){ // pad/on

            if (this.currentTeam === 0) {
                this.currentTeam = this.initialPlayerSelect(key);
                this.setupLights();
                this.round = [1,1];

                this.starterBird();
                this.updateTeam(this.currentTeam);
                console.log('GAME round: ', this.round)
                return;
            }
            
            if(key === 32){
                this.higher();
            } else if (key === 0) {
                this.lower();
            } else if (key === 39) {
                this.higher();
            } else if (key === 7){
                this.lower();
            } else if (key === 36){
                this.showAnswer();
            }
        }
    }

    saveBird(bird){
        if (this.currentTeam === 1){
            this.teamOneBirds.push(bird.id);
        } else {
            this.teamTwoBirds.push(bird.id);
        }
        this.allBirdIDs.push(bird.id);
    }

    higher(){
        console.log('GAME: Higher');
        this.higherLower = true;
    }

    lower(){
        console.log('GAME: Lower');
        this.higherLower = false;
    }

    // selection = true / false = higher / lower
    calculateAnswer(selection){
        console.log('GAME: Calculating answer');
        let birds = [];
        if (this.currentTeam === 1){
            birds = this.teamOneBirds;
        } else {
            birds = this.teamTwoBirds;
        }
        console.log('GAME: This teams birds: ', birds);
        let lastBird = Bird.findByID(birds[birds.length - 2]);

        console.log('GAME: Comparing ' + this.currentBird.commonName + ' with ' + lastBird.commonName, [this.currentBird.sightings, lastBird.sightings]);
        let answer = this.currentBird.sightings > lastBird.sightings;
        
        if (answer === this.higherLower){ // Correct
            this.updateScore(this.currentTeam, 10);
        } else if(this.currentBird.sightings === lastBird.sightings){
            alert('Nothing for a pair. Not in this game.');
        } else {
            alert('Wrong');
        }

        if (birds.length === 5){
            console.log('GAME: Winner winner. Chicken Dinner');
            app.audience.updateTeamScores(this.scores[0], this.scores[1]);

            let el = document.getElementById('message');
            el.innerHTML = `Team ${this.currentTeam} won with a score of ${this.scores[this.currentTeam -1]}`;
            super.showEndScreen();
        }

        if (answer !== this.higherLower){
            this.changeTeam(this.currentTeam);
        }
    }

    updateScore(team, score){
        this.scores[team - 1] += score;

        console.table('GAME: Scores: ', this.scores);
    }

    showAnswer(){
        console.log('GAME: Show Answer');
        this.hasSelected = false;

        this.addSightings(this.currentBird);
        this.round[this.currentTeam -1]++;

        this.calculateAnswer();
    }

    addCard(bird){
        let html = `<h2>${bird.commonName}</h2>
                    <span id="bird-${bird.id}-sightings">&nbsp;</span>
                    <img src="${bird.image}">`
        document.getElementById('team-' + this.currentTeam + '-card-' + this.round[this.currentTeam - 1]).innerHTML = html;

        if (this.round[this.currentTeam -1] === 1){
            this.addSightings(bird);
            this.round[this.currentTeam -1]++;
        }
    }

    addSightings(bird){
        document.getElementById('bird-' + bird.id + '-sightings').innerHTML = bird.sightings;
    }

    changeTeam(team){
        console.log('GAME: Change team');
        this.hasSelected = false;
        
        if (this.round[team - 1] > 0) {
            setTimeout(() => {
                let el = document.getElementById('team-' + team + '-card-' + (this.round[team - 1] - 1));
                el.innerHTML = "";
                this.round[team - 1]--;
            }, "3000");

            if (team === 1){
                this.teamOneBirds.pop();
            } else {
                this.teamTwoBirds.pop();
            }
        }

        if (team === 1){
            this.updateTeam(2);
        } else {
            this.updateTeam(1);
        }

        console.log('GAME: Round, current & last team', [this.round, this.currentTeam, team]);
        if (this.round[this.currentTeam -1] === 1){
            console.log('GAME: Calling starter bird');
            this.starterBird();
        }
        
        return this.currentTeam;
    }

    starterBird(){
        console.log('GAME: Starter Bird');
        let starterBird = Bird.getRandomBird();
        this.addCard(starterBird);
        this.saveBird(starterBird);
    }

    initialPlayerSelect(key){
        let count = 0;
        let countCheck = 0;
        let team = 1;
        for(let i = 0; i < 40; i++){
            if (key === countCheck){
                this.updateTeam(team);
                return team;
            }
            count++;
            countCheck++;
            if (count === 4){
                count = 0
                if (team === 1){
                    team = 2;
                } else {
                    team = 1;
                }
            }
        }
    }

    setupLights(init){
        if (init) {
            let lights = [];
            let count = 0;
            let color = 1;
            for(let i = 0; i < 40; i++){
                if (count === 4){
                    count = 1
                    color = color === 1 ? 5 : 1;
                } else {
                    count++;
                }
                lights.push([i, color]);
            }
            app.midi.switchOnLights(lights);
        } else {
            let lights = padLights;

            let activePads = [];
            padLights.forEach(pad => {
                activePads.push(pad[0]);
            });

            for (let i = 0; i < 40; i++){
                if (!activePads.includes(i)){
                    lights.push([i, 0]);
                }
            }
            app.midi.switchOnLights(lights);
        }
    }
}
