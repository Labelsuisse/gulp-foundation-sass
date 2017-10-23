const settings = {
    src: "src_assets",
    dest: "webroot",

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

module.exports  = settings