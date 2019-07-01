'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var main = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var config, text, to, res, _res, data, outList, part, exc, out, chunk;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (_commander2.default.args.length === 0) _commander2.default.help();

            config = {
              ciba: {
                key: process.env.FANYI_CIBA_KEY || cibaKey
              },
              baidu: {
                appid: process.env.BAIDU_FANYI_APPID || baiduAppid,
                secret: process.env.BAIDU_FANYI_SECRET || baiduSecret
              }
            };
            text = _commander2.default.args.join(' ');
            _context.prev = 3;

            if (!(_commander2.default.args.length > 1 || _commander2.default.baidu)) {
              _context.next = 15;
              break;
            }

            console.log('-----------------------');

            to = _commander2.default.lang || (/[\u4e00-\u9fa5]/.test(text) ? process.env.BAIDU_DEFAULT_TO || 'en' : process.env.BAIDU_DEFAULT_TO || 'zh');
            _context.next = 9;
            return (0, _utils.baiduFanyi)({ q: text, from: 'auto', to: to }, config.baidu.appid, config.baidu.secret);

          case 9:
            res = _context.sent;


            console.log(dye(res.trans_result[0].dst), (0, _utils.color)('-', 37), (0, _utils.color)(res.to, 34));
            console.log('-----------------------');
            console.log((0, _utils.color)(' From ', 100) + (0, _utils.color)(' fanyi.baidu.com ', 104));
            _context.next = 27;
            break;

          case 15:
            console.log('----------------------');
            _context.next = 18;
            return (0, _utils.cibaFanyi)(config.ciba.key, text);

          case 18:
            _res = _context.sent;
            data = _res.data;
            outList = [];


            if (data.exchange) {
              part = [];
              exc = data.exchange;


              if (exc.word_pl) part.push('\u590D\u6570\uFF1A' + exc.word_pl.map(dye).join(', '));
              if (exc.word_ing) part.push('\u73B0\u5728\u5206\u8BCD\uFF1A' + exc.word_ing.map(dye).join(', '));
              if (exc.word_past) part.push('\u8FC7\u53BB\u5F0F\uFF1A' + exc.word_past.map(dye).join(', '));
              if (exc.word_done) part.push('\u8FC7\u53BB\u5206\u8BCD\uFF1A' + exc.word_done.map(dye).join(', '));
              if (exc.word_er) part.push('\u540D\u8BCD\uFF1A' + exc.word_er.map(dye).join(', '));
              if (exc.word_est) part.push('\u53EF\u6570\u540D\u8BCD\uFF1A' + exc.word_est.map(dye).join(', '));
              if (exc.word_third) part.push('\u7B2C\u4E09\u4EBA\u79F0\u5355\u6570\uFF1A' + exc.word_third.map(dye).join(', '));

              outList.push(part.join('\n'));
            }

            if (data.symbols[0].parts) {
              out = data.symbols[0].parts.map(function (e) {
                // 查中文词
                if (!e.part && e.means.length > 0) {
                  var chunk = [];
                  if (data.symbols[0].word_symbol) {
                    chunk.push('\u8BFB\u97F3\uFF1A' + dye(data.symbols[0].word_symbol));
                  }

                  chunk.push('单词：' + e.means.map(function (e) {
                    if (typeof e === 'string') {
                      return dye(e);
                    }

                    return dye(e.word_mean);
                  }).join(', '));

                  if (data.symbols[0].symbol_mp3) {
                    chunk.push('语音：' + dye(data.symbols[0].symbol_mp3));
                  }

                  return chunk.join('\n');
                }

                return (0, _utils.color)(e.part, 34) + ' ' + e.means.join(', ');
              });

              outList.push(out.join('\n'));
            }

            if (data.symbols[0]) {
              chunk = [];


              if (data.symbols[0].ph_am_mp3) {
                chunk.push('美音：' + dye(data.symbols[0].ph_am_mp3));
              }

              if (data.symbols[0].ph_en_mp3) {
                chunk.push('英音：' + dye(data.symbols[0].ph_en_mp3));
              }

              if (data.symbols[0].ph_tts_mp3) {
                chunk.push('tts：' + dye(data.symbols[0].ph_tts_mp3));
              }
              chunk.length > 0 && outList.push(chunk.join('\n'));
            }

            if (outList.length === 0) {
              console.log((0, _utils.color)('Not Found', 31));
            } else {
              console.log(outList.filter(function (e) {
                return !!e;
              }).join('\n\n'));
            }

            console.log('----------------------');
            console.log((0, _utils.color)(' From ', 100) + (0, _utils.color)(' open.iciba.com ', 104));

          case 27:
            _context.next = 32;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context['catch'](3);

            console.log((0, _utils.color)(' Fail ', 41), _context.t0.message);

          case 32:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 29]]);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var cibaKey = 'EB5910470AD5402C64A5CEC58246EDE1';
var baiduAppid = '20181011000218111';
var baiduSecret = 'kZTxYGntfMjeGA_Lf42k';

_dotenv2.default.config({ path: _path2.default.resolve(_os2.default.homedir(), '.dev-cli') });

_commander2.default.name('dev fanyi').usage('<w>').option('-b, --baidu', 'Use baidu fanyi api').option('-l, --lang <lang>', 'Translate to language').parse(process.argv);

function dye(val) {
  return (0, _utils.color)(val, 92);
}

main();