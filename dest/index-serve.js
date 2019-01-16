#!/usr/bin/env node

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.name('dev serve').usage('<dir> [port]').option('-p, --port <port>', 'http server port', Number, 8080).option('-d, --dir [dir]', 'static file dir', '.').option('-o, --open', 'Open browser automatically').option('-w, --watch', 'Watch files change', Boolean).option('-c, --config <config>', 'Use `Browsersync` config file, see: https://browsersync.io/docs/options', null);

_commander2.default.parse(process.argv);

if (!_commander2.default.port || !_commander2.default.dir) {
  // 如果输入参数为空
  if (_commander2.default.args.length < 1) _commander2.default.help();
}

var port = Number(_commander2.default.args[1]) || _commander2.default.port;
var dir = _path2.default.resolve(process.cwd(), _commander2.default.args[0] || _commander2.default.dir);
var open = !!_commander2.default.open;

var options = {
  server: dir,
  open: open,
  port: port
};

if (_commander2.default.watch) {
  options.files = dir;
}

if (_commander2.default.config) {
  var config = require(_path2.default.resolve(dir, _commander2.default.config));

  if (config && (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {

    options = _extends({}, options, config);
  }
}
// console.log(options)
(0, _browserSync2.default)(options);