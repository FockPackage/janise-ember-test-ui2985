'use strict';

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
    hexRGBA: false
  },
  cssnano: {
    autoprefixer: false,
    core: isProduction,
    discardComments: isProduction,
    mergeIdents: false,
    reduceIdents: false,
    sourcemap: !isProduction
  },
  reporter: {
    clearReportedMessages: true
  }
};

module.exports = {
  name: 'ember-choice-ui',

  isDevelopingAddon() {
    return 'production' !== process.env.EMBER_ENV;
  },

  options: {
    cssModules: {
      plugins: {
        before: [
          require('postcss-import'),
          require('postcss-nesting'),
          require('postcss-extend'),
        ],
        after: [
          require('postcss-fallback'),
          require('postcss-cssnext')(options.cssnext),
          require('rucksack-css')(options.rucksack),
          require('cssnano')(options.cssnano),
          require('postcss-reporter')(options.reporter)
        ]
      }
    },
    nodeAssets: {
      'normalize.css': {
        import: [{path: 'normalize.css', prepend: true}]
      },
      'device.js': {
        import: [{
          path: 'lib/device.min.js',
          using: [{transformation: 'amd', as: 'device'}]
        }]
      },
      sortablejs: {
        import: [{
          path: 'Sortable.min.js',
          using: [{transformation: 'amd', as: 'sortable'}]
        }]
      },
      swiper: {
        srcDir: 'dist',
        import: ['css/swiper.min.css', {
          path: 'js/swiper.min.js',
          sourceMap: 'js/maps/swiper.min.js.map',
          using: [{transformation: 'amd', as: 'swiper'}]
        }]
      }
    }
  }
};
