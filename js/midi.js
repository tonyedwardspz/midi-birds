"use strict"

const midimap = [
    [ 32, 33, 34, 35, 36, 37, 38, 39 ],
    [ 24, 25, 26, 27, 28, 29, 30, 31 ],
    [ 16, 17, 18, 19, 20, 21, 22, 23 ],
    [  8,  9, 10, 11, 12, 13, 14, 15 ],
    [  0,  1,  2,  3,  4,  5,  6,  7 ]
]

const OFF = 0;
const GREEN = 1;
const GREEN_BLINK = 2;
const RED = 3;
const RED_BLINK = 4;
const YELLOW = 5;
const YELLOW_BLINK = 6;

let output;

class MIDI {
    constructor(){
        this.outputs = {};
        this.controllerConnected = false;
        
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(midi => {
                    this.success(midi);
                }, () => this.failure());
        }
    }

    success (midi) {
        this.inputs = midi.inputs.values();

        for (let input = this.inputs.next();
            input && !input.done;
            input = this.inputs.next()) { 
                console.log('MIDI: The controller model is ' + input.value.name);
                input.value.onmidimessage = this.onMIDIMessage;
                this.controllerConnected = true;
        }

        this.outputs = midi.outputs.values();
        if (this.keypadLightsOff() && app.isGame === true) {
            app.game.setupLights(true);
        }

        if (this.controllerConnected && app.isGame){
            Game.setStatus('midi', true);
        } else if (app.isGame) {
            Game.setStatus('midi', false);
        }
    }

    failure () {
        if (app.isGame) {
            Game.setStatus('midi', false);
        }
        console.error('MIDI: No access to your midi devices.')
    }

    onMIDIMessage (message) {
        // [on/off, key, velocity] | keys = [145/129, 48-72, 0-127] 
        // pads = [144/128, 0-39, 127] | dials = [176, 48-59, 0-127]
        let state = message.data[0];
        let key = message.data[1];
        let velocity = message.data[2];

        if ((key >= 48 && key <= 72) && state === 145 && app.isGame === false){ // Keyboard/On
            let currentBird = Bird.findByID(message.data[1]);

            console.log(currentBird.sing());
            app.songs[message.data[1]] = new Audio(currentBird.sing());
            app.songs[message.data[1]].play();

            let container = document.getElementById('bird-image-container');
            let birdImage = new Image();
            birdImage.src = `${currentBird.getImage()}`;
            container.innerHTML = "";
            container.appendChild(birdImage);

            document.getElementById('bird-name').innerHTML = currentBird.commonName;
            document.getElementById('sightings').innerHTML = 'Sightings: ' + currentBird.sightings;
            document.getElementById('image-credit').innerHTML = 'Image Credit: ' + currentBird.imageCredit;
            document.getElementById('audio-credit').innerHTML = 'Audio Credit: ' + currentBird.songCredit;

        } else if ((key >= 48 && key <= 72) && state === 129){ // Keyboard/Off
            console.log('MIDI: stopping singing');
            app.songs[message.data[1]].pause();
        } else if (app.isGame){
            app.game.processKeyPress(state, key, velocity);
        }
    }

    keypadLightsOff(){
        console.log('MIDI: Pad lights off');
        for (let o = this.outputs.next(); o && !o.done; o = this.outputs.next()) {
            output = o.value;
            var commands = []
            midimap.forEach( function( row, i ) {
                row.forEach( function( value, j ) {
                    commands.push(0x90, value, OFF)
                })
            })
            try {
                output.send(commands);  
                return true;
            } catch (e){
                console.error("ERROR MIDI: You forgot to plug in the midi controller");
                return false;
            }
        }
    }

    switchOnLights(lights){
        console.log('MIDI: Switching on lights');

        let commands = []
        lights.forEach(light => {
            commands.push( 0x90, light[0], light[1] )
        });

        try {
            output.send(commands);
            return true;
        } catch (e){
            console.log("ERROR: You forgot to plug in the midi controller");
            return false;
        }
    }
}
