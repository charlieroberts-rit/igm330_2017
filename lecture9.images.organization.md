# JS Organization / pre-loading

## Project #1


## Preloading images and callbacks

* We can preload images by simply loading them in JS
  when our page first loads.

```js
  var filenames = [],
      images    = {},
      width     = 400,
      height    = 400,
      loadCount = 0
  
  var preload = function( filenames, callback ) {
    for( var i = 0; i < filenames.length; i++ ) {
      var filename = filenames[ i ]
      images[ filename ] = new Image( width, height )
      images[ filename ].onload = function() {
        if( imgCount++ > filenames.length ) {
          callback()
        }
      }
    }
  }
  
  preload( filenames, function() { console.log( 'images loaded.' ) } )
```

* Simulating download times
  * Option is available in the "Network" tab of the Chrome Developer Tools
  * Can choose from various speeds to simulate, and also get an idea for
    how fast your page loads.
  
* Using a separate utilities.js file
  * It's typically better to load you're JavaScript from a separate file(s). This will
    make all of your files (html, js, css) easier to read than if you have multiple
    languages thrown together into one document.
  
  * Always use an IIFE to avoid polluting the global namespace.
    * Exception: if you're entire script file is a function mapped to
      window.onload, which is what we'll be doing for our app.js file.

  * export utilities to global namespace as needed
  
* Create app.js
  * Using window.onload ensure that utilities has already been loaded.
  