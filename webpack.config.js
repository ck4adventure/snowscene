var path = require("path");
// var webpack = require("webpack");


// var plugins = []; // if using any plugins for both dev and production
// var devPlugins = []; // if using any plugins for development
//
// var prodPlugins = [
//   new webpack.DefinePlugin({
//     'process.env': {
//       'NODE_ENV': JSON.stringify('production')
//     }
//   }),
//   new webpack.optimize.UglifyJsPlugin({
//     compress: {
//       warnings: true
//     }
//   })
// ];
//
// plugins = plugins.concat(
//   process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins
// );


module.exports = {
  context: __dirname,
  entry: "./js/app.js",
  output: {
    path: path.join(__dirname, 'js'),
    filename: "bundle.js"
  },

  resolve: {
    extensions: ["*", ".js", ".jsx" ]
  },
  devtool: 'source-map'
};

// plugins: plugins,
// module: {
//   loaders: [
//     {
//       test: [/\.jsx?$/, /\.js?$/],
//       exclude: /(node_modules|bower_components)/,
//       loader: 'babel-loader',
//       query: {
//         presets: ['es2015', 'react']
//       }
//     }
//   ]
// },
// devtool: 'source-map',
