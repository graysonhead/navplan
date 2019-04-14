const webpack = require('webpack');
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
                  use: ['css-loader'],
             }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
};
module.exports = config;
