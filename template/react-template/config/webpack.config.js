const path = require('path')
const webpack = require('webpack')
module.exports = (config) => {
	console.log(process.env.FECLI_URL, process.env.NODE_ENV, 123)
	config.plugins.push(
		new webpack.DefinePlugin({
			author: JSON.stringify('Sen Li'),
		})
	)
	return config
}
