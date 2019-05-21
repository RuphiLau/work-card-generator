const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')
const { resolve, outputDir } = require('./utils')

module.exports = {
    entry: resolve('./src/index.tsx'),
    output: {
        path: resolve('./dist')
    },
    resolve: {
        alias: {
            '@': resolve('./src'),
            '@assets': resolve('./src/assets'),
            '@less': resolve('./src/assets/less'),
            '@comp': resolve('./src/components')
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        mainFiles: ['index']
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                include: resolve('./src'),
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        useCache: true
                    }
                }]
            },
            {
                test: /\.jsx?/,
                include: resolve('./src'),
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(otf|eot|svg|ttf|woff)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'fonts/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: outputDir('./dll/manifest.json')
        }),
        new HtmlWebpackPlugin({
            filename: outputDir('./index.html'),
            template: resolve('./src/index.html')
        }),
        new HtmlWebpackTagsPlugin({
            tags: ['./dll/vendor.dll.js'],
            append: false
        })
    ]
}