# IGM-330: Three.js lecture

Another use for babel: http://charlie-roberts.com/genish/jsdsp.html

## three.js
Three.js: http://threejs.org

We can install via npm, or we can use a *content delivery network* to grab the file.

https://cdnjs.cloudflare.com/ajax/libs/three.js/88/three.min.js

Getting started with an html file:

```html
<!doctype html>
<html lang='en'>
  <head>
    <style> body { margin:0 } </style>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/88/three.min.js'></script>
    <script src='./main.js'></script>
  </head>
  <body></body>
</html>

```

If you load the .html page above and open your browser’s developer console, you’ll notice that the object `THREE` has been placed in the global namespace (the `window` object).

Next we’ll make our `main.js` file, which will contain all of our THREE.js code. To create a THREE.js setup we need:

• A `renderer` that will render our graphics to the screen. We’ll use the `WebGL` renderer, but for old browsers you could instead use a 2D canvas that emulates 3D.
• A `scene` that contains a light(s), and geometry(s). 
• A `camera` that looks at our scene

Let’s make all of these objects members of a global `app` object. We’ll assign our app’s `init()` method to `window.onload`.

```js
const app = {
  init() {
    // pretty simple...
    this.scene = new THREE.Scene()

    // camera is a bit more involved...
    this.camera = new THREE.PerspectiveCamera(
      75,  // FOV 
      window.innerWidth / window.innerHeight, // aspect ratio
      .1,  // near plane
      1000 // far plane
    )
    
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )

    // take the THREE.js canvas element and append it to our page
	  document.body.appendChild( this.renderer.domElement )

    // render a blank scene
    this.renderer.render( this.scene, this.camera )
  }
}

window.onload = ()=> app.init()
// could also be: window.onload = app.bind( app )
```

If you reload your html page now you should get a blank black screen. This is because our THREE.js screen doesn’t have lights or geometries. Let’s refactor our code a bit by moving our renderer code into its own method and also adding an ambient light:

```js
window.app = {
  init() {
    // pretty simple...
    this.scene = new THREE.Scene()

    // camera is a bit more involved...
    this.camera = new THREE.PerspectiveCamera(
      75,  // FOV 
      window.innerWidth / window.innerHeight, // aspect ratio
      .1,  // near plane
      1000 // far plane
    )
    
    // move camera back
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

    // take the THREE.js canvas element and append it to our page
	  document.body.appendChild( this.renderer.domElement )
    
    this.render = this.render.bind( this )
	},
  
  createLights() {
    //this.ambient = new THREE.AmbientLight( 0x404040, .15 )
    //this.scene.add( this.ambient )
    
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

window.onload = ()=> window.app.init()
// could also be: window.onload = app.bind( app )
```



#igm-330# #three.js#