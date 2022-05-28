"use strict"

class Game {
    constructor(){
        document.getElementById('reveal').addEventListener('click', (e) => {
            console.log('GAME: Reveal Game board');
            let el = document.getElementById('splash-screen');
            el.classList.add('hidden');
        });

        if(app.gameID === 1){
            document.getElementById('new-teams').addEventListener('click', (e) => {
                console.log('GAME: Setup teams clicked');
                app.audience.setupTeamNames();
            });
        }
    }

    updateTeam(team){
        console.log('GAME: Team ' + team + ' selected');

        this.currentTeam = team;
        let otherTeam = team === 1? 2 : 1;
        document.getElementById('team-' + team).classList.add('active');
        document.getElementById('team-' + otherTeam).classList.remove('active');
    }

    static setStatus(type, state) {
        console.log(type.toUpperCase() + ': Status ', state);
        
        app.status[type] = state;
        document.getElementById('status-' + type).innerHTML = state ? ' :) ' : ' :( ';
    }
}
