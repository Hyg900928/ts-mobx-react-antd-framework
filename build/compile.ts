import path from 'path';
import  webpack from 'webpack';
import WebpackConfig from './webpack.config';
import config from '../configs';
import  fs from 'fs-extra';
import _debug from 'debug';

const debug = _debug('app:compile');

const WebpackCompiler = (config: any, statsFormat?: any) => {
  return new Promise((resolve: any, reject: any) => {
    const compiler: webpack.Compiler = webpack(config)
    compiler.run((err: any, stats: any) => {
      const jsonStats = stats.toJson()
      debug('Webapck compile completed')

      if (err) {
        debug('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      } else if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('No errors or warnings encountered.')
      }
      resolve(jsonStats)
    })
  })
}

(async function () {
  try {
    debug('Run compiler')
    const clientStats: any = await WebpackCompiler(WebpackConfig)
    if (clientStats.warnings.length) {
      debug('Client Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }
    debug('Server Copy static assets to dist folder.')
    fs.copySync(
      config.assetsDir, config.outDir
    )
  } catch (e) {
    debug('Compiler encountered an error.', e)
    process.exit(1)
  }
})()
