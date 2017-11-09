# IGM-330: ES6 
## Review
We’ve briefly touched on many parts of ES6 in different parts of the class. Let’s review some of those first.

### `let` and `const` vs. `var`

#### The problem
As we know, whenever we create a variable with the `var` keyword, it is scoped to the current function that is being executed. This causes all kinds of problems with JavaScript; the most common has to do with variables declared inside of for loops. For example:

```js
var functions = []
for( var i = 0; i < 10; i++ ) {
  var j = i * 2
	functions[ i ] = function() { console.log( i, j ) }
}
functions[ 0 ]() // 10, 18
functions[ 6 ]() // 10, 18
```

As you can see, every reference to the variables `i` and `j` point to the same number,  no matter what they were when the functions were generated. The values of `i`and `j` will always be the same inside of one function.

We can get around this using an IIFE to create an extra scope:

```js
var functions = []
for( var i = 0; i < 10; i++ ) {
  (function() {
    var j = i * 2
	  functions[ i ] = function() { console.log( i, j ) }
  })()
}
functions[ 0 ]() // 10, 0
functions[ 6 ]() // 10, 12
```

Now the value of `i` stays the same, but the value of `j` is different as it is declared multiple times *inside of different functions*. Functions provide scope in JavaScript prior to ES6. 

#### The fix

`let` and `const` fix these problems by scoping variables to the *block that they are created in* instead of the function that they are created in. A block in JS is demarcated using the `{}` characters, like in a `for` loop, or an `if`statement.

```js
var functions = []
for( let i = 0; i < 10; i++ ) {
  let j = i * 2
	functions[ i ] = function() { console.log( i,j ) }
}
functions[ 0 ]() // 0, 0
functions[ 6 ]() // 6, 12
```

Great! No IIFE needed, less code, cleaner. Basically we get uniquely scoped variables for every iteration of the for loop.

### Multiline / template strings
String manipulation used to be torture in JavaScript. For example, to make a multiline string, you would have to do crazy things like:

```js
var multi = [
  'this is the first sentence.',
  'this is the second sentence.',
  'this is the third sentence.',
].join( '\n' )
``` 

In the above example, we put each line into array, and then combine them all together, separated by a newline, using the array’s `join` method.

Much cleaner:
```js
var multi = `this is the first sentence.
this is the second sentence.
this is the third sentence.`
```

We can also do string interpolation to easily insert variables (or any valid JavaScript expression) into a string:

```js
for( let i = 0; i < 10; i++ ) {
  console.log( ‘the value of I is ${I}.` )
}
```

OK, on to the new stuff!

### Default function arguments
Before ES6 we had to create default function arguments as follows:

```js
let me = function( a, b, c ) {   if( typeof a === 'undefined' ) a = 1   if( typeof b === 'undefined' ) b = 2   if( typeof c === 'undefined' ) c = 3

	return 'a = ' + a + ', b = ' + b + ', c = ' + c }
```

With ES6 this becomes much simpler:

```js
let me = function( a=1, b=2, c=3 ) {
  return `a = ${a}, b = ${b}, c = ${c}` }
```

### Arrow functions
We saw last class that arrow functions can be used to concisely define functions, making them shorter and potentially easier to read in certain situations (and potentially harder to read in others).

For example, here’s loading in population data and parsing it as JSON with Promises and arrow functions:

```js
fetch( 'https://api.population.io/1.0/population/2010/United%20States' )
  .then( result => result.json() )
  .then( json   => console.log( json ) )
```

What we didn’t talk about is the new effect arrow functions have on *binding*. Arrow functions use *lexical binding*, where the value of the `this` keyword is determined by whatever the value of `this` is in the surrounding functional scope. In most cases, this is the behavior that we’d expect to have happen, if binding in JavaScript wasn’t subject to so many different rules. The binding of arrow functions was briefly discussed at the end of Chapter 2 this & object prototypes.

For example, consider the following:

```js
const obj = {
  test() {
	  setTimeout( function() { console.log( this ) }, 0 )
  }
}
obj.test() // default binding, the window object is logged
```

Because of default binding (neither explicit, implicit, or hard binding is used when the function is executed), the window object is logged. A common trick is to store the intended value of `this` in a variable that then is wrapped in a closure, and to refer to that variable instead.

```js
const obj = {
  test() {
    const self = this
	  setTimeout( function() { console.log( self ) }, 0 )
  }
}
obj.test() // correctly logs obj to the console
```

However, since arrow functions use the binding from the surrounding functions, we don’t need to add any extra steps to get `this` to refer to our `obj`.

```js
const obj = {
  test() {
	  setTimeout( () => console.log( this ), 0 )
  }
}
// via implicit binding the value of this === obj
// when we call test() below. The arrow function piggy
// backs off of that binding.
obj.test()

// however, if we call test with explicit binding, 
// the arrow function will piggy back off of that instead.
obj.test.call( { foo:0 } ) // logs { foo:0 }
```

### Rest operator

The “rest” operator enables us to easily define functions that accepts an unlimited number of arguments, but also have some predefined parameters. Pre-ES6, the following was common:

```js
var functionForManyThings() {
  var x = arguments[0] === undefined ? 1 : arguments[0]
  var y = arguments[1] === undefined ? 2 : arugments[1]
  // get any additional arguments and store in an array.
  // the default "arguments" object isn't a real JS array, so
  // we have to call the slice method of the Array prototype
  // to make this work.
  var props = Array.prototype.slice.call( arguments, 2 )

  // do something with props...
  console.log( props[0], props[1] )
}
```

The main problem here is that the `arguments` keyword (which points to the arguments for any given function call) is not an array, it’s an “array-like object”. That means it stores items in a list that you can access via indexing, but it doesn’t come with the full set of methods that a normal JS array does. So, in the example above we have to jump through some hoops to use Array methods with our `arguments` object. 

ES6 makes the above code much cleaner using the “rest” operator, `…`:

```js
const functionForManyThings( x = 1, y = 2, ...props ) {
  // do something with props...
  console.log( x, y, props[0], props[1] )
}
functionForManyThings( 5, undefined, 9, 10 ) // 5, 2, 9, 10
```

### Spread operator

### Classes
From our previous ICE, converted to use the `class` keyword:

```js
    class Particle {
      constructor( x,y ) {
        this.x = x
    	  this.y = y
        this.speed = Math.ceil( Math.random() * Particle.maxSpeed )       
      }
      move() {
    	  this.x += this.speed
        this.y += this.speed
      }
    }
    Particle.maxSpeed = 2
    
    class SquareParticle extends Particle {
      constructor( size, x, y ) {
        super( x, y )
        this.size = size
      }
      draw( ctx ) {
        ctx.fillRect( this.x, this.y, this.size, this.size )
      }
    }
```