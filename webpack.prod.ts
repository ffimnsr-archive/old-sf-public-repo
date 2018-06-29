import webpack from "webpack";
import merge from "webpack-merge";
import UglifyJSWebpackPlugin from "uglifyjs-webpack-plugin";
import common from "./webpack.common";

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new UglifyJSWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      })
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      SF_API_BASE_URL: "https://staging.smartfunding.io/backend",
    }),
  ],
});
