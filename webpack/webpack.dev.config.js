const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWPConf = require("./webpack.base.config");
const devWPConf = merge(baseWPConf, {
  mode: "development",
  output: {
    publicPath: "/"
  },
  devServer: {
    overlay: true,
    contentBase: baseWPConf.externals.paths.dist,
    disableHostCheck: true
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWPConf);
});
