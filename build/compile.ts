/* tslint:disable */
// import * as path from 'path'
// import * as webpack from 'webpack'
// import clientConfig from './webpack.config'
// import configs from '../configs'
// import * as fs from 'fs-extra'

// import * as _debug from 'debug'
// const debug = _debug('app:compile')

// const path = require('path')
const webpackCompile = require('webpack')
const configs = require('../configs')

// const inRoot = path.resolve.bind(path, configs.pathBase)

const Logs = require('debug')('app:compile')
const fs = require('fs-extra')
const clientConfig = require('./webpack.config')



const webpackCompiler = (config: any, statsFormat?: any) => {
  return new Promise((resolve: any, reject: any) => {
    const compiler = webpackCompile(config)
    compiler.run((err: any, stats: any) => {
      const jsonStats = stats.toJson()
      Logs('Webpack compile completed.')
      // debug(stats.toString(statsFormat));

      if (err) {
        Logs('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      } else if (jsonStats.errors.length > 0) {
        Logs('Webpack compiler encountered errors.')
        Logs(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        Logs('Webpack compiler encountered warnings.')
        Logs(jsonStats.warnings.join('\n'))
      } else {
        Logs('No errors or warnings encountered.')
      }
      resolve(jsonStats)
    })
  })
}

(async function () {
  try {
    Logs('Run compiler')
    const clientStats: any = await webpackCompiler(clientConfig)
    if (clientStats.warnings.length) {
      Logs('Client Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }
    Logs('Server Copy static assets to dist folder.')
    fs.copySync(
      configs.assetsDir, configs.outDir
    )
  } catch (e) {
    Logs('Compiler encountered an error.', e)
    process.exit(1)
  }
})()
