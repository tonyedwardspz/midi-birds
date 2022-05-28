"use strict"

class DataStore {
    constructor(){}

    static saveLocally(item, data){
        try{
            localStorage.setItem(item, data);
            return true;
        } catch (e){
            console.log('ERROR: Data store failed to save ' + item + ' locally.', e);
            return false;
        }
    }

    static loadLocally(item){
        try {
            const data = localStorage.getItem(item);
            return data;
        } catch(e) {
            console.log('ERROR: Data store failed to retrieve ' + item + ' locally.', e);
            return false;
        }
    }
}
