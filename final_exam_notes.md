# IGM-330: Final Exam Review
The exam will be written; no use of computers is allowed.

## Scope and Closures
1. In the code below, given the variables foo, bar, and baz below, and the functions func1, func2, func3, identify which variables are within the scope tree of each function:

```js
const foo = 1

const func1 = function() {
  const bar = 2
  const func2 = function() {
    const baz = 3
  }
}

const func3 = function() { console.log( foo, bar, baz ) }
```

Variables in scope tree of func1: 
Variables in scope tree of func2:
Variables in scope tree of func3:

2. Changing  a variable declaration from using the `var` keyword to using `let` or `const` changes the variable from using ___________________________ scope to using ________________________ scope.



3. What does the acronym IIFE stand for?




4. Write an IIFE that logs the word ‘manticore’ when it is evaluated:






5. In your own words, describe why an IIFE is used in the code below:

```js
  var body = document.querySelector( 'body' )
  var data = [ 'a', 'b', 'c', 'd', 'e', 'f' ]

  for( var i = 0; i < data.length; i++ ) {
    var btn = document.createElement( 'button' )
    btn.innerText = i
    (function() {
      var num = i
      btn.onclick = function() { console.log( num ) }
    )()
  }
```







## Binding and Execution Context
1. In practical terms, what does “binding” in JavaScript determine?




2. Name the five types of binding and give a short example of each in use:













(For bonus points, there’s a sixth binding type we haven’t talked about very much… what is it?)

3. Identify the type of binding used in each code fragment below. :

```js
this.alert( 'here is a test' ) // -> what type of binding determines the value of this?

function foo() { 
  console.log( this.id )
}

const bar = { id: 0, foo }

bar.foo() // -> what type of binding is used?

bar.foo.call({ id:1 }) // -> what type of binding is used?

const baz = bar.foo.bind({ id:2 })
baz() // -> what type of binding is used?
baz.call({ id: 3}) // -> what type of binding is used? and why?

const guimaker = {
  id: 4,
  init() {
	   const btn = document.createElement( 'button' )
	   btn.onclick = ()=> console.log( this.id ) // what type of binding is used?
	   document.querySelector( 'body' ).appendChild( btn )
  }
}
guimaker.init()
```


## Prototypes, the new keyword, and delegation
1. Given the following code:

```js
const obj1 = { 
  func() { console.log( 'hi' ) } 
}

const obj2 = Object.create( obj1 )
```

Is it appropriate to say that `obj2` *inherits* from `obj1`? Why or why not? If not, what would a better word / phrase be to describe the relationship between `obj2` and `obj1`?





2. Does JavaScript use classical inheritance? If not, what “replaces” classical inheritance in JS?




3. Given the following code:

```js
const constructor = function() {
  this.x = 10
  this.y = 5
  this.z = 0
} 

const obj1 = new constructor()
const obj2 = new constructor()
```

a. What would the expression `obj1 === obj2` return? Why?


b. What would be returned by a call to `constructor()` without the `new` in front of it?





## Data and data retrieval
1. What does the acronym JSON stand for?




2. List three differences between JSON and JavaScript (to put it differently, three things JS allows you to do that JSON doesn’t):




3. Name at least one alternative to JSON for data representation:



4. Name two ways of loading external data using JavaScript:



5. What does `fetch()` return?




6. What functions do you use to serialize and de-serialize (convert to and from strings) JSON?




7. Write JSON that would store the following data. There are a number of possible alternatives:

NAME 				COMPANY
Mountain Dew		Pepsi
Gatorade			Pepsi
Coke				Coca-Cola
A&W				Dr Pepper Snapple Group



## Node.js and Server-side programming

1. What does Node.js enable us to do?




2. Name one or two big differences between using JavaScript in the browser and JavaScript in Node.js:




3. How do we import other JavaScript libraries / files in Node.js?




4. How do we export objects, functions, and variables so that they can be imported in Node.js?



5. What is `npm` responsible for?




6. What does CORS stand for in web programming? Why would we enable CORS on a server?




## ES6
1. Name four features that ES6 provides / makes easier as compared to ES5:



2. How can we ensure that our ES6 code will run in browsers that only understand ES5?



3. Name two advantages of using arrow functions vs. the `function` keyword:



4. When should you use `const` vs `let`?





## Just good things to know in JS

1. What’s the difference between `==` and `===`in JavaScript?


2. What JS code would you write to obtain a reference to a canvas with an `id` attribute of `painting`?


3. Name one way to ensure that code is only executed once our DOM and all external resources are fully loaded.


4. Write code that creates a button, attaches it the `<body>` tag and tells it log a random number to the console whenever it is clicked.


## Example JS exercise to write #1
Given the following array of names:

```js
const names = [ 'charlie', 'charles', 'chuck', 'chaz', 'charley' ]
``` 

…create a button for each item in the array and attach it to a `<div>` with an `id` attribute of `buttons`. When each button is clicked, have it print the name it is associated with. You may use either ES6 or ES5 for this.

















## Example JS exercise to write #2
Create an object named `Mover` with a single method, `move( x, y )`. The `move` method modifies that value of `this.x` and `this.y` by the arguments passed to it. 

Create a function named `Bike( x, y, speed )` that accepts initial x and y positions and a speed. The Bike function returns a new object  that uses `Mover` as its prototype. This new object is assigned the x,y, and speed values passed to the `Bike` function. The new object also is assigned a function, `ride()` that calls `move()` and passes in the speed of the bike for both the x and y value.

After writing the code for this, the following code should function:

```js
const mybike = Bike( 0, 0, 5 ) 
mybike.ride()
console.log( mybike.x ) // -> 5
console.log( mybike.y ) // -> 5
```















## Example JS exercise to write #3
Create a function called `largest` that finds the largest number in an argument array and prints it to the console. Assume the array contains all numeric values.
