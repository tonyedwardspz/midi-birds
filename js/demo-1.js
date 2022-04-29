let app = {
    songs: {}
};

Bird.catchBirds().then(() => {
    console.log('Flock ready');

    Bird.find('Robin');

    app.game = new FortunesGame();  

    app.midi = new MIDI();    
});
