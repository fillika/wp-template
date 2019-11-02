const path = require("path");
const webpack = require("webpack");
const $ = require("jquery");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/* Modules */
const css = {
  test: /\.css$/, // test - проверка на расширение.
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    "css-loader"
  ]
};

const modules = {
  rules: [css]
};

const plugins = [
  new HtmlWebpackPlugin({
    template: "src/index.html"
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css"
  }),
  new CleanWebpackPlugin()
];

const config = {
  entry: "./src/js/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist/js")
  },
  plugins: plugins,
  module: modules
};

module.exports = config;
