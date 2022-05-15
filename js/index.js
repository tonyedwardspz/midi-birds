let app = {
    songs: {},
    isIndex: true
};

Bird.catchBirds().then(() => {
    console.log('Flock ready');

    Bird.find('Robin');

    app.midi = new MIDI();
});
