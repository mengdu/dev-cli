#!/usr/bin/env node

'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function toInt(val) {
  return parseInt(val);
}

function history(fn) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
      var pathname;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pathname = ctx.url;


              if (ctx.method === 'GET' && ctx.headers && ctx.headers.accept && ctx.headers.accept.indexOf('application/json') === -1 && pathname.indexOf('.') === -1) {
                ctx.path = options.index || '/index.html';
              }

              _context.next = 4;
              return fn(ctx, next);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}

function main() {
  var _this = this;

  _commander2.default.name('dev serve').usage('<dir> [port]').option('-s, --static', 'History fallback server').option('-p, --port <port>', 'Http server port', toInt, 8080).option('-d, --dir [dir]', 'Static file dir', '.').option('-o, --open', 'Open browser automatically').option('-w, --watch', 'Watch files change').option('--ui', 'Start Browsersync ui dashboard').option('--ui-port <port>', 'Browsersync ui server port', toInt, 3001) // --ui-port 8080
  .option('-c, --config <config>', 'Use `Browsersync` config file, see: https://browsersync.io/docs/options', null);

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
    port: port,
    ui: false
  };

  if (_commander2.default.static) {
    var app = new _koa2.default();

    app.use(function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('[s]:', ctx.path);
                _context2.next = 3;
                return next();

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }());

    var staticFn = (0, _koaStatic2.default)(options.server);

    app.use(history(staticFn));

    app.listen(options.port, function () {
      console.log('Listening on:', options.port);
    });

    return;
  }

  if (_commander2.default.watch) {
    options.files = dir;
  }

  if (_commander2.default.ui) {
    options.ui = {
      port: _commander2.default.uiPort
    };
  }

  if (_commander2.default.config) {
    var config = require(_path2.default.resolve(dir, _commander2.default.config));

    if (config && (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {

      options = _extends({}, options, config);
    }
  }

  // console.log(options)
  (0, _browserSync2.default)(options);
}

main();