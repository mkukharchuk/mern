// var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

module.exports = {
  // entry: "./client/index.js",
  // output: {
  //     path: __dirname + '/public/build/',
  //     publicPath: "build/",
  //     filename: "bundle.js"
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /public/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [htmlPlugin],
};
