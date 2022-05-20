let app = {
    midi: {},
    songs: {},
    status: {},
    answers:{},

    isGame: true
};

Bird.catchBirds().then(() => {
    
    app.game = new FortunesGame();
    app.midi = new MIDI();
    app.audience = new Audience(7, 25, true);
});
