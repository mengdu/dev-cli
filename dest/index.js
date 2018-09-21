#!/usr/bin/env node

'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var info = '\n\u25CF ' + _package2.default.name + ' v' + _package2.default.version + '\n\u25CF ' + _package2.default.description + '\n\u25CF ' + _colors2.default.blue(_package2.default.homepage) + '\n\u25CF ' + _package2.default.author.name + ' <' + _package2.default.author.email + '>\n';
// import execa from 'execa'


_commander2.default.name('dev').version(_package2.default.version).usage('<command> [options]').option('-i, --info', 'Tool introduction', info).command('serve', 'Create a local static file server');

_commander2.default.parse(process.argv);

if (_commander2.default.info) console.log(info);