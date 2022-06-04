"use strict"

class Audience {
    constructor(level, numberOfPeople){
        this.participation = level;
        this.size = numberOfPeople;

        if (level >= 7) {
            this.teams = true
            this.team1Name = "";
            this.team1Score = 0;
            this.team2Name = "";
            this.team2Score = 0;
            this.loadTeams();
        }
        this.statusIndicatorUpdate(level);
    }

    get participation(){
        return this._participation;
    }

    set participation(level){
        if(app.gameID != 2){
            console.log('AUDIENCE: Participation level has been set to ' + level + ' out of 10.');
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
        this.team1Name = prompt("Team 1's chosen name?", 'Team 1');
        this.team2Name = prompt("Team 2's chosen name?", 'Team 2');

        DataStore.saveLocally('team1Name', this.team1Name === 'undefined' ? 'Team 1' : this.team1Name);
        DataStore.saveLocally('team2Name', this.team2Name === 'undefined' ? 'Team 2' : this.team2Name);
        this.resetTeamScores();
        this.updateTeamNames();

        console.log('AUDIENCE: Saved new team names');
    }

    loadTeams(){
        this.team1Name = DataStore.loadLocally('team1Name');
        this.team2Name = DataStore.loadLocally('team2Name');
        console.table('AUDIENCE: Loaded existing team names', [this.team1Name, this.team2Name]);
        this.loadScores();
        this.updateTeamNames();
    }

    updateTeamNames(){
        let el = document.getElementById('team-1-name')
        el.innerHTML = this.team1Name;
        el = document.getElementById('team-2-name')
        el.innerHTML = this.team2Name;
    }

    getTeamName(teamNumber) {
        return teamNumber === 1 ? this.team1Name : this.team2Name;
    }

    updateTeamScores(team1Score, team2Score){
        this.team1Score = parseInt(this.team1Score) + team1Score;
        this.team2Score = parseInt(this.team2Score) + team2Score;

        DataStore.saveLocally('team1Score', this.team1Score);
        DataStore.saveLocally('team2Score', this.team2Score);        
    }

    resetTeamScores(){
        DataStore.saveLocally('team1Score', '0');
        DataStore.saveLocally('team2Score', '0');
        this.team1Score = 0;
        this.team2Score = 0;    
    }

    getTotalTeamScore(teamNumber) {
        return teamNumber === 1 ? this.team1Score : this.team2Score;
    }

    loadScores(){
        console.log('AUDIENCE: Loading Scores')
        this.team1Score = DataStore.loadLocally('team1Score');
        this.team2Score = DataStore.loadLocally('team2Score');
    }

    statusIndicatorUpdate(participationLevel){
        let el = document.getElementById('participation-level');
        el.innerHTML = participationLevel;
    }

    saveTeamsAndScores(){
        let currentHighScores = [];

        let event = prompt('What event is this?');

        let newData = [
            {
                teamName: this.team1Name,
                event: event,
                score: app.game.scores[0]
            },
            {
                teamName: this.team2Name,
                event: event,
                score: app.game.scores[1]
            }
        ];

        if (DataStore.loadLocally('highScores')){
            let savedScores = DataStore.loadLocally('highScores');
            currentHighScores = JSON.parse(savedScores);
        }
        
        newData.forEach(entry => {
            currentHighScores.push(entry);
        });
        DataStore.saveLocally('highScores', JSON.stringify(currentHighScores));
    }

    participationMultiplier(factor){
        let n = (this.participation * this.size) * factor;
 
        for(let i = 0; i < n; i++){
            this.participation++;
        }
        this.statusIndicatorUpdate(this.participation);
        console.log('AUDIENCE: Participation set to ' + this.participation + ' out of 10.');
    }
}
