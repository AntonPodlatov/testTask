const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/main.js",
  //  devtool: "source-map",
    target: ["web", "es5"],

    output:
        {
            filename: "script.js",
            path: path.resolve(__dirname, "dist"),
        },

    plugins:
        [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({filename: "styles.css"})
        ],

    module:
        {
            rules:
                [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {loader: "babel-loader", options: {presets: ["@babel/preset-env"]}}
                    },
                    {
                        test: /\.css$/,
                        use: [MiniCssExtractPlugin.loader, "css-loader"]
                    },
                    {
                        test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                        type: "asset / resource"
                    }
                ]
        }
};