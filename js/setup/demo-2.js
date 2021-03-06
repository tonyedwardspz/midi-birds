let app = {
    midi: {},
    songs: {},
    status: {},

    isGame: true,
    gameID: 2
};

Bird.catchBirds().then(() => {
    app.game = new PlayCardsGame();
    app.midi = new MIDI();
    app.audience = new Audience(7);
    app.audience.participationMultiplier(4);
});
