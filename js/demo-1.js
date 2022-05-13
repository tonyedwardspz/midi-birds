let app = {
    songs: {},
    status: {}
};

Bird.catchBirds().then(() => {
    app.game = new FortunesGame();
    app.midi = new MIDI();
});
