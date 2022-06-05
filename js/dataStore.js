"use strict"

class DataStore {
    constructor(){}

    static saveLocally(item, data){
        try{
            localStorage.setItem(item, data);
            console.log('DATA STORE: Saved ' + item + ' to local storage.');
            return true;
        } catch (e){
            console.error('ERROR: Data store failed to save ' + item + ' locally.', e);
            return false;
        }
    }

    static loadLocally(item){
        try {
            const data = localStorage.getItem(item);
            console.log('DATA STORE: Loaded ' + item + ' from local storage.');
            return data;
        } catch(e) {
            console.error('ERROR: Data store failed to retrieve ' + item + ' locally.', e);
            return false;
        }
    }
}
