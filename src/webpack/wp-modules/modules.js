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

module.exports = () => {
  return {
    rules: [css, js, less, scss, imgLoader]
  };
};
