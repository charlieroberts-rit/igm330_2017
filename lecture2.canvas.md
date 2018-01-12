# Canvas

## What is it?
- Canvas is a 2D drawing API that allows you to draw directly into a browser window without using Flash or Java.
- Canvas was originally created by Apple in 2004 for use with their Dashboard widgets and Safari Web Browser
- It was soon after picked up by Firefox, Opera, and Chrome. Currently supported by all modern browsers.
- The "Canvas 2D Context API" been standardized by WHATWG and the W3C
- Fairly concise API for drawing - take a look at the links above - the API headers would fit on 2 printed pages. 

## What does it do?
- Raster-based system (SVG is vector)
- Immediate mode system (as opposed to retained mode)... you need to implement everything, physics, sprites etc.

## Explaining the code
- The ctx variable is a reference to the "2D drawing context" - which gives us access to the entire canvas drawing API.
- ctx.fillStyle is one property of the drawing context. This property sets the color of all future "fill" operations.
- ctx.fillRect() is one of the methods of the drawing context. This method "fills" a specified rectangle with current fill color.
- Explain how DOM must be initialized before we can run canvas initialization code


Go download the source (first-canvas.html) from mycourses.rit.edu so that we can make some changes to the drawing code and also "break" (and fix) the page. We'll also take a quick look at debugging your JavaScript.

# BIG REVIEW OF 230 MATERIAL

## HTML boilerplate
- doctype 
- lang='en' 
- <meta charset='utf-8'>

- add in canvas tag
- how to make it full screen?
  <style>
    canvas { width:100%; height:100% }
  </style>
- script tag

- window.onload
  - why does we need to use an onload event?
  - why can we put it before our function declaration?
    - variable hoisting vs function hoisting
      - this is the reason that variables are often declared at the top of 
        functions in JS.
        
- discuss getElementById, getElementsByTagName, querySelector to get canvas reference

- getContext('2d')

- ctx.fillStyle = 'red'
  - try to minimize changes to canvas context... each one incurs a cost
    - does this still matter? who knows, but it is better coding practice.

- ctx.fillRect( 0,0, 200,200 )

- how do we fill the entire screen?
  - canvas style width / height 100%
  - body style margin: 0
  - in onload function, set width and height of canvas DOM element to equal
    window.innerWidth and window.innerHeight
  
- create animation of rectangle traveling across screen.
  - setTimeout vs. setInterval vs. requestAnimationFrame
  - create ball as object


