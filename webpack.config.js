const config = {
	entry:  {
		app: __dirname + '/app/main.js'
        /*vendors: __dirname + '/app/vendors.js'*/
	},
	module: {
		rules:[
		  {
		    test: /\.css$/,
		    use: [
		       'style-loader',
		       'css-loader'
		    ]
		  },
		  {
	         test: /\.(png|svg|jpg|gif)$/,
	         use: [
	           'file-loader'
	         ]
	       }
		]
	},
	output: {
		filename: 'bundle.js',
		path: __dirname + '/assets'
	}
}

module.exports = config;
