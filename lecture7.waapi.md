# Web Audio API

## Basics
- Two versions, one by Mozilla and one by Chrome
  - Do DSP in JavaScript (via per-sample callbacks) vs do DSP
    using pre-built C++ nodes scripted from JavaScript.
    
  - *Nodes* are assembled into a *graph*. Nodes are also called
    *unit generators*, from the original music programming languages
    
  - You can still do JavaScript DSP using the ScriptProcessor node (show
    gibberish and genish)

## The AudioContext (and an oscillator)
- First, we need to grab an *AudioContext* object. 
  - With canvas, the context is responsible for all drawing operations
  - With audio, the context is primarily responsible for creating new
    audio nodes. In this way it serves as a *factory* object.
  - The audio context also has a *destination* property that represents
    the digital to audio convertor on the computer... anything node
    connected to it will send sound to the speakers / headphone.
    
- Try it out:

```js
var ctx = new AudioContext()
var sin = ctx.createOscillator()
sin.connect( ctx.destination )

// now tell our sin oscillator to start running
// the 0 argument means start now!
sin.start( 0 )

// we can change the frequency....
sin.frequency.value = 220

// we can also tell the oscillator to gradually ramp
// to a new frequency. Time is measured in seconds since
// the audio context was first created, to get a relative time value
// we can use the ctx.currentTime property

sin.frequency.linearRampToValueAtTime( 1760, ctx.currentTime + 30 )

// to stop...
// sin.stop()
```

## Analysis

- The sine oscillator we just heard is the fundamental unit of all audio synthesis
- Jospeh Fourier proved that any wave (not just sound) can be represented by sums of sine waves with
  different frequencies and amplitudes.
- So how can we determine which frequencies are present in a wave?
  - Turns out taking the dot product of the two signals (multiplying each point in time and adding the results)
    is a good indicator, see https://jackschaedler.github.io/circles-sines-signals/dotproduct3.html
- That means we just take the dot product of every frequency we're interested in.
- The WebAudio API does this by evenly dividing the available frequencies into *bins*
  - Sampling rate = 44100 samples per second... nyquist frequency = 22050 Hz.
  - The *fftSize* determines how many samples are used to generate each FFT result. 
  - The *frequencyBinCount* is a read-only property that is always equal to fftSize / 2.
    This gives us the nunber of different values we can use for our frequency visualization.
    - the default fftSize is 1024, for 512 bins
  - 22050 / 512 = 43 Hz per bin
  
## Perception of frequency (pitch)
- Frequency is not perceived linearly!!! It is logarithmic (same with amplitude!)
- If *pitch* refers to our perception of frequency, then a frequency change of 60
  to 70 Hz represents a much larger change in pitch then a change of 2000 to 2010 Hz.

    
## Read the frequency of our sine oscillator

```js
// go ahead and reuse our previous code
// except lets make a much longer, wider frequency sweep
sin.frequency.value = 0
sin.frequency.linearRampToValueAtTime( 880 * 4, ctx.currentTime + 30 )

var analyser = ctx.createAnalyser() // british spelling!

// set FFT size
analyser.fftSize = 32
console.log( analyser.frequencyBinCount ) // > 16

// connect our sin oscillator to our analyser node
sin.connect( analyser )

// create a typed JS array to hold analysis results
var results = new Uint8Array( analyser.frequencyBinCount )

// every second, get our results and print them
var loop = setInterval( function() {
  analyser.getByteFrequencyData( results )
  console.log( results.toString() )
}, 1000 )
```

- So how about those results?
  - Note that the frequency registers a maximum strength across multiple bins
    - this is due to how the FFT works internally
  - We can get better precision by increasing the window size
    - however, this comes at the expense of temporal resolution!
    - classic tradeoff of FFTs: you can have frequency resolution, or temporal
      resolution, but not both :(
      
Homework: create a simple visualization of the FFT
  - use a square or saw oscillator instead of a sine oscillator
  - while sine waves only contain a single frequency (ideally),
    square and saw waves contain many *overtone* frequencies.
      - overtones are multiples of a base frequncy:
        - for example, 220 Hz has overtones of 440, 660, 880, 1110 etc.

  