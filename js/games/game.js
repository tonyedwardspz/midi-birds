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
        if(app.gameID > 1){
            document.getElementById('total-score').addEventListener('click', (e) => {
                console.log('GAME: Total score clicked');
                this.showTotalScores();
            });
        }
        if(app.gameID === 2){
            document.getElementById('save-score').addEventListener('click', (e) => {
                console.log('GAME: Save score clicked');
                app.audience.saveTeamsAndScores();
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

    showEndScreen(message){
        let el = document.getElementById('end-game-screen');
        el.classList.remove('hidden');

        el = document.getElementById('message');
        el.innerHTML = message;

        let data = [{
                teamName: app.audience.team1Name,
                score: this.scores[0]
            },{
                teamName: app.audience.team2Name,
                score: this.scores[1]
        }];
        data.sort((a, b) => parseInt(b.score) - parseInt(a.score));

        el = document.getElementById('end-scores');
        data.forEach((entry, i) => {
            el.innerHTML += `<tr>
                                <td>${i + 1}</td>
                                <td>${entry.teamName}</td>
                                <td>${entry.score}</td>
                            </tr>`
        });
    }

    showTotalScores(){
        let data = [{
                teamName: app.audience.team1Name,
                score: DataStore.loadLocally('team1Score')
            },{
                teamName: app.audience.team2Name,
                score: DataStore.loadLocally('team2Score')
        }];
        data.sort((a, b) => parseInt(b.score) - parseInt(a.score));

        let el = document.getElementById('end-scores');
        data.forEach((entry, i) => {
            el.innerHTML += `<tr>
                                <td>${i + 1}</td>
                                <td>${entry.teamName}</td>
                                <td>${entry.score}</td>
                            </tr>`
        });

        el = document.getElementById('score-title');
        el.innerHTML = "Total Scores"
    }

    static setStatus(type, state) {
        console.log(type.toUpperCase() + ': Status ', state);

        app.status[type] = state;
        document.getElementById('status-' + type).innerHTML = state ? ' :) ' : ' :( ';
    }
}
