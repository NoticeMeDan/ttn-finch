module.exports = {
	html: {
		theme: '#6F00FF',
		title: 'Finch'
	},
	build: {
		publicPath: '/',
		supportedBrowsers: ['last 1 Chrome versions'], // https://github.com/browserslist/browserslist
		mainBundleName: 'finch',
		vendorLibs: 'react|react-dom|@material-ui/core' // separated by pipes
	},
	proxy: {
		paths: ['/api'],
		port: 8080
	}
}
