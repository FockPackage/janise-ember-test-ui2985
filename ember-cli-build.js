const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const isProduction = 'production' === process.env.EMBER_ENV;
const options = {
  cssnext: {
    features: {
      browsers: '> 1%, last 3 versions, Firefox ESR, Opera 12.1, not ie <= 8',
      customProperties: {preserve: 'computed'},
      nesting: false
    }
  },
  rucksack: {
    alias: false,
    hexRGBA: false,
    fallbacks: true
  },
  cssnano: {
    autoprefixer: false,
    core: isProduction,
    discardComments: isProduction,
    mergeIdents: false,
    reduceIdents: false,
    sourcemap: !isProduction
  }
};

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    cssModules: {
      plugins: {
        before: [
          require('postcss-import')({path: 'addon/styles'}),
          require('postcss-nesting'),
          require('postcss-extend'),
        ],
        after: [
          require('postcss-fallback'),
          require('postcss-cssnext')(options.cssnext),
          require('rucksack-css')(options.rucksack),
          require('cssnano')(options.cssnano)
        ]
      }
    },
    nodeAssets: {
      clipboard: {
        import: [{
          path: 'dist/clipboard.js',
          using: [{transformation: 'amd', as: 'clipboard'}]
        }]
      }
    },
    'ember-refined-remarkable': {
      theme: 'atom-one-light'  // change this to your favorite theme’s name
    },
    minifyJS: {
      enabled: false
    },
    faker: {
      enabled: true
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
