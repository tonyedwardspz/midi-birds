"use strict"

class Bird {
    constructor(commonName, latinName, image, song, firstSighting) {
      this.commonName = commonName;
      this.latinName = latinName;
      this.image = image;
      this.song = song;
      this.firstSighting = new Date(firstSighting);

      console.info(`A ${this.commonName} has been caught"`);
    }

    sing() {
        return this.song;
    }

    static find(name){
        return this.flock.find(bird => bird.commonName.toLowerCase() == name.toLowerCase());
    }

    static catchBirds = async () => {
        const response = await fetch("../js/birds.json");
        const json = await response.json();
        const flock = [];
    
        json.forEach(bird => {
            flock.push(new Bird(bird.commonName, bird.latinName, bird.image, bird.song, bird.firstSighting));
        });
    
        this.flock = flock;
        console.info(`---- We caught ${flock.length} birds ----`);
    }
  }
