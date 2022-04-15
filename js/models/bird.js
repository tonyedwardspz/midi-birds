"use strict"

class Bird {
    constructor(commonName, latinName, image, song, firstSighting) {
      this.commonName = commonName;
      this.latinName = latinName;
      this.image = image;
      this.song = song;
      this.firstSighting = new Date(firstSighting);

      console.log(this.commonName + " has been created");
    }

    // static catchBirds(){
    //     return fetch("../js/birds.json")
    //         .then(response => response.json())
    //         .then(json => {
    //             console.log(json);
    //             resolve(json);
    //         });
    // }
  }
