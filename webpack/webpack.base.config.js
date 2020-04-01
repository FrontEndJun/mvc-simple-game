const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  assets: "assets/"
};

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: PATHS.src,
  output: {
    filename: `${PATHS.assets}[name].js`,
    path: PATHS.dist
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: `${PATHS.assets}img/[name].[ext]`
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: `[name].[ext]`,
            outputPath: `${PATHS.assets}fonts/`
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          miniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "./postcss.config.js" }
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: `${PATHS.assets}css/main.css`
    }),
    new copyWebpackPlugin([
      {
        from: `${PATHS.src}/assets/images`,
        to: `${PATHS.assets}images/`
      }
    ]),
    new htmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: "./index.html"
    })
  ]
};
