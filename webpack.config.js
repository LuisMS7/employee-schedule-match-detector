const path = require("path")
const webpack = require("webpack")

module.exports = {
    mode:"development",
    entry: "./src/app.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/build/"
    },
    devServer: {
        static: __dirname,
        compress: true,
        port: 8080,
        open: true,
        liveReload: true,
        hot: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
}