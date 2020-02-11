'use strict'
import path from 'path'
import program from 'commander'
import os from 'os'
import dotenv from 'dotenv'
import { color, baiduFanyi, cibaFanyi } from './utils'

const cibaKey = 'EB5910470AD5402C64A5CEC58246EDE1'
const baiduAppid = '20181011000218111'
const baiduSecret = 'kZTxYGntfMjeGA_Lf42k'

dotenv.config({ path: path.resolve(os.homedir(), '.dev-cli') })

program
  .name('dev fanyi')
  .usage('<w>')
  .option('-b, --baidu', 'Use baidu fanyi api')
  .option('-l, --lang <lang>', 'Translate to language')
  .parse(process.argv)

function dye (val) {
  return color(val, 92)
}

async function main () {
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

  const text = program.args.join(' ')

  try {
    if (program.args.length > 1 || program.baidu) {
      console.log('-----------------------')

      const to = program.lang || (/[\u4e00-\u9fa5]/.test(text)
        ? (process.env.BAIDU_DEFAULT_TO || 'en')
        : (process.env.BAIDU_DEFAULT_TO || 'zh'))

      const res = await baiduFanyi({ q: text, from: 'auto', to: to },
        config.baidu.appid,
        config.baidu.secret)

      console.log(dye(res.trans_result[0].dst), color('-', 37), color(res.to, 34))
      console.log('-----------------------')
      console.log(color(' From ', 100) + color(' fanyi.baidu.com ', 104))
    } else {
      console.log('----------------------')
      const res = await cibaFanyi(config.ciba.key, text)
      const data = res.data
      const outList = []

      if (data.exchange) {
        const part = []
        const exc = data.exchange

        if (exc.word_pl) part.push(`复数：${exc.word_pl.map(dye).join(', ')}`)
        if (exc.word_ing) part.push(`现在分词：${exc.word_ing.map(dye).join(', ')}`)
        if (exc.word_past) part.push(`过去式：${exc.word_past.map(dye).join(', ')}`)
        if (exc.word_done) part.push(`过去分词：${exc.word_done.map(dye).join(', ')}`)
        if (exc.word_er) part.push(`名词：${exc.word_er.map(dye).join(', ')}`)
        if (exc.word_est) part.push(`可数名词：${exc.word_est.map(dye).join(', ')}`)
        if (exc.word_third) part.push(`第三人称单数：${exc.word_third.map(dye).join(', ')}`)

        outList.push(part.join('\n'))
      }

      if (data.symbols[0].parts) {
        const out = data.symbols[0].parts.map(e => {
          // 查中文词
          if (!e.part && e.means.length > 0) {
            const chunk = []
            if (data.symbols[0].word_symbol) {
              chunk.push(`读音：${dye(data.symbols[0].word_symbol)}`)
            }

            chunk.push('单词：' + e.means.map(e => {
              if (typeof e === 'string') {
                return dye(e)
              }

              return dye(e.word_mean)
            }).join(', '))

            if (data.symbols[0].symbol_mp3) {
              chunk.push('语音：' + dye(data.symbols[0].symbol_mp3))
            }

            return chunk.join('\n')
          }

          return `${color(e.part, 34)} ${e.means.join(', ')}`
        })
        outList.push(out.join('\n'))
      }

      if (data.symbols[0]) {
        const chunk = []

        if (data.symbols[0].ph_am_mp3) {
          chunk.push('美音：' + dye(data.symbols[0].ph_am_mp3))
        }

        if (data.symbols[0].ph_en_mp3) {
          chunk.push('英音：' + dye(data.symbols[0].ph_en_mp3))
        }

        if (data.symbols[0].ph_tts_mp3) {
          chunk.push('tts：' + dye(data.symbols[0].ph_tts_mp3))
        }
        chunk.length > 0 && outList.push(chunk.join('\n'))
      }

      if (outList.length === 0) {
        console.log(color('Not Found', 31))
      } else {
        console.log(outList.filter(e => !!e).join('\n\n'))
      }

      console.log('----------------------')
      console.log(color(' From ', 100) + color(' open.iciba.com ', 104))
    }
  } catch (err) {
    console.log(color(' Fail ', 41), err.message)
  }
}

main()
