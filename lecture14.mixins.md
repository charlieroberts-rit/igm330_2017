# IGM-330 - Classes and Mixins
Fun JS example: [GitHub - veu/mini-tetris: Tetris in 512b](https://github.com/veu/mini-tetris)
* 507 bytes (!!!)
* Uses *gulp*, a JavaScript build system, to compile JavaScript into a minimal HTML file. 

Calendar check: what’s coming up?

* Project #1 due on Thursday, October 19th
* Study Guide for Midterm due on Tuesday, October 24th
	* we’ll review that day
* MIDTERM ON THURSDAY, October 26th

## Classes and Mixins
* Languages like C++ and C# featuring classical inheritance *copy* properties and methods of classes into instances.
* JavaScript has no formal method of doing this, but there are lots of hacks for creating similar behaviors.

### What’s the problem with classes?

* Creating detailed ontologies is often brittle… what happens when you create a new class that doesn’t fit into the existing ontology? Do you have to start from scratch?
* By promoting “composition over inheritance” we can add behaviors to objects as needed without enforcing a rigid hierarchy of classes.

### How do we make a mixin?
* Using Object.assign() is the simplest way.

```js
var drivable = {
	drive() { console.log( 'driving!' ) }
} 

var motorcyle = Object.assign( {type:'motorcyle'}, drivable )
var car = Object.assign( {type:'car'}, drivable )
```

* IMPORTANT:  Object.assign() creates a “shallow” copy of drivable; each mixin refers to the same `drive()` function, rather than having their own “copy” of the function. Objects, arrays, and functions (remember that arrays and functions are basically just regular objects in JS) are always passed *by reference* in JavaScript. For example:

```js
var drivable = {
  pos: { x: 0, y: 0 },
	drive() { 
    this.pos.x += 1
    this.pos.y += 1
    console.log(`driving! x=${this.pos.x}, y=${this.pos.y} ) 
  }
} 

var motorcyle = Object.assign( {type:'motorcyle'}, drivable )
var car = Object.assign( {type:'car'}, drivable )
motorcyle.drive() // driving! x = 1, y = 1
car.drive() // driving! x = 2, y = 2
```

* Note that both the `car` and `motorcycle` objects will always update to the same positions!
* How can we fix this? We can add an initialization method to our mixin that will create a unique `pos` variable on any object that calls it.

```js
var drivable = {
	init() {
	  this.pos = { x:0, y:0 }
	},
	drive() { 
    this.pos.x += 1
    this.pos.y += 1
    console.log(`driving! x=${this.pos.x}, y=${this.pos.y} ) 
  }
} 

var motorcycle = Object.assign({type:'motorcyle'}, drivable )
motorcycle.init()

var car = Object.assign( {type:'car'}, drivable )
car.init()

motorcycle.drive() // driving! x = 1, y = 1
car.drive() // driving! x = 1, y = 1
```

* Note that we can modify the code above very easily to use `Object.create()` and prototypical inheritance:

```js
var drivable = {
	init() {
	  this.pos = { x:0, y:0 }
	},
	drive() { 
    this.pos.x += 1
    this.pos.y += 1
    console.log(`driving! x=${this.pos.x}, y=${this.pos.y} ) 
  }
} 

var motorcycle = Object.create( drivable )
motorcycle.type = 'motorcyle'
motorcycle.init()

var car = Object.create( drivable )
car.type = 'car'
car.init()

motorcycle.drive() // driving! x = 1, y = 1
car.drive() // driving! x = 1, y = 1
```

* There is a very slight difference in semantics. With mixins, our `car` and `motorcycle` objects have `init()` and `drive()`  function properties that we are calling; these properties just happen to point to functions on a different object. With `Object.create()` and prototypes, the JS engine looks at our `car` and  `motorcycle` objects, sees that the don’t have `drive` and `init` functions, and then checks their prototype to see if the functions are found there, at which point they are called.