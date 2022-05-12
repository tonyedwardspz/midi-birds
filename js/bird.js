"use strict"

class Bird {
    constructor(id, commonName, latinName, image, song, firstSighting) {
        this.id = id;
        this.commonName = commonName;
        this.latinName = latinName;
        this.image = image;
        this.song = song;
        this.firstSighting = new Date(firstSighting);

      console.info(`${this.id}: A ${this.commonName} has been caught`);
    }

    sing() {
        return this.song;
    }

    getImage(){
        return this.image;
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
            flock.push(new Bird(bird.id, bird.commonName, bird.latinName, bird.image, bird.song, bird.firstSighting));
        });
    
        this.flock = flock;
        console.info(`---- We caught ${flock.length} birds ----`);
    }
  }
