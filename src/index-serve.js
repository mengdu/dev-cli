#!/usr/bin/env node
'use strict'
import path from 'path'
import program from 'commander'
import browserSync from 'browser-sync'

function toInt (val) {
  return parseInt(val)
}

program
  .name('dev serve')
  .usage('<dir> [port]')
  .option('-p, --port <port>', 'Http server port', toInt, 8080)
  .option('-d, --dir [dir]', 'Static file dir', '.')
  .option('-o, --open', 'Open browser automatically')
  .option('-w, --watch', 'Watch files change')
  .option('--ui', 'Start Browsersync ui dashboard')
  .option('--ui-port <port>', 'Browsersync ui server port', toInt, 3001)// --ui-port 8080
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
  port: port,
  ui: false
}

if (program.watch) {
  options.files = dir
}

if (program.ui) {
  options.ui = {
    port: program.uiPort
  }
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
