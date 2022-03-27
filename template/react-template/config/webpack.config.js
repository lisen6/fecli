const path = require('path')
const webpack = require('webpack')
module.exports = (config) => {
	config.plugins.push(
		new webpack.DefinePlugin({
			author: JSON.stringify('Sen Li'),
		})
	)
	return config
}
