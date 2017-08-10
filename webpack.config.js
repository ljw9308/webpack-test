const config = {
	entry:  {
		app: __dirname + '/app/main.js'
        /*vendors: __dirname + '/app/vendors.js'*/
	},
	output: {
		filename: 'bundle.js',
		path: __dirname + '/assets'
	}
}

module.exports = config;
