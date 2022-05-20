let app = {
    midi: {},
    songs: {},
    status: {},

    isGame: true
};

Bird.catchBirds().then(() => {
    console.log('Flock ready');
    
    app.game = new PlayCardsGame();
    app.midi = new MIDI();
    app.audience = new Audience(7, 25, false);
    app.audience.participationMultiplier(4);
});
