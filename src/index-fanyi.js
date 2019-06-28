'use strict'
import path from 'path'
import crypto from 'crypto'
import program from 'commander'
import axios from 'axios'
import os from 'os'
import dotenv from 'dotenv'

const cibaKey = 'EB5910470AD5402C64A5CEC58246EDE1'
const baiduAppid = '20181011000218111'
const baiduSecret = 'kZTxYGntfMjeGA_Lf42k'

// 词霸获取可以 http://open.iciba.com/?c=api

// axios.get('http://open.iciba.com/dsapi/?type=last&file=json').then(res => {
//   console.log(res.data)
// })

dotenv.config({ path: path.resolve(os.homedir(), '.dev-cli/.env') })

program
  .name('dev fanyi')
  .usage('<w>')
  .option('-b, --baidu', 'Use baidu fanyi api')
  .parse(process.argv)

function md5 (val) {
  const hash = crypto.createHash('md5')
  hash.update(val)
  return hash.digest('hex')
}

function cibaFanyi (text) {
  const cibaKey = process.env.FANYI_CIBA_KEY || cibaKey
  return axios.get('http://dict-co.iciba.com/api/dictionary.php', { params: { w: text, type: 'json', key: cibaKey } })
}

function baiduFanyi (params, appid, secret) {
  params.salt = new Date().getTime() + '' + Math.random()
  params.sign = md5(appid + params.q + params.salt + secret)

  axios.get('http://api.fanyi.baidu.com/api/trans/vip/translate', { params }).then(res => {
    console.log(res.data)
  })
}

function getLangType (text, appid, secret) {

  return new Promise((resolve, reject) => {
    const params = { q: text }
    params.salt = new Date().getTime() + '' + Math.random()
    params.sign = md5(appid + text + params.salt + secret)
    console.log(params)
    axios.get('http://api.fanyi.baidu.com/api/trans/vip/translate', { params }).then(res => {
      console.log(res.data)
    })
  })
}

function main () {
  if (program.args.length === 0) program.help()

  const config = {
    ciba: {
      key: process.env.FANYI_CIBA_KEY || cibaKey
    },
    baidu: {
      appid: process.env.BAIDU_FANYI_APPID || baiduAppid,
      secret: process.env.BAIDU_FANYI_SECRET || baiduSecret
    }
  }
  console.log(config)
  const text = program.args.join(' ')

  getLangType(text, config.baidu.appid, config.baidu.secret)
  baiduFanyi({ q: text }, config.baidu.appid, config.baidu.secret)

  cibaFanyi(text).then(res => {
    console.log(res.data)
  })
}

main()
