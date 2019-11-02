const path = require("path");
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
const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader"
};

const modules = {
  rules: [css, js]
};

/* Plugins */

const plugins = [
  new HtmlWebpackPlugin({
    template: "src/index.html"
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css"
  }),
  new CleanWebpackPlugin()
];

/* devServer */

const devServer = {
  open: true,
  port: 8000,
  overlay: true
};

const config = {
  entry: "./src/js/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist")
  },
  devServer: devServer,
  plugins: plugins,
  module: modules
};

module.exports = (env, options) => {
  const production = options.mode === "production";

  config.devtool = production ? "source-map" : "eval-sourcemap";
  return config;
};
