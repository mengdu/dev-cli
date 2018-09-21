'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaMount = require('koa-mount');

var _koaMount2 = _interopRequireDefault(_koaMount);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _opn = require('opn');

var _opn2 = _interopRequireDefault(_opn);

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = new _koa2.default();

app.use(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    var start, delta, info;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            start = Date.now();
            // console.log('\u001b[46m[HTTP]\u001b[0m', `>> ${ctx.method} ${ctx.url}`)

            _context.next = 3;
            return next();

          case 3:
            delta = Math.ceil(Date.now() - start);
            info = '[' + (0, _lib.format)(start, 'HH:mm:ss:ms') + '] ' + ctx.method + ' ' + ctx.url + ' \x1B[35m' + ctx.status + '\x1B[0m - \x1B[32m' + delta + '\x1B[0m ms';


            ctx.set('X-Response-Time', delta + 'ms');

            console.log('\x1B[42m[HTTP]\x1B[0m', info);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

var main = {};

main.start = function (options) {
  var port = Number(options.port || 4000);
  var url = 'http://localhost:' + port;

  app.use((0, _koaMount2.default)('/', (0, _koaStatic2.default)(options.dir)));

  app.listen(port);
  // console.log(options)
  console.log('\nDir: \x1B[35m' + options.dir + '\x1B[0m');
  console.log('Server on: \x1B[35m' + url + '\x1B[0m\n');
  if (options.open) {
    (0, _opn2.default)(url);
  }
};

exports.default = main;