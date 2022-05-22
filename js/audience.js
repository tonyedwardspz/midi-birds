"use strict"

class Audience {
    constructor(level, numberOfPeople, sfx){
        this.participation = level;
        this.size = numberOfPeople;
        this.sfx = sfx;

        if (level > 7) {
            this.teams = true
        }
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

    participationMultiplier(factor){
        let n = (this.participation * this.size) * factor;
 
        for(let i = 0; i < n; i++){
            this.participation++;
        }
        console.log('AUDIENCE: Participation set to ' + this.participation + ' out of 10.');
    }
}
