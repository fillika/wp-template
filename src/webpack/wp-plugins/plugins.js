const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/* Plugins */
function createFromPugPage(name) {
  return new HtmlWebpackPlugin({
    filename: name + ".html",
    template: "./src/pug/pages/" + name + ".pug"
  });
}

function createHtmlPage() {
  return new HtmlWebpackPlugin({
    filename: name + ".html",
    template: "./src/html/pages/" + name + ".html"
  });
}

const allPlugins = [
  createFromPugPage("index"),
  createFromPugPage("second"),
  new MiniCssExtractPlugin({
    filename: "style.css"
  }),
  new CleanWebpackPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [autoprefixer()]
    }
  })
];

module.exports.allPlugins = allPlugins;
