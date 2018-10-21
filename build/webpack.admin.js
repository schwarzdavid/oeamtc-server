const path = require('path');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const root = path.resolve(__dirname, '../');
const adminRoot = path.resolve(root, 'client/admin');
const adminSrcRoot = path.resolve(adminRoot, 'src');
const adminDistRoot = path.resolve(adminRoot, 'dist');

const config = {
	name: 'admin',
	entry: path.resolve(adminSrcRoot, 'index.js'),
	output: {
		path: adminDistRoot,
		filename: 'admin.bundle.js',
		publicPath: '/admin/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(adminSrcRoot, 'index.html'),
			baseUrl: '/admin/'
		}),
		new MiniCssExtractPlugin({
			filename: 'admin.bundle.css'
		})
	]
};

module.exports = merge(config, common);
