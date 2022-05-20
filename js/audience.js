"use strict"

class Audience {
    constructor(level){
        this.participation = level;
    }

    get participation(){
        return this._participation;
    }

    set participation(level){
        console.log('AUDIENCE: Participation level is currently ' + level);
        this._participation = level
    }
}
