# functions

- Standard form:

```js
function add( a,b,c ) {
  return a + b + c
}

add( 1,2,3 )
```

- a,b,c are the *arguments* to the function, and are limited to the scope of the add function.
- You do not need to put the var keyword in front of argument names. 
- You use the *return* keyword to have a function output a value.
- All our arguments are stored in an array-like object, appropriately named
  *arguments*
  
## arguments
- We could alternatively write:

```
function add( a,b,c ) {
  return arguments[0] + arguments[1] + arguments[2]
}

// or

function add() {
  var sum = 0
  for( var i = 0; i < 10; i++ ) {
    sum += arguments[i]
  }
  return sum
}
```
## a brief digression into functional programming
```
// or? FP
// explain how reduce works
const add = (x,y) => {
  console.log( 'x:', x, 'y:', y )
  return x + y
}
const add = (x,y) => x + y
const sum = (...args) => {
  return args.reduce( add )
} 

// or just call on the array
[1,2,3].reduce( add )
```

## The *this* keyword and constructor functions

```
// this goes in the global namespace!
var test = 'test1'

// this also goes in the global namespace!
// in effect, foo becomes a method of the window object
var foo = function() {
  // this refers to the global namespace
  console.log( this.test )
}
foo() // "test1"

var obj = {
  test: 'not test1',
  foo: foo
}

obj.foo() // "not test1"

## The horror of *new*

```
var HappyFunBall = function( death, carnage ) {
  this.death = death
  this.carnage = carnage
}

var myball = new HappyFunBall()

// wtf?
```

- When the new keyword is used, JavaScript makes a new object and assigns
  to the this keyword
- That new object is returned automatically by the function; there is 
  no need to do so explicitly
- So is there any difference between the above code and the code below?

```
var HappyFunBall = function( death, carnage ) {
  return { death:death, carnage:carnage }
}

var myball = HappyFunBall()
```

- No, not really any difference... OK, there is one lame difference.
  - the instanceof operator