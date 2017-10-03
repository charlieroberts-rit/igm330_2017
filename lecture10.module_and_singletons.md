Start of class:
  - Quiz #4

# Design Patterns
  * First, what is a design pattern?
    * Original idea came from architect Christopher Alexander, who described a
      a series of patterns used in architecture and civic planning in his book
      "A Pattern Language"
         (https://www.amazon.com/Pattern-Language-Buildings-Construction-Environmental/dp/0195019199/)
         http://www.iwritewordsgood.com/apl/set.htm
         
  * In 1994, The "Gang of Four" released "Design Patterns", a similar concept
    but for software engineering.
    
  * There are now design pattern books many programming languages, including
    JavaScript: https://addyosmani.com/resources/essentialjsdesignpatterns/book/
    
  * Today we'll look at the Module pattern and the Singleton pattern, because
    both of them make specific use of closures in JS, which we read about this past week.
    
# Module Pattern
  * Goals: 
    * Encapsulate data... no polluting of namespaces
    * Control read / write access to data via closures
      and dedicated functions
      
```js

var Module = function( arg1, arg2 ) {
  var data1 = arg1,
      data2 = arg2
      
  var instance = {
    getData1: function()  { return data1 },
    setData1: function(v) { data1 = v },
    getData2: function()  { return data2 },
    setData2: function(v) { data2 = v },    
  }
  
  return instance
}

var myinstance = Module( 1,2 )
console.log( myinstance.data1 ) // undefined
console.log( myinstance.getData1() ) // 1
```

# Singleton Pattern
  * Goals:
    * Instantiate an object only once, usually after some type of initialization
      condition has been met, perhaps in a `window.onload` callback function.
    * Always return the same object instance.
    
```js
var Singleton = function() {
  var obj = null
  
  var init = function() {
    if( obj === null ) {
      obj = {
        foo: Math.random()
      }
    }
    
    return obj
  }
  
  return init
}

var constructor = Singleton()
var singleton1 = constructor()
var singleton2 = constructor()

console.log( singleton1.foo === singleton2.foo )
```