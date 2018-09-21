#!/usr/bin/env node
'use strict'
import path from 'path'
import program from 'commander'

program
  .name('dev serve')
  .usage('<dir> [port]')
  .option('-p, --port <port>', 'http server port', Number, 8080)
  .option('-d, --dir [dir]', 'static file dir', '.')
  .option('-o, --open', 'Open browser automatically', true)

program.parse(process.argv)

// console.log(program.port, program.dir, program.args)
if (!program.port || !program.dir) {
  // 如果输入参数为空
  if (program.args.length < 1) program.help()
}

const port = Number(program.args[1]) || program.port
const dir = path.resolve(process.cwd(), program.args[0] || program.dir)
const open = program.open

require('./modules/http-server').default.start({port, dir, open})
