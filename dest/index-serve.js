#!/usr/bin/env node

'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.name('dev serve').usage('<dir> [port]').option('-p, --port <port>', 'http server port', Number, 8080).option('-d, --dir [dir]', 'static file dir', '.').option('-o, --open', 'Open browser automatically', true);

_commander2.default.parse(process.argv);

// console.log(program.port, program.dir, program.args)
if (!_commander2.default.port || !_commander2.default.dir) {
  // 如果输入参数为空
  if (_commander2.default.args.length < 1) _commander2.default.help();
}

var port = Number(_commander2.default.args[1]) || _commander2.default.port;
var dir = _path2.default.resolve(process.cwd(), _commander2.default.args[0] || _commander2.default.dir);
var open = _commander2.default.open;

require('./modules/http-server').default.start({ port: port, dir: dir, open: open });