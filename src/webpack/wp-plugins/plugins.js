const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/* Plugins */
function createPage(name) {
  return new HtmlWebpackPlugin({
    filename: name + ".html",
    template: "./src/pug/pages/" + name + ".pug"
  });
}

const allPlugins = [
	createPage("index"),
	createPage("second"),
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
