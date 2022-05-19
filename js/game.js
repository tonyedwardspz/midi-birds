"use strict"

class Game {
    constructor(){
        this.setupStatus();
    }

    setupStatus(){
        console.log('setting up status');
    }

    updateTeam(team){
        console.log('GAME: Team ' + team + ' selected');

        this.currentTeam = team;
        let otherTeam = team === 1? 2 : 1;
        document.getElementById('team-' + team).classList.add('active');
        document.getElementById('team-' + otherTeam).classList.remove('active');
    }

    static setStatus(type, state) {
        console.log(type + ' status: ', state);
        app.status[type] = state;

        document.getElementById('status-' + type).innerHTML = state ? ' :) ' : ' :( ';
    }
}
