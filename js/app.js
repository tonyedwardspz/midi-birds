const getBirds = async () => {
    const response = await fetch("../js/birds.json");
    const json = await response.json();
    console.log(json);
    return json;
}

let flock = [];

getBirds().then(birds => {
    birds.forEach(bird => {
        console.log(bird);
        console.log(bird.commonName)
        flock[bird.commonName] = new Bird(bird.commonName, bird.latinName, bird.image, bird.song, bird.firstSighting);
    });

    console.log('-----');
    console.log(flock);
    console.log(flock['Bird to the max']);
});






