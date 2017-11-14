# IGM-330 Babel / ES2015 / Uglify transforms
## Babel
1. Install the Babel-Cli module from your home directory in Git Bash using NPM. NPM is the package manager for node.js and is installed on all the lab computers. You can get an idea of the modules available to install by going to `http://npmjs.com`

`npm install babel-cli --verbose`

You’ll note there is now a `node_modules` directory inside of your home directory. If you look in that, you’ll find a `babel-cli` folder that contains the module we want to use. 

2. Next we want to make an `alias` to the `babel-cli`application that was installed, so that we can invoke it from any directory on our computer. Normally we do that with the `-g` (global) flag passed to NPM, but the permissions on the lab computers don’t allow us to globally install NPM modules. We can make an alias with:

`alias babel=~/node_modules/babel-cli/bin/babel.js`

3. Now try just typing `babel`, you’ll note that an endless process starts. This is because Babel doesn’t know what to compile or how to compile it. We’ll set that up with a configuration file.

4. Create a new directory named `myproject`. Create a single file named `index.js` in this folder and put the following simple ES2015 JS in there.

```js
const mystring = `this is a test of arrow functions
and multiline
strings.`

const arrowTest = ()=> {
  console.log( mystring )
}

arrowTest()
```

5. Now we have something to compile… next thing is how we should compile it. Babel has a preset named `env` that lets you define what specific browser you want to target with the javascript compilation. Make sure you’re in your project directory, and install it with:

`npm install babel-preset-env --verbose`

6. OK, one last step before we compile! We need to make a configuration file for Babel, that will tell it which preset we want to use. Name this file `.babelrc` and fill it with the following JSON object:

```js
{
  "presets": ["env"]
}
```

7. Now we’re ready! Run babel with the following from within your project directory:
`babel index.js`

You should see the compiled JavaScript printed to your terminal output.

8. Next let’s specify an output file with the `-o` flag so we can tell the terminal where we want our compiled JS to go:

`babel index.js -o index.compiled.js`

We can simply include `index.compiled.js` in our browser using a `<script>` tag.  Practically speaking, compiling via Babel is probably the last task you want to do before uploading your project to the web.

9. Last but not least, let’s try setting up our `.babelrc` file so we can use Babel to specifically target all the way back to IE 8. 

```js
{
  "presets": [
    ["env", {
      "targets": {
        "ie": 8
      }
    }]
  ]
}
```

Every else is run the same. For more info on the options for the `env` preset, see https://babeljs.io/docs/plugins/preset-env/

## Uglify
By using uglify we can get minified JavaScript files. As we’ll see shortly, sometimes this can result in big reductions in file size. Many of the steps to install/use uglify are similar to the ones we used with Babel.

1. Using Git Bash, from your home directory, install uglify:
`npm install uglify-js —verbose`

2. Create an alias for uglify:
`alias uglify=~/node_modules/uglify-js/bin/uglifyjs`

3. Uglify won’t work on our ES2015 code, so we need to run it on the compiled code we created with Babel:
`uglify index.compiled.js`

4. We see automatically that uglify has cut out as much whitespace as possible. But it can actually do more if we give it a little help. Right now, all of our code is being created in the global namespace… Babel tries to preserve global data so that other scripts have access to it. What happens if we limit the scope of the program using an IIFE? Change our `index.js` file to the following:

```js
!function() {
	const mystring = `this is a test of arrow functions
	and multiline
	strings.`
	
	const arrowTest = ()=> {
	  console.log( mystring )
	}
	
	arrowTest()
}()
```

5. Now recompile `index.js` to `index.compiled.js` using Babel, as per earlier in the exercise.
`babel index.js -o index.compiled.js`

6. And now uglify… what happens to the resulting source code?  Adding the `-m` flag turns on the “mangle” option, which shortens variable names as much as possible (assuming they’re not global variables).
`uglify index.compiled.js -m`

7. Let’s see what happens if we tell uglify to be a bit more aggressive about compression. We can do this with the `-c` flag. We’ll also use the `-o` flag to specify an output file.
`uglify index.compiled.js -c -o index.compiled.min.js`

What’s the resulting output look like?

8. Zip up your `index.js`, your `index.compiled.js` and your `index.compiled.min.js`  files and turn the .zip into the dropbox for this ICE.


#igm-330# #babel# #node #npm