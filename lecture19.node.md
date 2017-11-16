# IGM 330 - Using Node.js
## What is Node?
* http://nodejs.org
* Removes browser-based restrictions from JavaScript
* Node can:
	* Freely access the filesystem on the computer running it
	* Access custom modules with C++ bindings
	* Compiles JavaScript to native assembly via V8 (a JS engine by Chrome)
	* Use Full thread / hardware access
	* Run cross-platform

## Why Node?
* Use the same language for both client and server
	* This means some people get to hate JS twice as much
	* For everyone else, there are nice wins to this.
		* Use the same libraries	for the client and the server. Pretentious JS developers call libraries designed to run in both places “isomorphic”.
		* Remove some of the cognitive burdens associated with switching languages during the development process.

## What are the alternatives for writing servers?
* Python, Perl,  Ruby most common
* But you could use any language (Lua, Haskell, Go, Scala, Java,  Clojure, C, C++, C# etc)

## Native Apps
* Lots of native apps combine a Web View (a window displaying HTML/CSS/JS content) with a Node.js backend. Examples include Slack, Atom, Visual Studio Code, Brackets, Github Desktop etc.
* Electron is one toolchain for building these types of apps; Node webkit is another.

## Hello world
Create a file with the following text and save it as `app.js`:

`console.log( ‘hello world’ )`

Now run this file from the terminal (Git Bash in the labs) with:

`node app.js`

## Importing and using modules in Node
* Node uses a standard called *commonJS* for importing and exporting data from files. commonJS can also be used in client-side JavaScript via projects like browserify.
	* note that commonJS includes are different from ES6 `import` and `export` commands. Sigh.
* A file exports a variable, array, function, or object by assigning it to the `module.exports` global keyword.
* A file imports a variable, array, function, or object by requesting it using `require( ‘myModuleName.js’ )`

* For example, create a file named `mymodule.js` with the following code:

```js
const add = function( ...args ) { 
  let sum = 0
  args.forEach( v => sum += v )
  return sum
}

module.exports = add
```

* Now open up our earlier `app.js` file and change it to the following:

```js
const add = require( './mymodule.js' )
console.log( add( 4,5,6,7,8,9,10 ) )
```

Note that it is important to include a *relative or absolute path* when requiring JavaScript files, and you must give the file extension. If you fail to do either of these, Node will assume you are looking for a module installed via NPM, which we used last week to install Babel and Uglify.

## Building a web “server”
* To build a web server, we can use the `http` module that is included in all Node.js distributions. When we respond to server requests, we need to write a header giving an HTTP status code ( https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) and a MIME type.

```js
// by not giving a relative or absolute path, tell Node to use a NPM package
const http = require( 'http' )

// create a server function to respond to incoming requests
const server = function( request, response ) {
  // write a header for our response
  response.writeHead( 200, { Content: 'text/plain' } )

  // write the body
  response.write( 'here is some text!' )

  // end the response
  response.end()
}

// tell our http module to use our server function on a particular port
http.createServer( server ).listen( 10000 )

// now visit http://127.0.0.1:1000 in your web browser
```

## Serving up a HTML page
This is not so different from our previous example. The main difference is that we need to read in a html file first.

```js
// load in the filesystem, or 'fs' module
const fs   = require( 'fs' )
const http = require( 'http' )

// create a simple index.html page in the same directory as
// this server for loading. Pass the path to this file 
// and the type of information for Node.js to expect inside
// of it.
const index = fs.readFileSync( './index.html', ['utf-8'] )

// create a server function to respond to incoming requests
const server = function( request, response ) {
  // write a header for our response, change MIME type from
  // our previous example to 'text/html'
  response.writeHead( 200, { Content: 'text/html' } )

  // write the body
  response.write( index )

  // end the response
  response.end()
}

// tell our http module to use our server function on a particular port
http.createServer( server ).listen( 10000 )

// now visit http://127.0.0.1:10000 in your web browser
```

## A slightly more complex example
We can use the `request.url` property to serve different resources depending on what is requested. Create a second html file for loading (named index2.html) and try the following:

```js
// load in the filesystem, or 'fs' module
const fs   = require( 'fs' )
const http = require( 'http' )

// load two html files
const index  = fs.readFileSync( './index.html', ['utf-8'] )
const index2 = fs.readFileSync( './index2.html', ['utf-8'] )

// create a server function to respond to incoming requests
const server = function( request, response ) {
  // write a header for our response, change MIME type from
  // our previous example to 'text/html'
  response.writeHead( 200, { Content: 'text/html' } )

  // write the body
  switch( request.url ) {
    case '/index.html':  response.write( index );  break;
    case '/index2.html': response.write( index2 ); break;
  }
  // end the response
  response.end()
}

// tell our http module to use our server function on a particular port
http.createServer( server ).listen( 10000 )

// now visit http://127.0.0.1:10000 in your web browser
```

## You don’t have to write all of this stuff yourself
There are lots of great libraries making it easy to write servers in Node.js. A couple I’d recommend:

	* Express (what I use for Gibber) - http://expressjs.com
	* Koa - http://koajs.com

## The point
* There’s nothing magical about a web server; it’s just a simple program that runs on any computer and serves up files / speaks with databases.
* You can write servers in JS! One language to rule them all.
* Although originally primarily geared towards web servers, Node.js is a pretty powerful platform that can be use to create all kinds of native applications; you’re probably already using a couple of them.