"use strict"

const padLights =  [[32, 1], [0, 5],
                    [39, 1], [7, 5],
                    [36,1], [3, 3]] 

class PlayCardsGame extends Game {
    constructor() {
        super();
        this.currentTeam = 0;
        this.currentBird = {};

        this.round = [0,0];

        Game.setStatus('game', true);
    }

    processKeyPress(state, key, velocity){
        console.log('Keypress received in game controller', key, state, velocity);
        // [on/off, key, velocity]
        // keys = [145/129, 48-72, 0-127] 
        // pads = [144/128, 0-39, 127]
        // dials = [176, 48-59, 0-127]

        if ((key >= 48 && key <= 72) && state === 145){ // Keyboard/On
            this.currentBird = Bird.findByID(key);
            
            // Play the song
            app.songs[key] = new Audio(this.currentBird.sing());
            app.songs[key].play();

            // update the view with the selected bird
            this.updateCard(this.currentBird);

        } else if ((key >= 48 && key <= 72) && state === 129){ // Keyboard/Off
            // stop bird singing
            // Can't stop the rook, but you can pause it to allow the browser to garbage collect
            console.log('stopping singing');
            app.songs[key].pause();
        }

        if ((key >= 0 && key <= 39) && state === 144){ // pad/on

            if (this.currentTeam === 0) {
                this.currentTeam = this.initialPlayerSelect(key);
                this.setupLights();
                this.round[this.currentTeam - 1]++;
                console.log('GAME round: ', this.round)
                return;
            }
            
            if(key === 32){
                this.higher(1);
            } else if (key === 0) {
                this.lower(1);
            } else if (key === 39) {
                this.higher(2);
            } else if (key === 7){
                this.lower(2);
            }
        }
    }

    higher(){
        this.round[this.currentTeam -1]++;
        console.log('GAME: Higher');
    }

    lower(){
        this.round[this.currentTeam -1]++;
        console.log('GAME: Lower');
    }

    showAnswer(){
        console.log('GAME: Show Answer');
    }

    nextRound(){
        console.log('GAME: Next Round');
    }

    updateCard(bird){
        let html = `<h2>${bird.commonName}</h2>
                    <span>${bird.sightings}</span>
                    <img src="${bird.image}">`
        document.getElementById('team-' + this.currentTeam + '-card-' + this.round[this.currentTeam - 1]).innerHTML = html;

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

    updateTeam(team){
        console.log('GAME: Team ' + team + ' selected');
        this.currentTeam = team;
        document.getElementById('current-team').innerHTML = team;
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
