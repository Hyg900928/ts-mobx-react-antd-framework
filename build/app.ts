import  Koa from 'koa'
import  KoaStatic from 'koa-static'
import  convert from 'koa-convert'
import  webpack from 'webpack'
import  historyApiFallback from 'koa-connect-history-api-fallback'
import  path from 'path'
import  fs from 'fs-extra'
import  _debug from 'debug'
import configs from '../configs'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'
import webpackConfig from './webpack.config'



const debug = _debug('app:server')
const app = new Koa()
const __DEV__ = configs.env === 'development'


app.use(convert(historyApiFallback({
  verbose: false,
})))

if (__DEV__) {
  // Enable webpack-dev and webpack-hot middleware
  const compiler = webpack(webpackConfig as any)
  const { publicPath } = webpackConfig.output
  debug('starting.....')
  // app.use(middleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    publicPath
  }))
  app.use(webpackHMRMiddleware(compiler))
} else {
  app.use(convert(KoaStatic(configs.outDir)))
}

export default app
