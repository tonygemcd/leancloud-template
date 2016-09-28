module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * babel-register for development
	 * this should be removed in production
	 */
	__webpack_require__(1)({
	  sourceMaps: true
	});
	
	var AV = __webpack_require__(2);
	var app = __webpack_require__(3);
	var config = __webpack_require__(8);
	
	// initialize LeanCloud
	AV.init({
	  appId: config.LEANCLOUD_APP_ID,
	  appKey: config.LEANCLOUD_APP_KEY,
	  masterKey: config.LEANCLOUD_APP_MASTER_KEY
	});
	AV.Cloud.useMasterKey();
	
	app.listen(config.port, function () {
	  console.log('\n----------------------------');
	  console.log('Node app is running!');
	  console.log('ENV: \t%s', config.env);
	  console.log('PORT: \t%s', config.port);
	  console.log('NODE VERSION: \t%s', process.version);
	  console.log('----------------------------\n');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-register");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("leanengine");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _leanengine = __webpack_require__(2);
	
	var _leanengine2 = _interopRequireDefault(_leanengine);
	
	var _express = __webpack_require__(4);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _bodyParser = __webpack_require__(5);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _cookieParser = __webpack_require__(6);
	
	var _cookieParser2 = _interopRequireDefault(_cookieParser);
	
	var _connectHistoryApiFallback = __webpack_require__(7);
	
	var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);
	
	var _config = __webpack_require__(8);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _user = __webpack_require__(10);
	
	var _user2 = _interopRequireDefault(_user);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var APP_ROOT_PATH = __webpack_require__(15);
	
	var app = (0, _express2.default)();
	
	/**
	 * Config view engine
	 */
	app.set('views', APP_ROOT_PATH + '/server/views/');
	app.set('view engine', 'mustache');
	
	/**
	 * LeanCloud middleware
	 */
	app.use(_leanengine2.default.express());
	
	/**
	 * Hot reload middleware
	 */
	if (_config2.default.env === 'development') {
	  (function () {
	    var webpack = __webpack_require__(16);
	    var webpackConfig = __webpack_require__(17);
	
	    var compiler = webpack(webpackConfig);
	    var devMiddleware = __webpack_require__(27)(compiler, {
	      publicPath: webpackConfig.output.publicPath,
	      stats: {
	        colors: true,
	        chunks: false
	      }
	    });
	    var hotMiddleware = __webpack_require__(28)(compiler);
	    // Reload when html-webpack-plugin template changed
	    compiler.plugin('compilation', function (compilation) {
	      compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
	        hotMiddleware.publish({ action: 'reload' });
	        cb();
	      });
	    });
	
	    // Register webpack-dev and webpack-hot middleware
	    app.use(devMiddleware);
	    app.use(hotMiddleware);
	  })();
	} else {
	  app.get('/', function (req, res) {
	    res.sendFile(APP_ROOT_PATH + '/server/views/index.html');
	  });
	}
	
	/**
	 * Register Node.js middleware
	 */
	app.use((0, _connectHistoryApiFallback2.default)());
	app.use((0, _cookieParser2.default)());
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(_bodyParser2.default.json());
	
	/**
	 * Static path
	 */
	app.use('/static', _express2.default.static(APP_ROOT_PATH + '/dist/static/'));
	
	/**
	 * APIs
	 */
	app.use('/api/user', _user2.default);
	
	/**
	 * Error Handler
	 */
	app.use(function (req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});
	
	module.exports = app;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("connect-history-api-fallback");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _stringify = __webpack_require__(9);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var config = {
	  env: ("production") || 'development',
	  port:  true ? process.env.LEANCLOUD_APP_PORT : 4000,
	
	  /**
	   * LeanCloud Config
	   */
	  LEANCLOUD_APP_ID: '',
	  LEANCLOUD_APP_KEY: '',
	  LEANCLOUD_APP_MASTER_KEY: ''
	};
	
	/**
	 * Environment
	 * N.B.: globals added here must _also_ be added to .eslintrc
	 * @type {Object}
	 */
	config.globals = {
	  'process.env': {
	    'NODE_ENV': (0, _stringify2.default)(config.env)
	  },
	  'NODE_ENV': config.env,
	  '__DEV__': config.env === 'development',
	  '__PROD__': config.env === 'production',
	  '__TEST__': config.env === 'test',
	  '__DEBUG__': config.env === 'development'
	};
	
	module.exports = config;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(4);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _leanengine = __webpack_require__(2);
	
	var _leanengine2 = _interopRequireDefault(_leanengine);
	
	var _joi = __webpack_require__(11);
	
	var _joi2 = _interopRequireDefault(_joi);
	
	var _logger = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var router = _express2.default.Router();
	
	router.post('/register', function (req, res, next) {
	  var username = req.body.username;
	  var password = req.body.password;
	
	  var jSchema = _joi2.default.object().keys({
	    username: _joi2.default.string().min(10).max(30).required(),
	    password: _joi2.default.string().min(1).required()
	  });
	
	  var validate = _joi2.default.validate({
	    username: username,
	    password: password
	  }, jSchema);
	
	  if (validate.error) {
	    _logger.log.error({
	      username: username,
	      password: password
	    }, '注册的账号密码有误');
	
	    return res.json({
	      error: {
	        code: 1001,
	        message: '账号密码有误'
	      }
	    });
	  }
	
	  var newUser = new _leanengine2.default.User();
	  newUser.set('username', username);
	  newUser.set('password', password);
	  newUser.signUp().then(function (user) {
	    res.saveCurrentUser(user);
	    res.json({
	      user: user
	    });
	  }, function (err) {
	    res.json({
	      error: {
	        code: 1002,
	        message: '服务器繁忙',
	        detail: err
	      }
	    });
	  }).catch(next);
	});
	
	router.post('/login', function (req, res, next) {
	  var username = req.body.username;
	  var password = req.body.password;
	
	  _leanengine2.default.User.logIn(username, password).then(function (user) {
	    res.saveCurrentUser(user);
	    res.json({
	      user: user
	    });
	  }, function (err) {
	    res.json({
	      error: {
	        code: 1002,
	        message: '服务器繁忙',
	        detail: err
	      }
	    });
	  }).catch(next);
	});
	
	router.get('/logout', function (req, res, next) {
	  req.currentUser.logOut();
	  res.clearCurrentUser();
	});
	
	exports.default = router;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("joi");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.log = undefined;
	
	var _bunyan = __webpack_require__(13);
	
	var _bunyan2 = _interopRequireDefault(_bunyan);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = exports.log = _bunyan2.default.createLogger({
	  name: __webpack_require__(14).name,
	  serializers: _bunyan2.default.stdSerializers
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("bunyan");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = {
		"name": "lean-template",
		"version": "0.1.0",
		"description": "",
		"main": "server/index.js",
		"scripts": {
			"clean": "rimraf dist",
			"dev": "nodemon --debug server/index.js | ./node_modules/.bin/bunyan",
			"build:client": "NODE_ENV=production babel-node bin/compiler-client.js",
			"build:server": "NODE_ENV=production babel-node bin/compiler-server.js",
			"build": "npm run clean && npm run build:client && npm run build:server",
			"deploy": "npm run build && lean deploy",
			"test": "echo \"Error: no test specified\" && exit 1",
			"start": "node --debug server/index.js"
		},
		"keywords": [
			"express",
			"vue",
			"webpack",
			"leancloud"
		],
		"author": "Tony Luo",
		"license": "ISC",
		"engines": {
			"node": "4.x"
		},
		"devDependencies": {
			"autoprefixer": "^6.4.0",
			"babel-cli": "^6.14.0",
			"babel-core": "^6.14.0",
			"babel-eslint": "^6.1.2",
			"babel-loader": "^6.2.5",
			"babel-plugin-transform-async-to-generator": "^6.8.0",
			"babel-plugin-transform-runtime": "^6.12.0",
			"babel-preset-es2015": "^6.14.0",
			"babel-preset-stage-2": "^6.13.0",
			"babel-register": "^6.14.0",
			"css-loader": "^0.24.0",
			"eslint": "^3.4.0",
			"eslint-config-standard": "^6.0.0",
			"eslint-friendly-formatter": "^2.0.6",
			"eslint-loader": "^1.5.0",
			"eslint-plugin-html": "^1.5.2",
			"eslint-plugin-promise": "^2.0.1",
			"eslint-plugin-standard": "^2.0.0",
			"extract-text-webpack-plugin": "^1.0.1",
			"file-loader": "^0.9.0",
			"html-webpack-plugin": "^2.22.0",
			"json-loader": "^0.5.4",
			"node-sass": "^3.8.0",
			"nodemon": "^1.10.2",
			"postcss-loader": "^0.11.1",
			"sass-loader": "^3.2.3",
			"url-loader": "^0.5.7",
			"vue-hot-reload-api": "^1.3.3",
			"vue-html-loader": "^1.2.3",
			"vue-loader": "^8.5.2",
			"vue-style-loader": "^1.0.0",
			"webpack": "^1.13.2",
			"webpack-dev-middleware": "^1.6.1",
			"webpack-hot-middleware": "^2.12.2",
			"webpack-md5-hash": "0.0.5",
			"webpack-merge": "^0.14.1",
			"webpack-node-externals": "^1.3.3",
			"yargs": "^5.0.0"
		},
		"dependencies": {
			"app-root-path": "^1.3.0",
			"babel-runtime": "^6.11.6",
			"body-parser": "^1.15.2",
			"bunyan": "^1.8.1",
			"connect-history-api-fallback": "^1.3.0",
			"cookie-parser": "^1.4.3",
			"express": "^4.14.0",
			"joi": "^9.0.4",
			"js-cookie": "^2.1.2",
			"leancloud-storage": "^1.3.3",
			"leanengine": "^1.2.2",
			"mustache": "^2.2.1",
			"normalize.css": "^4.2.0",
			"superagent": "^2.3.0",
			"vue": "^1.0.26",
			"vue-resource": "^0.9.3",
			"vue-router": "^0.7.13"
		}
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("app-root-path");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _keys = __webpack_require__(18);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var webpack = __webpack_require__(16);
	var merge = __webpack_require__(19);
	var HtmlWebpackPlugin = __webpack_require__(20);
	var baseWebpackConfig = __webpack_require__(21);
	
	// https://www.npmjs.com/package/webpack-hot-middleware
	var hotMiddlewareConfig = 'webpack-hot-middleware/client?noInfo=true&reload=true';
	
	// add hot-reload related code to entry chunks
	(0, _keys2.default)(baseWebpackConfig.entry).forEach(function (name) {
	  baseWebpackConfig.entry[name] = [hotMiddlewareConfig].concat(baseWebpackConfig.entry[name]);
	});
	
	module.exports = merge(baseWebpackConfig, {
	  output: {
	    filename: '[name].js',
	    pathinfo: true
	  },
	  devtool: '#eval-source-map',
	  plugins: [new webpack.optimize.CommonsChunkPlugin({
	    name: 'vendor',
	    filename: 'vendor.bundle.js',
	    chunks: ['app', 'vendor']
	  }),
	  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
	  new webpack.optimize.OccurenceOrderPlugin(), new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(),
	  // https://github.com/ampedandwired/html-webpack-plugin
	  new HtmlWebpackPlugin({
	    template: 'client/index.html',
	    filename: 'index.html',
	    favicon: 'client/favicon.ico'
	  })]
	});

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("webpack-merge");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("html-webpack-plugin");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var webpack = __webpack_require__(16);
	var path = __webpack_require__(22);
	var autoprefixer = __webpack_require__(23);
	var utils = __webpack_require__(24);
	
	var PROJECT_ROOT = path.resolve(__dirname, '../');
	var PUBLIC_ASSETS_PATH = path.resolve(PROJECT_ROOT, 'client/assets');
	
	module.exports = {
	  entry: {
	    app: path.resolve(__dirname, '../client/main.js'),
	    vendor: ['vue', 'vue-router', 'superagent/lib/client']
	  },
	  output: {
	    path: path.resolve(__dirname, '../dist/static'),
	    publicPath: '/',
	    filename: '[name].js'
	  },
	  resolve: {
	    extensions: ['', '.js', '.vue'],
	    fallback: [path.join(__dirname, '../node_modules')],
	    alias: {
	      'client': path.resolve(PROJECT_ROOT, 'client'),
	      'assets': PUBLIC_ASSETS_PATH
	    }
	  },
	  resolveLoader: {
	    fallback: [path.join(__dirname, '../node_modules')]
	  },
	  plugins: [new webpack.ProvidePlugin({
	    $request: 'superagent/lib/client'
	  })],
	  module: {
	    preLoaders: [{
	      test: /\.vue$/,
	      loader: 'eslint',
	      include: PROJECT_ROOT,
	      exclude: /node_modules/
	    }, {
	      test: /\.js$/,
	      loader: 'eslint',
	      include: PROJECT_ROOT,
	      exclude: /node_modules/
	    }],
	    loaders: [{
	      test: /\.vue$/,
	      loader: 'vue'
	    }, {
	      test: /\.js$/,
	      loader: 'babel',
	      include: PROJECT_ROOT,
	      exclude: /node_modules/
	    }, {
	      test: /\.json$/,
	      loader: 'json'
	    }, {
	      test: /\.html$/,
	      loader: 'vue-html'
	    }, {
	      test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
	      loader: 'url',
	      query: {
	        limit: 10000,
	        name: '[name].[ext]?[hash:7]'
	      }
	    }]
	  },
	  postcss: function postcss() {
	    return [autoprefixer];
	  },
	  vue: {
	    loaders: utils.cssLoaders()
	  },
	  eslint: {
	    formatter: __webpack_require__(26)
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("autoprefixer");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ExtractTextPlugin = __webpack_require__(25);
	
	/**
	 * cssLoaders for vue-loader
	 * @param  {Object} options [description]
	 * @return {String || Object}
	 */
	exports.cssLoaders = function (options) {
	  options = options || {};
	  // generate loader string to be used with extract text plugin
	  function generateLoaders(loaders) {
	    var sourceLoader = loaders.map(function (loader) {
	      var extraParamChar = void 0;
	      if (/\?/.test(loader)) {
	        loader = loader.replace(/\?/, '-loader?');
	        extraParamChar = '&';
	      } else {
	        loader = loader + '-loader';
	        extraParamChar = '?';
	      }
	      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
	    }).join('!');
	
	    if (options.extract) {
	      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
	    } else {
	      return ['vue-style-loader', sourceLoader].join('!');
	    }
	  }
	
	  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
	  return {
	    css: generateLoaders(['css']),
	    postcss: generateLoaders(['css']),
	    less: generateLoaders(['css', 'less']),
	    sass: generateLoaders(['css', 'sass?indentedSyntax']),
	    scss: generateLoaders(['css', 'sass']),
	    stylus: generateLoaders(['css', 'stylus']),
	    styl: generateLoaders(['css', 'stylus'])
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("extract-text-webpack-plugin");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("eslint-friendly-formatter");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map