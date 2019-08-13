/* eslint-disable no-undef */

const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `http://91.219.137.48:8080/`,
    host: `91.219.137.48`,
    port: 8080,
    compress: true,
    watchContentBase: true
  }
};
