const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const allPlugins = require("./src/webpack/wp-plugins/plugins");

/* Modules */
const css = {
  test: /\.css$/, // test - проверка на расширение.
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    "css-loader",
    "postcss-loader"
  ]
};
const less = {
  test: /\.less$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    "css-loader",
    "postcss-loader",
    "less-loader"
  ]
};
const scss = {
  test: /\.s[ac]ss$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    "css-loader",
    "postcss-loader",
    "sass-loader"
  ]
};
const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader"
};
const imgLoader = {
  test: /\.(png|jpg|jpeg|svg|gif)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "img"
      }
    },
    {
      loader: "image-webpack-loader",
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 8
        },
        gifsicle: {
          interlaced: false
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    }
  ]
};
const pug = {
  test: /\.pug$/,
  exclude: /node_modules/,
  loader: "pug-loader"
};

const modules = {
  rules: [css, js, less, scss, imgLoader, pug]
};

/* devServer */

const devServer = {
  open: true,
  port: 8000,
  overlay: true
};

/* optimization */

const optimization = {
  minimizer: [
    new OptimizeCssAssetsPlugin({}),
    new UglifyJsPlugin({ test: /\.js(\?.*)?$/i })
  ]
};

/* main config */

const config = {
  entry: "./src/js/bundle.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist")
  },
  devServer: devServer,
  optimization: optimization,
  plugins: allPlugins.allPlugins,
  module: modules
};

module.exports = (env, options) => {
  const production = options.mode === "production";

  config.devtool = production ? "source-map" : "eval-sourcemap";
  return config;
};
