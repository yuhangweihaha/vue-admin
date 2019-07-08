'use strict';
const path = require('path');

module.exports = {
	dev: {
		// Paths
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/api': {
				target: 'http://172.30.80.160:8990',
				pathRewrite: {
					'^/api': '/api/'
				}
			},
			'/req': {
				target: 'http://172.30.21.215:8086',
				pathRewrite: {
					'^/req': '/api/'
				}
			},
			'/enfa': {
				target: 'http://172.30.61.3:8086',
				// target: 'http://changting:8765',      //220
				// target: 'http://172.30.17.181:8765',   //181
				// target: 'http://172.30.17.183:8765',   //183
				pathRewrite: {
					'^/enfa': ''
				}
			},
			'/enfa1': {
				target: 'http://172.30.21.201:8765',

				pathRewrite: {
					'^/enfa1': ''
				}
			},
   /*   '/api': {
        // target: 'http://192.168.2.137:8862 ',
        target: 'http://172.30.17.202:8765',
        // target: 'http://172.30.17.233:8765',
        // target: 'http://192.168.1.159:8765',
        // target: 'http://localhost:8765',
        pathRewrite: {
          '^/api': '/api/'
        }
      },*/
				'/yu': {
					// target: 'http://172.30.62.82:8086',      //220
					target: 'http://172.30.21.218:8086',      //220
					pathRewrite: {
					'^/yu': ''
					}
				},
      '/gsupserver': {
        // target: 'http://172.30.17.222:8765',
        target: 'http://172.30.17.154:8080',
        // target: 'http://locahost:8765',
        pathRewrite: {
          '^/gsupserver': '/gsupserver/'
        },
      },
      '/yinghua': {
        // target: 'http://172.30.17.222:8765',
        target: 'http://172.30.60.121:8086',
        // target: 'http://locahost:8765',
        pathRewrite: {
          '^/yinghua': ''
        },
      },
			'/opt': {
        // target: 'http://172.30.21.218:8086',      //220
				// target: 'http://172.30.62.82:8086',
				target: 'http://172.30.17.206:8086',
				// target: 'http://changting:8765',      //220
				// target: 'http://172.30.17.181:8765',   //181
				// target: 'http://172.30.17.183:8765',   //183
				pathRewrite: {
				'^/opt': ''
				}
			},
			'/lgn':{
				target: 'http://172.30.17.209:8765',  //202
				changeOrigin: true,
				pathRewrite: {
					'^/lgn': '/'
				}
			},
		},
		// Various Dev Server settings
		host: 'localhost', // can be overwritten by process.env.HOST
		port: 8000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
		autoOpenBrowser: true,
		errorOverlay: true,
		notifyOnErrors: false,
		poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

		// Use Eslint Loader?
		// If true, your code will be linted during bundling and
		// linting errors and warnings will be shown in the console.
		useEslint: false,
		// If true, eslint errors and warnings will also be shown in the error overlay
		// in the browser.
		showEslintErrorsInOverlay: false,

		/**
		 * Source Maps
		 */

		// https://webpack.js.org/configuration/devtool/#development
		devtool: 'eval-source-map',

		// If you have problems debugging vue-files in devtools,
		// set this to false - it *may* help
		// https://vue-loader.vuejs.org/en/options.html#cachebusting
		cacheBusting: true,

		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false,
	},

	build: {
		// Template for index.html
		index: path.resolve(__dirname, '../dist/index.html'),

		// Paths
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',

		// you can set by youself according to actual condition
		assetsPublicPath: './',

		/**
		 * Source Maps
		 */

		productionSourceMap: false,
		// https://webpack.js.org/configuration/devtool/#production
		devtool: '#source-map',

		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: true,
		productionGzipExtensions: ['js', 'css'],

		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	}
}
