"use strict"

class Audience {
    constructor(level, numberOfPeople, sfx){
        this.participation = level;
        this.size = numberOfPeople;
        this.sfx = sfx;

        if (level > 7) {
            this.teams = true
            this.team1Name = "";
            this.team1Score = 0;
            this.team2Name = "";
            this.team2Score = 0;
        }

        this.statusIndicatorUpdate(level);
    }

    get participation(){
        return this._participation;
    }

    set participation(level){
        if (this.sfx){
            console.log('AUDIENCE: Participation level is currently ' + level + ' out of 10.');
        }
        this._participation = level
    }

    get size(){
        return this._size;
    }

    set size(numberOfPeople){
        console.log('AUDIENCE: Size is estimated at ' + numberOfPeople);
        this._size = numberOfPeople
    }

    setupTeamNames(){
        if (app.gameID === 1){
            if(prompt('New teams?') === ''){
                this.team1Name = prompt("Team 1's chosen name?");
                this.team2Name = prompt("Team 2's chosen name?");

                DataStore.saveLocally('team1Name', this.team1Name);
                DataStore.saveLocally('team2Name', this.team2Name);

                console.log('AUDIENCE: Saved team names');
            }
        } else {
            this.team1Name = DataStore.loadLocally('team1Name');
            this.team2Name = DataStore.loadLocally('team2Name');
            console.table('AUDIENCE: Loaded team names', [this.team1Name, this.team2Name]);
        }

        let el = document.getElementById('team-1-name')
        el.innerHTML = this.team1Name;
        el = document.getElementById('team-2-name')
        el.innerHTML = this.team2Name;
    }

    getTeamName(teamNumber) {
        return teamNumber === 1 ? this.team1Name : this.team2Name;
    }
    }

    statusIndicatorUpdate(participationLevel){
        let el = document.getElementById('participation-level');
        el.innerHTML = participationLevel;
    }

    participationMultiplier(factor){
        let n = (this.participation * this.size) * factor;
 
        for(let i = 0; i < n; i++){
            this.participation++;
        }
        console.log('AUDIENCE: Participation set to ' + this.participation + ' out of 10.');
    }
}
