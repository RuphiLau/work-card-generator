const merge = require('webpack-merge')
const { resolve, outputDir } = require('./utils')
const { devHost, devPort } = require('./config')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'scripts/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
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
            }
        ]
    },
    devServer: {
        hot: true,
        inline: true,
        contentBase: outputDir(),
        host: devHost,
        port: devPort,
        open: true
    },
    plugins: [
    ]
})
