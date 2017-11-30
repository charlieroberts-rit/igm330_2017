# IGM-330: binding and d3.js
## Binding. One more time.
Five(!) types of binding:

1. Default - if no other type of binding is used, the value of `this` defaults to the global object (`window` in the browser). 
2. Implicit - occurs when you call a function that is a member of an object through reference to the object. In this case it is “implied” that the execution context is the object that has a reference to the function. Example:
```js
const foo = {
  test() { console.log( this ) }
}

foo.test() // implicit binding

const test = foo.test
test() // default binding! Not being called through a reference to foo.
```

3. Explicit - define the execution context explicitly using `.call` or `.apply`. 
```js
const aFunction = function() {
  console.log( this )
}

aFunction.call({ avalue:0 }) // explicit binding
```

4. Hard binding - create a permanently bound execution context for a function using the `.bind()` method.
```js
const aFunction = function() {
  console.log( this )
}

const boundFunction = aFunction.bind({ avalue:-10000 })
boundFunction()

// using .call() doesn't matter, execution context is permanently assigned
boundFunction.call({ avalue:Infinity }) 
```

5. Lexical binding - For arrow functions, the location of `this` in the code determines what the binding is.
```js
const callbackObj = {
  cb() {
    // normally this would be default binding, but with arrow functions
    // we get lexical binding instead.
	  setTimeout( ()=> console.log( this ), 1000 )
  }
}

callbackObj.cb()
```

What is the binding that happens here?

```js
const player = {
  fire() { this.shoot() }
}

window.onload = function() {
  // what type of binding?
  player.fire()
	
	// what type of binding for this?
  this.onmousemove = () => {
	  this.alert( 'what type of binding here?' )
  }

	// and what about this very contrived binding?
  player.fire.call( player )
}

// what type of binding did the above example not use?

```

## d3.js
A visualization library from Mike Bostock, originally created for the NYT. 

First, let’s make a HTML page to load the library and a script file that we’ll fill in:

```js
<!doctype html>
<html lang='en'>
  <head>
    <script src="https://d3js.org/d3.v4.min.js"></script>
    <script src='./main.js'></script>
  </head>
    
  <body></body>
</html>
```

Next, let’s get some data loaded, using the `fetch()` examples from earlier in the course (currency values):

```js
window.onload = function() {
  fetch( "http://api.fixer.io/latest?base=USD" )
    .then( data => data.json() )
    .then( console.log )
}
```

If we load our index.html page now, we can see that the JSON data from our currency conversion values is printed to the developer console. OK, now let’s get to the d3 side of things. We’ll make a function called `createViz` that will be executed once our data is loaded:

```js
window.onload = function() {
  const createViz = function( jsonData ) {
    const viz = d3.select( 'body' ).selectAll('div')
	
    viz.data( d3.values( jsonData.rates ) )
      .enter()
		.append( 'div' )
  }

  fetch( "http://api.fixer.io/latest?base=USD" )
    .then( data => data.json() )
    .then( createViz )
}
```

d3 tries to let you program *declaratively* as opposed to  *imperatively*; that is, it wants you to tell it the outcome and then it will figure out how to do it. In this case, the first task we complete is to create a selection of all `div` elements in our `body` tag. In this case the selection is empty; we’ll fill it by telling d3 what data we want to use and how that data should be displayed. We’ve started by saying that it should be represented by a `div`. If you look at the HTML elements in your development console, you’ll note a bunch of blank divs. Let’s format them!

```js
window.onload = function() {
  const createViz = function( jsonData ) {
    const viz = d3.select( 'body' ).selectAll('div')
	
    viz.data( d3.values( jsonData.rates ) )
      .enter()
		.append( 'div' )
      .style( 'background', d => `rgb( ${ Math.round( d ) }, 0, 0 )`)
      .style( 'color', 'white' )
      .html( d => d ) 
  }

  fetch( "http://api.fixer.io/latest?base=USD" )
    .then( data => data.json() )
    .then( createViz )
}
```

In the above code, note that we have to round our currency values to use them as part of a `rgb()` css value. OK, so now we have a bunch of colored rows with associated values. We can also add the currency key in. Currently we’re only getting the `values` stored in jsonData.rates, but we can also get the `keys` or get both the keys and values using `d3.entries`. Let’s change to that and display the associated country codes:

```js
window.onload = function() {
  const createViz = function( jsonData ) {
    const viz = d3.select( 'body' ).selectAll('div')
	
    viz.data( d3.entries( jsonData.rates ) )
      .enter()
		.append( 'div' )
      .style( 'background', d => `rgb( ${ Math.round( d.value ) }, 0, 0 )`)
      .style( 'color', 'white' )
      .html( d => d.key + '<br>' + Math.round( d.value) )

  }

  fetch( "http://api.fixer.io/latest?base=USD" )
    .then( data => data.json() )
    .then( createViz )
}
```

Now each data point that d3 gives us has both a `key` and a `value` property that we can refer to. We use the `key` to label each row, and the `value` to both determine the row color as well as for presentation.

One of the reasons for this code example today is to show a very different style of writing JavaScript. You’ll note that we’re not creating objects, we’re not using prototypes, we’re not using the `new` keyword… in fact we could turn this almost entirely into a series of function calls with very little effort:

```js
window.addEventListener( 'load', ()=>{
  fetch( "http://api.fixer.io/latest?base=USD" )
    .then( data => data.json() )
    .then( jsonData => {
      d3.select( 'body' ).selectAll('div')
        .data( d3.entries( jsonData.rates ) )
        .enter()
  		  .append( 'div' )
        .style( 'background', d => `rgb( ${ Math.round( d.value ) }, 0, 0 )`)
        .style( 'color', 'white' )
        .html( d => d.key + '<br>' + Math.round( d.value) )
    })
})
```

A very different way of coding JS!