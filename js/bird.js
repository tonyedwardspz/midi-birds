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

        console.info(`${this.id}: A ${this.commonName} has been caught`);
    }

    sing() {
        return this.song;
    }

    getImage(){
        return this.image;
    }

    sortBirdsBySighting(){
        this.flock.sort((a, b) => {
            return a.sightings - b.sightings;
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
        console.info(`---- We caught ${flock.length} birds ----`);
    }
  }
