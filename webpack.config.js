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
const less = {
  test: /\.less$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    "css-loader",
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
  exclude: [/fonts/],
  loader: "file-loader",
  options: {
    name: "img/[name].[ext]"
  }
};

const imgResize = {
  test: /\.(png|jpg|jpeg|svg|gif)$/i,
  use: [
    "file-loader?name=[name].[ext]",
    {
      loader: "image-webpack-loader",
      options: {
        bypassOnDebug: true,
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: true
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4
        },
        gifsicle: {
          interlaced: false
        }
      }
    }
  ]
};

const modules = {
  rules: [css, js, less, scss, imgResize]
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
  plugins: plugins,
  module: modules
};

module.exports = (env, options) => {
  const production = options.mode === "production";

  config.devtool = production ? "source-map" : "eval-sourcemap";
  return config;
};
