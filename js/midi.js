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
            // each time there is a midi message call the onMIDIMessage function
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
        if (message.data[1] === 48) {
            console.log(Bird.find('Robin').sing());
        }
    }
}
