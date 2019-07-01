'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.color = color;
exports.md5 = md5;
exports.cibaFanyi = cibaFanyi;
exports.baiduFanyi = baiduFanyi;
exports.getLangType = getLangType;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function color(val, code) {
  return '\x1B[' + code + 'm' + val + '\x1B[0m';
}

function md5(val) {
  var hash = _crypto2.default.createHash('md5');
  hash.update(val);
  return hash.digest('hex');
}

// 词霸获取可以 http://open.iciba.com/?c=api
function cibaFanyi(key, text) {
  return _axios2.default.get('http://dict-co.iciba.com/api/dictionary.php', {
    params: { w: text, type: 'json', key: key }
  });
}

function baiduFanyi(params, appid, secret) {
  return new Promise(function (resolve, reject) {
    params.q = params.q;
    params.salt = new Date().getTime() + '' + Math.random();
    params.sign = md5(appid + params.q + params.salt + secret);
    params.appid = appid;

    _axios2.default.get('http://api.fanyi.baidu.com/api/trans/vip/translate', { params: params }).then(function (res) {
      // console.log(res.data)
      if (!res.data.trans_result) return reject(new Error(res.data.error_msg));

      resolve(res.data);
    }).catch(reject);
  });
}

function getLangType(text, appid, secret) {
  return new Promise(function (resolve, reject) {
    var params = { q: text, appid: appid };
    params.salt = new Date().getTime() + '' + Math.random();
    params.sign = md5(appid + text + params.salt + secret);

    _axios2.default.get('https://fanyi-api.baidu.com/api/trans/vip/language', { params: params }).then(function (res) {
      // console.log(res.data)
      if (res.error_code !== 0) return reject(new Error(res.error_msg));

      resolve(res.data.src);
    }).catch(reject);
  });
}