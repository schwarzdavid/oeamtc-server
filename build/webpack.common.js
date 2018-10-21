const path = require('path');
const autoprefixer = require('autoprefixer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const root = path.resolve(__dirname, '../');

module.exports = {
	target: 'web',
	resolve: {
		extensions: ['.js', '.ts', '.vue'],
		alias: {
			'Assets': path.resolve(root, 'client/common/assets'),
			'@': root,
			'~': path.resolve(root, 'node_modules')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
						options: {
							transformAssetUrls: {
								'v-img': 'src'
							}
						}
					}
				]
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
							//name: '[name]-[hash:7].[ext]',
							name: '[name].[ext]',
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
							//name: '[name]-[hash:7].[ext]',
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			}
		]
	},
	devtool: "source-map",
	plugins: [
		new VueLoaderPlugin()
	]
};
