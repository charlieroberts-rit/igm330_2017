# Review from last class
  - Reminder, next Thursday prototypes for project #1 are due
    - If you have questions about what you want to do, come to office hours
      - Today and tomorrow

  - Also a reminder, on Thursday there's a quiz on Chapter 1 of  
      You Don't Know JS / this & object prototypes
      
  - Last class we discussed design patterns
    - Specifically looked at the Singleton and Module Patterns
      - Module Pattern
        - Avoid namespace pollution
        - Use lexical closure to ensure private access to variables
    - Goal was to present patterns that reinforce JavaScript concepts
      that we've discussed like scope and closure.
    
  - Today we'll start by looking at JavaScript interview questions,
    gauging where we're at so far.    
    - Questions will mainly involve scope and closure  
    - link: https://www.toptal.com/javascript/interview-questions

# this
  - `this` is the *context* associated with the execution of a function. Unlike
    scope in JavaScript, the context is determined at run time.
    
  - The most common use case: when calling a method of an object, `this` refers
    to the object that the method is a member (property) of
    
```javascript
var myobj = {
  foo: 1,
  bar: function() {
    console.log( this.foo )
  }
}
  
myobj.bar() // -> 1
```
  * However, we can also explicitly tell the JavaScript engine what the context
    should be for a particular function execution. Effectively, we can replace 
    the default context with a context of our choosing.
    
```javascript
var myobj = {
  foo: 1,
  bar: function() {
    console.log( this.foo )
  }
}

var myobj2 = { foo:10000 }
  
myobj.bar.call( myobj ) // -> 10000
```
  
  * So what are the other *default contexts* for functions?
 
    * Event handlers: by default, the context for an event handler
     will be the object that the event is associated with.

```javascript
window.onmousemove = function() { console.log( this ) } // Window object
 
btn.onclick = function() { console.log( this ) } // Button
```

    * For a function defined in the global namespace, the context will either
      be the `window` object or `undefined`, depending on whether or not strict
      mode is used.
      
```javascript
var foo = function() { console.log( this ) } 
foo() // Window

var bar = function() {
  'use strict'
  console.log( this )
}
bar() // undefined
```
  
  * A common gotcha: let's say you have an object with a draw method, and you want it
    to call itself recursively.
    
```javascript
var foo = {
  draw: function() {
    window.requestAnimationFrame( function() { this.draw() } )
  }
}

foo.draw() // yields error, draw is undefined
```
     
  * The problem is that the anonymous function we pass to requestAnimationFrame isn't
    associated with a context, so by default it uses the global window object (we're not
    using strict mode). Since the window object doesn't have a draw method, we get an error.

  * We can fix this problem using a special method, `bind()` that allows us to permanently
    define the execution context for a function:
    
```javascript
var foo = {
  draw: function() {
    window.requestAnimationFrame( 
      function() { 
        console.log( 'drawing' )
        this.draw() 
      }.bind( foo ) 
    )
  }
}

foo.draw() // no more error!
```    

... more practical:
```javascript
  var foo = {
    draw: function() {
      console.log( 'drawing' )
      window.requestAnimationFrame( foo.draw )
    }
  }
  foo.draw = foo.draw.bind( foo )
  foo.draw() // no eror
```

... even better:
```javascript
  var foo = {
    init: function() {
      this.draw = this.draw.bind( this )
    }, 
    draw: function() {
      console.log( 'drawing' )
      window.requestAnimationFrame( foo.draw )
    }
  }
  foo.init()
  foo.draw() // no eror
```


# ICE
  - Boomshine parts 1, due next Tuesday
