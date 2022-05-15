"use strict"

class Bird {
    constructor(id, commonName, latinName, image, imageCredit,
        song, songCredit, sightings) {
        this.id = id;
        this.commonName = commonName;
        this.latinName = latinName;
        this.image = image;
        this.imageCredit = imageCredit;
        this.song = song;
        this.songCredit = songCredit;
        this.sightings = sightings;

        if (app.isIndex == true){
            console.info(`${this.id}: A ${this.commonName} has been caught`);
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
            flock.push(new Bird(bird.id, bird.commonName, bird.latinName, bird.image, bird.imageCredit,
                bird.song, bird.songCredit, bird.sightings ));
        });
    
        this.flock = flock;

        if (app.isGame){
            Game.setStatus('flock', true);
        }
        console.info(`---- We caught ${flock.length} birds ----`);
    }
  }
