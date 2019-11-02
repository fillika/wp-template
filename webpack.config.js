const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

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
    filename: "index.html",
    template: "./src/index.html"
  }),
  new MiniCssExtractPlugin({
    filename: "style.css"
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
  entry: "./src/js/bundle.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist")
  },
  devServer: devServer,
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
      new UglifyJsPlugin({ test: /\.js(\?.*)?$/i })
    ]
  },
  plugins: plugins,
  module: modules
};

module.exports = (env, options) => {
  const production = options.mode === "production";

  config.devtool = production ? "source-map" : "eval-sourcemap";
  return config;
};
