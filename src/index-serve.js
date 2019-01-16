#!/usr/bin/env node
'use strict'
import path from 'path'
import program from 'commander'
import browserSync from 'browser-sync'

program
  .name('dev serve')
  .usage('<dir> [port]')
  .option('-p, --port <port>', 'http server port', Number, 8080)
  .option('-d, --dir [dir]', 'static file dir', '.')
  .option('-o, --open', 'Open browser automatically')
  .option('-w, --watch', 'Watch files change', Boolean)
  .option('-c, --config <config>', 'Use `Browsersync` config file, see: https://browsersync.io/docs/options', null)

program.parse(process.argv)

if (!program.port || !program.dir) {
  // 如果输入参数为空
  if (program.args.length < 1) program.help()
}

const port = Number(program.args[1]) || program.port
const dir = path.resolve(process.cwd(), program.args[0] || program.dir)
const open = !!program.open

let options = {
  server: dir,
  open: open,
  port: port
}

if (program.watch) {
  options.files = dir
}

if (program.config) {
  const config = require(path.resolve(dir, program.config))

  if (config && typeof config === 'object') {
    
    options = {
      ...options,
      ...config
    }
  }
}
// console.log(options)
browserSync(options)
