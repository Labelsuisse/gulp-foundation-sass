
The package include : 
* jQuery
* What-input
* foundation-sites
* sass-material-colors
* lodash

## Installation

```sh
$ git clone git@github.com:Labelsuisse/gulp-starter-kit.git ./

$ npm install

```

## Config paths
in gulp-settings.js file

```javascript
const settings = {
    // source files path
    src: "src_assets", 

    // destination files path
    dest: "webroot",

    // Assets to copy
    assets: {
        js: [
            './node_modules/foundation-sites/dist/js/foundation.js',
            './node_modules/foundation-sites/dist/js/foundation.min.js',
            './node_modules/jquery/dist/jquery.js',
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/what-input/dist/what-input.min.js',
            './node_modules/what-input/dist/what-input.js',
            './node_modules/lodash/lodash.js',
            './node_modules/lodash/lodash.min.js'
        ],
        css: [
            //'./node_modules/normalize.css/normalize.css'
        ]
    }

}
```

## Run commands

### Initialize files

```sh
$ gulp init
```

### Wath files
```sh
$ gulp default
```


### Minify files
```sh
$ gulp minify
```