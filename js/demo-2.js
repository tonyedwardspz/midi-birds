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
});
