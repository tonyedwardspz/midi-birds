"use strict"

class Bird {
    constructor(id, commonName, image, imageCredit,
        song, songCredit, sightings) {
        this.id = id;
        this.commonName = commonName;
        this.image = image;
        this.imageCredit = imageCredit;
        this.song = song;
        this.songCredit = songCredit;
        this.sightings = sightings;

        if (app.isGame === false){
            console.info(`BIRD ${this.id}: A ${this.commonName} has been caught`);
        }
    }

    sing() {
        return this.song;
    }

    playSong(){
        app.songs[this.id] = new Audio(this.song);
        app.songs[this.id].play();
    }

    getImage(){
        return this.image;
    }

    static getRandomBird(){
        return this.flock[Math.floor(Math.random() * this.flock.length)];
    }

    static sortBirdsBySighting(){
        return this.flock.sort((a, b) => {
            return b.sightings - a.sightings;
        });
    }

    static find(name){
        return this.flock.find(bird => bird.commonName.toLowerCase() == name.toLowerCase());
    }

    static findByID(id){
        return this.flock.find(bird => bird.id == id);
    }

    static catchBirds = async () => {
        const response = await fetch("../js/birds.json");
        const json = await response.json();
        const flock = [];
    
        json.forEach(bird => {
            flock.push(new Bird(bird.id, bird.commonName, bird.image, bird.imageCredit,
                bird.song, bird.songCredit, bird.sightings ));
        });
    
        this.flock = flock;

        if (app.isGame){
            Game.setStatus('flock', true);
        }
        console.info(`FLOCK: We caught ${flock.length} birds`);
    }
  }
