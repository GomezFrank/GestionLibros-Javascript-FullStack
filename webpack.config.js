

const path = require('path');
const HtmlWebpackPuglin = require('html-webpack-plugin');
const MiniCssExtractplugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {

    entry: './Frontend/app.js',
    output: {
        path: path.join(__dirname, 'Backend/public'),
        filename: 'js/bundle.js',    
    },
    
    mode: 'production',

    module: {
        rules : [
            {
                test: /\.css/,
                use :[
                    devMode ? 'style-loader': MiniCssExtractplugin.loader,
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPuglin({
            template: './Frontend/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractplugin({
            filename: 'css/bundle.css',
        })
    ],
    devtool: 'source-map'
}