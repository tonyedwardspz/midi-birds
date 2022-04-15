"use strict"

class Bird {
    constructor(commonName, latinName, image, song, firstSighting) {
      this.commonName = commonName;
      this.latinName = latinName;
      this.image = image;
      this.song = song;
      this.firstSighting = new Date(firstSighting);

      console.log(this.commonName + " has been caught.");
    }

    static catchBirds = async () => {
        const response = await fetch("../js/birds.json");
        const json = await response.json();
        const flock = [];
    
        json.forEach(bird => {
            flock[bird.commonName] = new Bird(bird.commonName, bird.latinName, bird.image, bird.song, bird.firstSighting);
        });
    
        return flock;
    }
  }
