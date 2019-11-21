const path = require("path");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");

/* Plugins */

function createHtmlPage() {
  return new HtmlWebpackPlugin({
    filename: name + ".html",
    template: "./src/html/pages/" + name + ".html"
  });
}

function generateHtmlPlugins(templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    // Create new HTMLWebpackPlugin with options
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    });
  });
}

const htmlPlugins = generateHtmlPlugins("../../pug/pages");

const allPlugins = [
  new MiniCssExtractPlugin({
    filename: "style.css"
  }),
  new CleanWebpackPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [autoprefixer()]
    }
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
].concat(htmlPlugins);

module.exports.allPlugins = allPlugins;
