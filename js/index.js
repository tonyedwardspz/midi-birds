let app = {
    songs: {},
    isGame: false
};

Bird.catchBirds().then(() => {

    app.midi = new MIDI();
    app.audience = new Audience(3, 25, true);
});
