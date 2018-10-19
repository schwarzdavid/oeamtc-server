const path = require('path');
const autoprefixer = require('autoprefixer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const root = path.resolve(__dirname, './');
const clientRoot = path.resolve(root, 'client');
const clientSrcRoot = path.resolve(clientRoot, 'src');
const clientDistRoot = path.resolve(clientRoot, 'dist');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: path.resolve(clientSrcRoot, 'index.js'),
    output: {
        path: clientDistRoot,
        filename: 'client.bundle.js',
        //filename: 'client-[hash:7].bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue'],
        alias: {
            'Components': path.resolve(clientSrcRoot, 'components'),
            'Assets': path.resolve(clientSrcRoot, 'assets'),
            'Services': path.resolve(clientSrcRoot, 'services'),
            '@': root,
            '~': path.resolve(root, 'node_modules')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                resourceQuery: /blockType=i18n/,
                loader: '@kazupon/vue-i18n-loader'
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            configFile: path.resolve(root, 'tsconfig.json')
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: path.resolve(root, 'node_modules/')
            },
            {
                test: /\.scss/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            autoprefixer({
                                browsers: '> 5%'
                            })
                        ]
                    }
                }, 'sass-loader']
            },
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => {
                            autoprefixer({
                                browsers: '> 5%'
                            })
                        }
                    }
                }]
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:7].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(json|txt)$/,
                use: ['url-loader']
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:7].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(clientSrcRoot, 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'client.bundle.css'
            //filename: 'client-[hash:7].bundle.css'
        })
    ]
};
