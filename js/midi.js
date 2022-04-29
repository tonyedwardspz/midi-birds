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

        if (navigator.requestMIDIAccess) {
            console.log('Browser supports MIDI!');
    
            navigator.requestMIDIAccess()
                .then(midi => {
                    this.success(midi);
                }, () => this.failure());
        }
    }

    success (midi) {
        console.log('Midi Ready');
        this.inputs = midi.inputs.values();
    
        for (let input = this.inputs.next();
            input && !input.done;
            input = this.inputs.next()) {
            input.value.onmidimessage = this.onMIDIMessage;
        }

        this.outputs = midi.outputs.values();
        this.keypadLightsRed(); 
    }
     
    failure () {
        console.error('No access to your midi devices.')
    }

    onMIDIMessage (message) {
        // [on/off, key, velocity]
        // keys = [145/129, 48-72, 0-127] 
        // pads = [144/128, 0-39, 127]
        // dials = [176, 48-59, 0-127]
        // console.log(message.data);
        app.game.processKeyPress(message.data[0], message.data[1], message.data[2]);
    }

    keypadLightsOff(){
        var commands = []
		midimap.forEach( function( row, i ) {
			row.forEach( function( value, j ) {
				commands.push(0x90, value, OFF)
			})
		})
		output.send(commands)
    };

    keypadLightsRed(){
        for (let o = this.outputs.next(); o && !o.done; o = this.outputs.next()) {
            output = o.value;

            let commands = []
            midimap.forEach( function( row, i ) {
                row.forEach( function( value, j ) {
                    if (value === 35 || value === 36){
                        commands.push( 0x90, value, GREEN_BLINK )
                    } else {
                        commands.push( 0x90, value, RED )
                    }  
                });
            });
            output.send( commands );
        }
    }

    switchOnLights(lights){
        console.log('Switching on lights');

        let commands = []
            lights.forEach(light => {
                commands.push( 0x90, light[0], light[1] )
            });
        output.send( commands );
    }
}
