# IGM-330: browserify and modularizing code
There are a variety of systems for modularizing JS code, and a huge number of libraries have been created over the users for this. The simplest method is to check for the existence of a global object (we’ve used `app` for this previously) and place our code into this object. If it doesn’t exist, create it first. For example:

```js
if( typeof window.app === 'undefined' ) window.app = {}

window.app.mymodule = {
  foo:1,
  bar() { console.log( this.foo ) }
}
```

Using this strategy, we can safely import any number of files via script tags and not have to worry about the order that they’re loaded in, assuming only one of them makes use of `window.onload` to start our app running.

However, this can lead to some spaghetti code. What if one particular module needs to know about the existence of another module so that it can call functions from it? We need some sort of dependency system for this. `browserify` is one such tool for the client.

## Before we get to browserify, what about importing / exporting in node.js?
Node.js conveniently includes a `require` function to include files and a `module.exports` object for exporting objects / functions / values. We looked at this previously in class:

```js
/************ FILE 1: module.js, a module to export **********/

module.exports = function() {
  console.log( 'a function' )
}

/************ FILE 2: importing our module ************/
const demomodule = require( './module.js' )

demomodule() // logs 'a function'
```

Any module can `require` any other module, and node.js will resolve circular dependencies whenever possible.

## Browserify is a module system with the same syntax as node.js, but for the browser
* In order to avoid having to resolve asynchronous dependency loading, browserify flattens all JS files used in a project into a single JS file that can then be imported into a webpage with a single `<script>` tag.
* Browserify also provides browser-compatible versions of many commonly used libraries in node.js, such as its event, buffer, and crypto libraries.
* Let’s try using browserify to create a three.js application. We’ll also import another commonly used library for functional programming.

## Demo w/ Three.js and Browserify
1. First, install browserfiy. `npm install browserify` in your home directory. If you’re not on a lab computer add the `--g` flag to make it a global install.
2. If you’re on a lab computer, we need to make an alias to browserify.:
`alias browserify = ~/node_modules/browserify/bin/cmd.js`
Note that the above command assumes you installed browserify from your home directory.

3. Open GIt Bash. Create a new directory `mkdir mydir` and cd into it.
4. Install three.js via npm. `npm install three --verbose`
5. OK, let’s make our main html file. It will be almost identical to our demo from the ICE lecture, except this time we’ll be including single JS file that browserify will help create for us; last time we also explicitly included three.js in a script tag.

```html
<!doctype html>
<html lang='en'>
  <head>
    <style> body { margin:0 } </style>
    <script src='./bundle.js'></script>
  </head>
  <body></body>
</html>
```

6. Now we need to create our main JavaScript file; let’s name it main.js. In a later step, browserify will compile this into a file named bundle.js that’s included by our HTML file. Again, we’ll use our code from last week, with one key modification:

```js
// import our three.js reference
const THREE = require( 'three' )

const app = {
  init() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,  // FOV 
      window.innerWidth / window.innerHeight, // aspect ratio
      .1,  // near plane
      1000 // far plane
    )
    
    this.camera.position.z = 2
    
	  this.createRenderer()
    this.createLights()
    
    const box = new THREE.BoxGeometry( 1,1,1 )
    const material = new THREE.MeshPhongMaterial({ color:0xffffff })
    this.cube = new THREE.Mesh( box, material )

    this.scene.add( this.cube )
    this.render()
  },
  
  createRenderer() {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
	  document.body.appendChild( this.renderer.domElement )
    this.render = this.render.bind( this )
	},
  
  createLights() {
    this.pointLight = new THREE.PointLight( 0x990000 )
    this.pointLight.position.z = 50
    this.scene.add( this.pointLight )
  },
  
  render() {
    window.requestAnimationFrame( this.render )
    this.cube.rotation.y += .005
    this.cube.rotation.x += .005    
    this.renderer.render( this.scene, this.camera )  
  }
}

window.onload = ()=> app.init()
```

7. If you compare the script above to last week’s three.js code, the only difference is the line at the top of the code, where we import our primary THREE object to use; last week we had a global reference to this object instead. As we’ll see in a moment, our THREE variable Is *not* placed in the global namespace when we require it with browserify this way.
8. Let’s run browserify! We need to identify our main JavaScript file, and then specify what we want our output file to be called: `browserify main.js -o bundle.js`
9. Load up your HTML file… uh-oh, you might have a bug.  Browserify can introduce bugs if you don’t properly identify your character set using a `<meta>` tag. Add the following to the `<head>` of your HTML file:

`<meta charset='utf-8'>`

10. Everything should be running at this point if you load your HTML. Note that if you open up your developer console and type THREE it is undefined… not available in the global namespace.
11. Let’s add another library, one that makes it a bit easier to add post-processing effects to THREE.js. We’ll use this to add a glitching effect to our scene. The postprocessing library doesn’t actually add anything new to three.js, it just makes it easier to access and use some of the post processing objects.
12. In three.js we can add post processing effects using the `EffectComposer` object, which enables us to stack multiple effects over a scene as needed. Each effect is a fragment shader that is run inside of a `RenderPass` object. In order to use the EffectComposer we need to create two RenderPass objects: the first will render our scene (the spinning cube with the light) and the second one will apply our glitch effect.
13. First, install the post-processing library: `npm install postprocessing`
14. Next, add a line of code to our `main.js` script to include the library:
```js
const PP = require( 'postprocessing' )
console.log( PP )
``` 

You’ll notice that the post processing library contains functions to generate a wide variety of post-processing effects.

15. Next  we’ll add a new function, `createEffects`, to our `app` object:
```js
  createEffects() {
    this.composer = new PP.EffectComposer( this.renderer )
    this.renderPass = new PP.RenderPass( this.scene, this.camera )
    this.composer.addPass( this.renderPass )

    this.glitchPass = new PP.GlitchPass()
    this.glitchPass.renderToScreen = true
    this.composer.addPass( this.glitchPass )
  },

```

Note that in addition to the EffectComposer we make two RenderPass objects. The first simply renders our scene with our camera, while the second is our `GlitchPass` object. We set the glitchPass object to `renderToScreen` to let THREE.js know that this pass should be rendered and composited. 

16. Last but not least, add a line of code calling `createEffects` to our `init` method, and re-run browserify:

```js
init() {
	this.scene = new THREE.Scene()
	this.camera = new THREE.PerspectiveCamera()
	
	this.camera.position.z = 2
	
	this.createRenderer()
	this.createLights()
  // add in createEffects!
	this.createEffects()
	
	const box = new THREE.BoxGeometry( 1,1,1 )
	const material = new THREE.MeshPhongMaterial({ color:0xffffff })
	this.cube = new THREE.Mesh( box, material )
	
	this.scene.add( this.cube )
	
	this.render()
},
```

17. OK, you should now have a running glitch effect on your spinning cube. One annoying aspect about browserify that you probably noticed is the need to re-run the browserify command anytime you make changes to your JavaScript. We can fix this by using `watching`, which will automatically re-run browserify for you anytime you change a relevant JS file. 
	1. Install watchify with `npm install watchify`
	2. Create an alias: `alias watchify = ~/node_modules/watchify/bin`
	3. Run watchify: `watchify main.js -o bundle.js -v`

Now whenever the file is changed and browserify is called you’ll see an update message appear in your terminal.
 
#igm-330# #browserify #javascript