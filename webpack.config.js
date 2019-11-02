const path = require("path");

const config = {
  entry: "./src/js/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist/js")
  }
};

module.exports = config;
