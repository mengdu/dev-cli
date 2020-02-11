#!/usr/bin/env node

'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _utils = require('./utils');

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.name('dev').version(_package2.default.version).description('A devlopment tool').usage('<command> [options]').option('-i, --info', 'Tool introduction').command('serve', 'Create a local static file server', { executableFile: 'cmd-serve' }).alias('s').command('fanyi', 'Translate tool', { executableFile: 'cmd-fanyi' }).alias('f').parse(process.argv);

var version = (0, _utils.color)(' ' + _package2.default.name + ' ', '1;100') + (0, _utils.color)(' v' + _package2.default.version + ' ', '1;104');
var infos = ['\n  ' + version + ' ' + _package2.default.description + '\n', '     +--------------------------------------------------------+', '     |                                                        |', '     |   npm i -g ' + _package2.default.repository.url + '   |', '     |                                                        |', '     +--------------------------------------------------------+\n', '  + ' + (0, _utils.color)(_package2.default.homepage, 34), '  + Make by ' + _package2.default.author.name + ' <' + (0, _utils.color)(_package2.default.author.email, 32) + '>'];

if (_commander2.default.info) console.log(infos.join('\n'));