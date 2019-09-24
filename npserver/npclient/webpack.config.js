const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    entry:  __dirname + '/src/index.js',
    devtool: "source-map",
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                loader: "babel-loader",
                test: /\.jsx?/,
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/react', '@babel/preset-env'], //'@babel/preset-es2015', 'stage-0',]
                    plugins: ['@babel/plugin-proposal-class-properties', "@babel/plugin-transform-runtime"]
                }
            },
            {
                  test: /\.css$/,
		    // exclude: /node_modules/,
                  use: [MiniCssExtractPlugin.loader, 'css-loader'],
             }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
};
module.exports = config;
