const path = require('path');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const root = path.resolve(__dirname, '../');
const driverRoot = path.resolve(root, 'client/driver');
const driverSrcRoot = path.resolve(driverRoot, 'src');
const driverDistRoot = path.resolve(driverRoot, 'dist');

const config = {
	name: 'driver',
	entry: path.resolve(driverSrcRoot, 'index.js'),
	output: {
		path: driverDistRoot,
		filename: 'driver.bundle.js',
		publicPath: '/driver/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(driverSrcRoot, 'index.html')
		}),
		new MiniCssExtractPlugin({
			filename: 'driver.bundle.css'
		})
	]
};

module.exports = merge(config, common);
