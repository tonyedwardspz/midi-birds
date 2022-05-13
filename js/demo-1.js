let app = {
    songs: {},
    status: {},

    answers:{}
};

Bird.catchBirds().then(() => {
    app.game = new FortunesGame();
    app.midi = new MIDI();
});
