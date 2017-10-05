# Getting started & review
  - ## NO CLASS NEXT TUESDAY. Also, no office hours.
  - ### NEXT THURSDAY PROJECT 1 PROTOTYPES ARE DUE FOR (BRIEF) PRESENTATION
  
  - Quick review of the `this` object using interview questions found at:
   https://www.toptal.com/javascript/interview-questions (questions #3, #24, and #26)
  
  - Quiz: Chapters 1 & 2, You Don't Know JS - this and Object prototypes
  
  - Some fun examples with Three.js
    - https://threejs.org
    - http://particle-love.com (nice looking particle effects)
      - uses dat.gui
    - http://analysis.4sceners.de (city-based audio visualizer)
    
# using dat.gui

- grab code from: https://workshop.chromeexperiments.com/examples/gui/

```javascript
window.onload = function() {
  var canvas = document.querySelector('canvas')
  var ctx = canvas.getContext('2d')
  var color = {
    red:0,
    green:0,
    blue:0
  }
  
  var draw = function() {
    window.requestAnimationFrame( draw )
    ctx.fillStyle = `rgb( ${color.red}, ${color.green}, ${color.blue} )`
    ctx.fillRect( 0,0,canvas.width,canvas.height )
  }
  
  var gui = new dat.GUI()
  gui.add( color, 'red', 0, 255 ).step(1)
  gui.add( color, 'green', 0, 255 ).step(1)
  gui.add( color, 'blue', 0, 255 ).step(1)
  
  draw()
}
```

# ICE - Boomshine Part II

# Reading  
  - Chapters 4 & 5 - You Don't Know JS - this & object prototypes
  https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes
