import webpack from "webpack";
import path from "path";
import merge from "webpack-merge";
import common from "./webpack.common";

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        port: 4444,
        index: "index.html"
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: "development",
        }),
    ],
});
