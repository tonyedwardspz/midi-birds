"use strict"

class Game {
    constructor(){
        this.setupStatus();
    }

    setupStatus(){
        console.log('setting up status');
    }

    static setStatus(type, state) {
        console.log(type + ' status: ', state);
        app.status[type] = state;

        document.getElementById('status-' + type).innerHTML = state ? ' :) ' : ' :( ';
    }
}
