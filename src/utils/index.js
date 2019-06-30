'use strict'
import crypto from 'crypto'
import axios from 'axios'

export function color (val, code) {
  return `\u001b[${code}m${val}\u001b[0m`
}

export function md5 (val) {
  const hash = crypto.createHash('md5')
  hash.update(val)
  return hash.digest('hex')
}

// 词霸获取可以 http://open.iciba.com/?c=api
export function cibaFanyi (key, text) {
  return axios.get('http://dict-co.iciba.com/api/dictionary.php', {
    params: { w: text, type: 'json', key: key}
  })
}

export function baiduFanyi (params, appid, secret) {
  return new Promise(function (resolve, reject) {
    params.q = params.q
    params.salt = new Date().getTime() + '' + Math.random()
    params.sign = md5(appid + params.q + params.salt + secret)
    params.appid = appid

    axios.get('http://api.fanyi.baidu.com/api/trans/vip/translate', { params }).then(res => {
      // console.log(res.data)
      if (!res.data.trans_result) return reject(new Error(res.data.error_msg))

      resolve(res.data)
    }).catch(reject)
  })
}

export function getLangType (text, appid, secret) {
  return new Promise((resolve, reject) => {
    const params = { q: text, appid }
    params.salt = new Date().getTime() + '' + Math.random()
    params.sign = md5(appid + text + params.salt + secret)
    
    axios.get('https://fanyi-api.baidu.com/api/trans/vip/language', { params }).then(res => {
      // console.log(res.data)
      if (res.error_code !== 0) return reject(new Error(res.error_msg))

      resolve(res.data.src)
    }).catch(reject)
  })
}
