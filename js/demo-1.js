let app = {
    midi: {},
    songs: {},
    status: {},

    isGame: true,

    answers:{}
};

Bird.catchBirds().then(() => {
    
    app.game = new FortunesGame();
    app.midi = new MIDI();
    app.audience = new Audience(7);
});
