const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve, outputDir } = require('./utils')

module.exports = {
    mode: 'production',
    entry: {
        vendor: [
            'babel-polyfill',
            'react',
            'react-dom'
        ]
    },
    resolve: {
        extensions: ['.js'],
        modules: [resolve('./node_modules')]
    },
    output: {
        filename: '[name].dll.js',
        path: outputDir('./dll'),
        library: '[name]_[hash]'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: resolve('./src'),
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]-[hash:base64:6]'
                        }
                    },
                    'postcss-loader',
                    'less-loader',
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: resolve('./src/assets/less/variables.less')
                        }
                    }
                ]
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
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new webpack.DllPlugin({
            path: outputDir('./dll/manifest.json'),
            name: '[name]_[hash]'
        })
    ]
}