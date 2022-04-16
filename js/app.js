let app = {};

Bird.catchBirds().then(() => {
    console.log('Flock ready');

    Bird.find('Robin');

    app.midi = new MIDI();    
});
