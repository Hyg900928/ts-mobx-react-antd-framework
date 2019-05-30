// import debug = require("debug");

// import * as WebpackHotMiddleware from 'webpack-hot-middleware'
// import * as _debug from 'debug'
const WebpackHotMiddleware = require('webpack-hot-middleware')
const Log = require('debug')('app:server:webpack-hmr')

// const debug = _debug()

module.exports = (compiler: any, opts?: any) => {
  Log('Enable Webpack Hot Module Replacement (HMR).')

  const middleware = WebpackHotMiddleware(compiler, opts)
  return async function koaWebpackHMR(ctx: any, next: any) {
    let hasNext = await applyServiceMiddleware(middleware, ctx.req, ctx.res)

    if (hasNext && next) {
      await next()
    }
  }
}

function applyServiceMiddleware(fn: any, req: any, res: any) {
  const originalEnd = res.end

  return new Promise((resolve) => {
    res.end = function() {
      originalEnd.apply(this, arguments)
      resolve(false)
    }
    fn(req, res, function() {
      resolve(true)
    })
  })
}
