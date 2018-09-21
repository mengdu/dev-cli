import Koa from 'koa'
import KoaMount from 'koa-mount'
import KoaStatic from 'koa-static'
import opn from 'opn'
import {format} from '../lib'

const app = new Koa()

app.use(async (ctx, next) => {
  const start = Date.now()
  // console.log('\u001b[46m[HTTP]\u001b[0m', `>> ${ctx.method} ${ctx.url}`)
  await next()

  var delta = Math.ceil(Date.now() - start)

  var info = `[${format(start, 'HH:mm:ss:ms')}] ${ctx.method} ${ctx.url} \u001b[35m${ctx.status}\u001b[0m - \u001b[32m${delta}\u001b[0m ms`

  ctx.set('X-Response-Time', delta + 'ms')

  console.log('\u001b[42m[HTTP]\u001b[0m', info)
})

const main = {}

main.start = function (options) {
  const port = Number(options.port || 4000)
  const url = `http://localhost:${port}`

  app.use(KoaMount('/', KoaStatic(options.dir)))

  app.listen(port)
  // console.log(options)
  console.log(`\nDir: \u001b[35m${options.dir}\u001b[0m`)
  console.log(`Server on: \u001b[35m${url}\u001b[0m\n`)
  if (options.open) {
    opn(url)
  }
}

export default main
