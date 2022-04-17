"use strict"

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
    }
     
    failure () {
        console.error('No access to your midi devices.')
    }

    onMIDIMessage (message) {
        // [on/off, key, velocity]
        // keys = [145/129, 48-72, 0-127] 
        // pads = [144/128, 0-39, 127]
        // dials = [176, 48-59, 0-127]
        console.log(message.data);
        
        if (message.data[0] === 145 && message.data[1] === 48) {
            console.log(Bird.find('Robin').sing());
            app.songs[message.data[1]] = new Audio(Bird.find('Robin').sing());
            app.songs[message.data[1]].play();

        } else if (message.data[0] === 129 && message.data[1] === 48) {
            console.log('stopping singing');
             // Can't stop the rook, but you can pause it to allow the browser to garbage collect
            app.songs[message.data[1]].pause();
        }
    }
}
