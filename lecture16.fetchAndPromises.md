# IGM 330 - XHR, Fetch, and Promises
* discuss Michael Gurevich talk, show videos
* ICE Coding Challenge

## Fetch API
The Fetch API enables us to load JSON data. Remember, last class we looked at loading data as follows:

```js
var xhr = new XMLHttpRequest()
xhr.addEventListener("load", () => {
  var loadedData = JSON.parse(xhr.responseText)
  displayData(loadedData)
})
xhr.open("GET", "http://api.fixer.io/latest?base=USD")
xhr.send()
```

With the Fetch API, we can change the above code to the following:

```js
fetch( "http://api.fixer.io/latest?base=USD" ).then( result => {
	return result.json()
}).then( parsedJSON => {
  console.log( parsedJSON )
})
```

That’s a lot cleaner! But what is happening?

* `fetch()` returns a JavaScript `Promise` object. This object represents a contract stating that *when* a particular action is finished *then* another action will be carried out. 
	* In this case the *when* is loading a piece of data from a remote server. After the data is loaded, the function we pass to *then* is carried out.
* calling `result.json()` creates *another Promise*; this promise is subsequently resolved in the next call to `then()` with the parsed JSON data. 
* `result` represents a `Results` object that can be parsed into a variety of different data formats… JSON, image blobs etc.

Fetch *is not found in IE 11*. https://caniuse.com/#search=fetch
But there’s a polyfill! https://github.com/github/fetch

## So when do we use JS Promises?
* not in IE 11: https://caniuse.com/#search=promises
• Anytime we want to avoid a series of nested callbacks. 
	• In the example above, first we need a callback for fetching the data, and then we need a callback for parsing the JSON.
		• Although `JSON.parse()` is synchronous, for really large files this can be a big problem, as it could block the main thread for many seconds.

### What does a Promise actually look like?

```js
// make a promise that waits five seconds and then resolves
var p = new Promise( (resolve, reject) => {
  window.setTimeout( ()=> resolve('hooray'), 5000 )
}).then( result => {
  console.log( resolve )
})
```

* Promises can either *resolve* successfully (at which point the function passed to `then()` is called or *reject* unsuccessfully, at which point any function you pass to `catch()` will be called.

```js
// make a promise that randomly resolves or rejects
var p = new Promise( (resolve, reject) => {
  if( Math.random() > .5 ) {
    resolve( 'success!' )
  }else{
    reject( 'failure!' )
  }
}).then( result => {
  console.log( result )
}).catch( error ) {
  console.log( error )
}
```

## What if we want to load lots of data, and know when they’re all finished?
We can use `Promise.all()` to run a bunch of promises, and only call `.then()`when all the argument promises have been completed.

```js
// example using setTimeout
oneSecond = new Promise( (resolve,reject) => {
  setTimeout( ()=> { console.log('one second'); resolve( 1 ); }, 1000 )
})
threeSeconds = new Promise( (resolve,reject) => {
  setTimeout( ()=> { console.log('three seconds'); resolve( 3 ); }, 3000 )
})
fiveSeconds = new Promise( (resolve,reject) => {
  setTimeout( ()=> { console.log('five seconds'); resolve( 5 ); }, 5000 )
})

Promise.all( [oneSecond,threeSeconds,fiveSeconds] ).then( results => {
	console.log( 'all done!', results )
})
```

Important notes:
* We pass an array of promises to `Promise.all`
* In the above example, each `setTimeout` clock starts as soon as we create our Promises… they *do not* wait until `Promise.all` is called.
* The data we pass to our `resolve()` functions is aggregated into an array, which is subsequently passed to whatever function give as an argument to  `then()`

### OK, back to loading lots of datasets at once
* We first need to load all of our data, and we then need to parse the JSON of all our data. 
* This means we need two calls to `Promise.all()`. Our first call will download all of our data. Once that is completed, our second call will parse all the data as JSON, and then return all the results in an array.
* Remember that `fetch` (which is a global variable in the window namespace)  returns a promise!

```js
const USD = fetch( "http://api.fixer.io/latest?base=USD" )
const AUD = fetch( "http://api.fixer.io/latest?base=AUD" )
const GBP = fetch( "http://api.fixer.io/latest?base=GBP" )

// wait till we have all our data, then parse it all
Promise.all( [ USD, AUD, GBP ]).then( jsonArray => {
  console.log( 'data downloaded' )

  const parsingPromises = jsonArray.map( v => v.json() )
	Promise.all( parsingPromises ).then( parsed => {
    console.log( 'parsed json', parsed )
  })
})
```

* Again, pretty clean, right? Think about how tricky this would be to setup with XMLHttpRequests… in the callback for each request we’d have to check and see if the callback had completed, and then, if so, carry out our final function. It would be much harder to read the final code and reason about it.
* We can use *map* to execute a function on each item in an array and return the results as an array. For example:

```js
[ 1,2,3 ].map( v => v * 2 ) // returns [ 2,4,6 ]
```
 
In the Promises example above, we’re using `.map()` to return all the promises generated by our calls to `.json()`.

#fetch #javascript #fall2017 #igm330