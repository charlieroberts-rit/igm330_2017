# Arrays, IIFEs, Functions, and Closures

## Arrays
- What are the two ways to make arrays?
  - [] vs new Array()

Arrays, like regular JS objects, can hold any type of data and mix/match

Arrays in JS are *sparse*
  - vanilla JS arrays do not control a single continuous block of memory
    - this can result in optimization difficulties
  - you can have an array with `.length = 1000` but only one non-undefined entry;
    in that case only the single defined entry will consume memory.
  
Array method names came from Perl (unfortunately!), which was the common language for server-side
programming at the time.

We can
  - .push() to add items to the end of an array
  - .unshift() to add items to the beginning
  - .pop() to remove the last time
  - .shift() to remove the first item
  - many other methods... find(), indexOf(), sort() etc, show MDN reference
  
We can add a method to the array prototype, and now it accessible by all arrays
  - show example
    ```js
      Array.prototype.random = function() {
        var idx = Math.floor( Math.random() * this.length )
        return this[ idx ]
      }
    ```
  - however, this is typically frowned upon
    - but, good news! We can make a new type of object that uses an Array as a prototype.
    ```js
    List = Object.create([])
    List.random = function() {
      var idx = Math.floor( Math.random() * this.length )
      return this[ idx ]
    }
    myList = Object.create( List )
    myList.push( 0,1,2,3 )
    myList.random()
    ```

Looping through arrays
  - standard for loop
  - .forEach( function( e ) { 
  
    })
  - mappedArray = [].map( function(e) ) {
  
    }
      
## IIFEs

- Problem - right now, when we declare variables outside of a function, we create
global variables
  - show example

- Each function creates its own scope, limiting access to the associated variables.

- If we wrap all our code in a function, the scope of created variables is limited.

- IIFEs (immediately-invoked function expressions)
  - show example

- Also show classic example with buttons / alerts

for( var i =0; i < 10; i++ ) {
  var btn = document.createElement('button')
  btn.innerText = i
  btn.onclick = function() {
	console.log( i )
  }
  document.querySelector('body').appendChild( btn )
}

- fix with IIFE

- fix with let / const / ES6



  


