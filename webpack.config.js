// Webpack uses this to work with directories
const path = require('path');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        /**
         * test is a regular expression for file extension
         * which we are going to transform. In our case it's
         * JavaScript files.
         */
        test: /\.js$/,
        /**
         * exclude is a regular expression that tells Webpack
         * which path should be ignored when transforming modules.
         * That means we won't transform imported vendor libraries
         * from npm if we import them in the future.
         */
        exclude: /(node_modules)/,
        /**
         * use is a main rule's option.
         * Here we set the loader which is going to be applied
         * to files that correspond to test regexp
         * (JavaScript files in this case)
         */
        use: {
          loader: 'babel-loader',
          /**
           * options can vary depending on loader.
           * In this case we set default presets for Babel
           * to consider which ES6 features it should transform and which not.
           */
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        // apply rule for .sass, .scss or css files
        test: /\.(sa|sc|c)ss$/,
        /**
         * Set loaders to transform files.
         * Loaders are applying from right to left(!). bottom to top(!)
         * The first loader will be applied after others
         */
        use: [
          {
            // THIRD loader resolves url() and @imports inside CSS
            loader: 'css-loader',
          },
          {
            // SECOND we apply postCSS fixes like autoprefixer and minifying
            loader: 'postcss-loader',
          },
          {
            // FIRST we transform SASS to standard CSS
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },

  /**
   * Default mode for Webpack is production.
   * Depending on mode Webpack will apply different things
   * on final bundle. For now we don't need production's JavaScript
   * minifying and other thing so let's set mode to development
   */
  mode: 'development',
};
