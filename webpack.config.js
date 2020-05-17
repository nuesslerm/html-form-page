// Webpack uses this to work with directories
const path = require('path');
HtmlWebpackPlugin = require('html-webpack-plugin');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin his work
  // entry: { javascript: './src/index.js', html: './index.html' },
  entry: './src/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    // path: __dirname + '/public',
    path: path.resolve(__dirname, 'public'),
    // filename: '[name].bundle.js',
    filename: 'bundle.js',
    // sourceMapFilename: '[name].[hash:8].map',
    // chunkFilename: '[id].[hash:8].js',
  },

  module: {
    rules: [
      // rule for .html files
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      // rule for .js files
      {
        /**
         * test is a regular expression for file extension
         * which we are going to transform. In our case it's
         * JavaScript files.
         */
        test: /\.(js|jsx)$/,
        /**
         * exclude is a regular expression that tells Webpack
         * which path should be ignored when transforming modules.
         * That means we won't transform imported vendor libraries
         * from npm if we import them in the future.
         */
        exclude: /(node_modules)/,
        include: [path.resolve(__dirname, 'src')],
        /**
         * use is a main rule's option.
         * Here we set the loader which is going to be applied
         * to files that correspond to test regexp
         * (JavaScript files in this case)
         */
        use: [
          {
            loader: 'babel-loader',
            /**
             * options can vary depending on loader.
             * In this case we set default presets for Babel
             * to consider which ES6 features it should transform and which not.
             */
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      // rule for .jsx files
      // {
      //   test: /\.jsx$/,
      //   exclude: /(node_modules)/,
      //   include: [path.resolve(__dirname, 'src')],
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         presets: ['@babel/preset-env', '@babel/preset-react'],
      //       },
      //     },
      //   ],
      // },
      // rule for image assets
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            // using file-loader for these files
            loader: 'file-loader',

            /**
             * In options we can set different things like format
             * and directory to save
             */
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      // rule for fonts files
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            // using file-loader too
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],

  /**
   * Default mode for Webpack is production.
   * Depending on mode Webpack will apply different things
   * on final bundle. For now we don't need production's JavaScript
   * minifying and other thing so let's set mode to development
   */
  mode: 'development',
  // which port will the application be loaded when starting webpack?
  devServer: {
    port: 8000,
    // contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    inline: true,
  },
};
