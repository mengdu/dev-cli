#!/usr/bin/env node
'use strict'
import program from 'commander'
import colors from 'colors'
// import execa from 'execa'
import pkg from '../package'


const info = `\n● ${pkg.name} v${pkg.version}\n● ${pkg.description}\n● ${colors.blue(pkg.homepage)}\n● ${pkg.author}\n`

program
  .name('dev')
  .version(pkg.version)
  .usage('<command> [options]')
  .option('-i, --info', 'Tool introduction', info)
  .command('serve', 'Create a local static file server')

program.parse(process.argv)

if (program.info) console.log(info)
