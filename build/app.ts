// import * as koa from 'koa'
// import * as KoaStatic from 'koa-static'
// import * as convert from 'koa-convert'
// import * as webpack from 'webpack'
// import * as historyApiFallback from 'koa-connect-history-api-fallback'
// import * as _debug from 'debug'
// import configs from '../configs'
// import webpackDevMiddleware from './middleware/webpack-dev'
// import webpackHMRMiddleware from './middleware/webpack-hmr'
// import webpackConfig from './webpack.config'

const koa = require('koa')
const KoaStatic = require('koa-static')
const convert = require('koa-convert')
const webpackApp = require('webpack')
const historyApiFallback = require('koa-connect-history-api-fallback')
// const _debug = require('debug')
const configsApp = require('../configs/index.ts')
const webpackDevMiddleware = require('./middleware/webpack-dev')
const webpackHMRMiddleware = require('./middleware/webpack-hmr')
const webpackConfig = require('./webpack.config')

// const debug = _debug('app:server')
const app = new koa()
const isDev = configsApp.env === 'development'

app.use(convert(historyApiFallback({
    verbose: false,
})))

if (isDev) {
    // Enable webpack-dev and webpack-hot middleware
    const compiler = webpackApp(webpackConfig as any)
    const { publicPath } = webpackConfig.output
    app.use(webpackDevMiddleware(compiler, publicPath))
    app.use(webpackHMRMiddleware(compiler))
  } else {
    app.use(convert(KoaStatic(configsApp.outDir)))
  }

 module.exports = app
