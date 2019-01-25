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
                    presets: ['@babel/react'] //'@babel/preset-es2015', 'stage-0',]
                }
            },
            {
                  test: /\.css$/,
                  exclude: /node_modules/,
                  loaders: ['style-loader', 'css-loader'],
             }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
};
module.exports = config;
