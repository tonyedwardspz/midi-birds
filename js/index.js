let app = {
    songs: {}
};

Bird.catchBirds().then(() => {
    console.log('Flock ready');

    Bird.find('Robin');

    app.isIndex = true;

    app.midi = new MIDI();
    
    app.birdImageContainer = document.getElementById('#bird-image-container');
});
