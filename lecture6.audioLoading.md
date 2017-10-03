# Audio loading / DOM events

## Quiz - Chapters 1 & 2, Scope and Closures

## Example past audio visualizer projects
https://people.rit.edu/ljm1896/330/Assignments/AudioProject/Visualizer.html
https://people.rit.edu/mxb3145/330/audio-visualizer/
https://people.rit.edu/djh9683/330/assignments/audio-visualizer/index.html  (click to make trees)
https://people.rit.edu/ask3414/330/projects/audioVisualizer/AudioVisual/AudioVisual/web-audio-visualizer.html
https://people.rit.edu/exl8210/330/projects/audio-visualiser/
https://people.rit.edu/zrm2647/330/web-audio-visualizer.html
https://people.rit.edu/rxs2833/330/exercises/web-audio-prototype/index.html  (this one is hilarious. Uses air horns and kids bop)
https://people.rit.edu/jxf2190/330/projects/audiovis.html    
https://people.rit.edu/rwg9692/330/projects/AudioVis/audioVisualizerFinal.html
https://people.rit.edu/beg8040/330/audio_viz/
https://people.rit.edu/rjm9187/330/AudioViz/web-audio-visualizer-start.html
https://people.rit.edu/akw7657/330/Project1/Project1
https://people.rit.edu/jmr8776/330/Assignments/Audio_Visualizer/web-audio-visualizer.html
https://people.rit.edu/bxm8563/330/projects/audiovisualizer.html
https://people.rit.edu/sxl9302/330/Projects/Audio-Visualizer/Audio-Visualizer.html
https://people.rit.edu/gmk1072/330/exercises/AudioVisualizer/web-audio-visualizer-start.html
https://people.rit.edu/crh1781/330/audio-visualizer/
https://people.rit.edu/kxh8057/330/audioviz/
https://people.rit.edu/dgg5503/330/Projects/Web-Audio-Viz/web-audio-project.html
https://people.rit.edu/alr9596/330/audiovisualizer.html
https://people.rit.edu/ejs3863/330/audiovisualizer/
https://people.rit.edu/~sts7613/audioViz/
https://people.rit.edu/hxz3509/Visualizer-development_final/Audio_Visualizer_Final/viz_final.html
https://people.rit.edu/arw2013/prototype/Prototype2.html


## Review previous material on audio context, analysis
  * Human Hearing & Sample Rate
    * Humans ideally hear from 20 Hz (Hz = cycles per second) to 20 kHz
    * The Nyquist theorem states we have to sample at twice the highest
      frequency value we want to capture
    * CD quality audio captures 44100 samples per second, more than twice
      20 kHz
  
  * FFT size (the number of samples used for each analysis) determines the number
    of frequency *bins* in our analysis, but also sets our temporal resolution
    * Size must be power of two. Minimum size is 32.
    * Classic tradeoff between frequency resolution and temporal resolution
    * However, we don't need to perform analysis faster than our maximum frame rate
      (60 Hz), so we can use larger FFT sizes (512, 1024)
    
## Loading and playing audio files
  * We can easily play files and get a set of controls using the <audio> element.
    * Has *controls* and *loops* attributes
  
  * In the Web Audio API (WAAPI) we can get access to the samples outputted by
    an audio element using the MediaElementSource node, which accepts an audio
    element as a constructor argument.
  
```js
var ctx = new AudioContext()
var audioElement = document.querySelector( 'audio' )
var player = ctx.createMediaElementSource( audioElement )
player.connect( ctx.destination )
```
     
  * To load a file, we set the `src` property on our audio element and
    then play the file using the play() method. However, there's a problem... CORS.
    
  * ### CORS policy:
    * Can't load files from different URLs
    * Servers can selectively enable CORS.
    * You can turn it off in Chrome for particular sessions, for testing purposes
      http://www.thegeekstuff.com/2016/09/disable-same-origin-policy/
    * Or just upload to Banjo
      
  * Once we've set up CORS, now we can load files:
  
```js
audioElement.src = 'media/somefile.mp3'
audioElement.play()
```

## Callbacks and Sliders

  * Sliders are made using the `<input type='range'>` tag.
  * You can define `min`, `max` and `step` attributes to control how it functions.
  * In order read values whenever the slider is changed, we need to listen to the `oninput` event,
    as the `onchange` event is only triggered when onmouseup or onpointerup.
    
```js
slider = document.querySelector( 'slider' )
slider.oninput = function( e ) { 
  console.log( e.target.value )
}
```

   


