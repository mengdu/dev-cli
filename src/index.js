#!/usr/bin/env node
'use strict'
import program from 'commander'
import { color } from './utils'
import pkg from '../package'

program
  .name('dev')
  .version(pkg.version)
  .description('A devlopment tool')
  .usage('<command> [options]')
  .option('-i, --info', 'Tool introduction')
  .command('serve', 'Create a local static file server', { executableFile: 'cmd-serve' }).alias('s')
  .command('fanyi', 'Translate tool', { executableFile: 'cmd-fanyi' }).alias('f')
  .parse(process.argv)

const version = color(` ${pkg.name} `, '1;100') + color(` v${pkg.version} `, '1;104')
const infos = [
  '\n  ' + version + ' ' + pkg.description + '\n',
  '     +--------------------------------------------------------+',
  '     |                                                        |',
  `     |   npm i -g ${pkg.repository.url}   |`,
  '     |                                                        |',
  '     +--------------------------------------------------------+\n',
  `  + ${color(pkg.homepage, 34)}`,
  `  + Make by ${pkg.author.name} <${color(pkg.author.email, 32)}>`
]

if (program.info) console.log(infos.join('\n'))
