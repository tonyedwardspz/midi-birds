"use strict"

class MIDI {
    constructor(processKeyPress){
        this.processKeyPress = processKeyPress;

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

        this.processKeyPress(message.data[0], message.data[1], message.data[2]);
        
        // super.processKeyPress(message.data[0], message.data[1], message.data[2]);
        if (state === 145 && key === 48) {
            console.log(Bird.find('Robin').sing());
            app.songs[key] = new Audio(Bird.find('Robin').sing());
            app.songs[key].play();

        } else if (state === 129 && key === 48) {
            console.log('stopping singing');
             // Can't stop the rook, but you can pause it to allow the browser to garbage collect
            app.songs[key].pause();
        }
    }
}
