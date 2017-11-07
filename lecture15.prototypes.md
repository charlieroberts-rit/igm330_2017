# IGM-330 Prototypical Delegation
* In languages that use classical inheritance, we often say that an instance “inherits” methods and properties from its superclass. 
* With prototypical delegation in JavaScript, we can instead say that an object *delegates* the calls to particular variables to its prototype object.
* If a method or property isn’t found on object `child`, we then check its object `parent` for the method or property. If it’s not found on `parent`, we then check the `grandparent` object.  But even using terms like `parent` and `child` in this example is a bit problematic, as the prototype of an object can be changed at runtime (discussed later).

# Prototype chain
* First, remember that by using *explicit* binding, we can easily define the execution context for a particular function; this execution context determines the value of the keyword `this`.

```js
const objectPrototype = {
  test() { 
    console.log( 'property:', this.property ) 
  }
}

objectPrototype.test.call({ property:100000 }) // property: 100000
```

* Given the use of `call` above, one description of prototypical inheritance might be:  

> If the JS runtime attempts to retrieve a variable on an object (including functions) and that variable isn’t found, check to see if it exists on the object’s prototype. If it is found on the prototype, return the variable for use. If the variable is a function that is being called, call the function using explicit binding and pass the object as the execution context.

* Below is some pseudocode that simulates what happens when retrieving properties that aren't called functions.

```js
var delegate = function( name, obj ) {
	if( name in this ) {
    return this
  }else{
    let property = undefined
    let prototype = obj.prototype
    while( prototype !== undefined ) {
		if( name in prototype ) {
        property = prototype[ name ]
        break;
      }else{
        prototype = prototype.prototype
      }
    }

    return property
  }
}

var beginningOfChain = { test:1000 }
var middleOfChain = { prototype:beginningOfChain }
var endOfChain = { prototype:middleOfChain }

delegate( 'test', child ) // 1000
middleOfChain.test = -1000
delegate( 'test', child ) // -1000
console.log( beginningOfChain ) // 1000
```

## Shadowing
* What happens if we add a `test` property to our `middleOfChain` object, and re-execute our call to `delegate`?
	* In this case, the `test` property of `middleOfChain` is said to *shadow* the `test` property of `beginningOfChain`.
	* While we navigate our prototype chain, `test` is found on `middleOfChain` first, so that is the value that will be returned. The value on `beginningOfChain` will never be reached.
* This can lead to some weird edge cases, see [ You-Dont-Know-JS/ch5.md at master · getify/You-Dont-Know-JS · GitHub](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch5.md) for more details, but generally works the way you’d expect.

# Evilly using prototype to kinda simulate classical inheritance
* We can use the `new` keyword in front of a function to create an execution context with a particular prototype chain. Perhaps somewhat confusingly, the `prototype` property of the function we call as a constructor is used to define the prototype of our new object… *it does not define the prototype of the constructor function itself*.

```js
var MyClass = function() {
	this.number = Math.random() // store a unique random number
}
MyClass.prototype.myVariable = 42

var a = new MyClass()
var b = new MyClass()

console.log( a.number === b.number, a.myVariable === b.myVariable ) // false, true
```

* Every function that can serve as a constructor gets its own prototype object. There are some functions in JS have pre-defined purposes and cannot be used in this way… for example, the functions included in the `Math` object (like `Math.random`) . Arrow functions are not provided with prototype objects either; in fact, arrow functions *are not allowed to be called in conjunction with the `new` keyword*.

* So how do we simulate classical inheritance? By using `.call()` and explicitly binding an when calling a constructor, instead of calling the constructor with `new` in front of it.

```js
var SuperClass = function() {
  this.superProperty = true
}

var SubClass = function() {
  SuperClass.call( this )
  this.instanceProperty = true
}

var instance = new SubClass()
```

# Object.create()
* We’ve looked at Object.create() before. What does it give us?
	* It enables us to define a prototype for the object we create When we attempt to access variables on our new object, if they aren’t found the prototype chain will be traversed to try and find them.

```js
var proto = { aVariable:1 }
var anObject = Object.create( proto ) // pass in a prototype to use
console.log( anObject.aVariable ) // 1
```

* Simple, right?

# Delegation
Here’s a simple example of using *delegation* instead of inheritance. We’re going to create  an object, `Processor` that will process data, and use it as a prototype so we can delegate processing to it.

```js
var Processor = {
  process() {
    this.data = this.data.toLowerCase()
    return this.data
  } 
}

var data1 = Object.create( Processor )
data1.data = 'THIS IS A TEST'

var data2 = Object.create( Processor )
data2.data = 'THIS IS ANOTHER TEST'

console.log( data1.process() )
console.log( data2.process() )
``` 

One benefit of this approach is that we can use `Processor.process()` with explicit binding… we don’t necessarily even need `Processor` to be a prototype of our data objects.

```js
var data3 = { data: 'ONE FINAL TEST' }
console.log( Processor.process.call( data3 ) )
```

This enables to use methods of our `Processor` object in a lightweight fashion with any data we see fit. However, as our `Processor` gets more complex, it might make sense to use it as a prototype just for purposes of simplifying calls to the API; e.g. removing all the `.method.call( some object )` syntax.

* One important point about this type of design is that data is typically *not stored on the prototype objects* it’s on the instances instead. However, we can place properties on prototypes to simulate *static* variables found in languages like C++.

```js
var Particle = {
  count:0,
  create() {
    this.count++
    return Object.create( this )
  },
  delete() {
    this.count--
  }
}

var aParticle = Particle.create()
console.log( 'count = ', aParticle.count )
var bParticle = Particle.create()
console.log( 'count = ', bParticle.count )
aParticle.delete()
console.log( 'count = ', aParticle.count )
```

Note in the example above the call to `Object.create( this )`. Because we use implicit binding when we call `Particle.create()` the `this` keyword refers to `Particle`.  So we’re basically saying create a new object and use `Particle` as the prototype.



#igm330 #fall2017 #_330 #javascript #prototypes