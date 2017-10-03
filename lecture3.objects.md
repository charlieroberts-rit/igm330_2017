# Objects

## What is an object in JavaScript

- Collection of key/value pairs

- We can use the typeof operator to see this
  - go through various types, including arrays and objects
    - An array is an object! indices are simply keys.
    - create an array as an object to show
    - mention using Array.isArray to determine array type
  
- Well, why does string.length work if it's not an object?
  - type coercion
    - literals are wrapped in objects with appropriate methods
    - there are small associated memory / computational costs
      - avoid in things like particle loops!

- other common type coercions
  "test" + 10 // number is coerced into string
  
- why do we use objects in JS?
  - encapsulation and organization, group related functions / state together

      
## How do we make an object in JS

- equivalent: a = {}; a = new Object();
  - no good reason to use new Object()
  
- defining keys for objects
  a = {}
  a.foo = 'bar'
  a.baz = 'foo'
  
  can also be
  
  a = { foo:'bar', baz:'foo' }
  
- can also use [] as "member" operator
  - this lets you use arbitrary keys

## Adding methods

- can point to a named function
test = function() { console.log('test') }

- can also use anonymous functions (show example)

- show with "this" keyword

## A brief introduction to inheritance
  - Object.create()
  a = {}
  a.__proto__
  
# Canvas

- make canvas
- rotate / transform / translate / square
- push / pop
- show l-systems

