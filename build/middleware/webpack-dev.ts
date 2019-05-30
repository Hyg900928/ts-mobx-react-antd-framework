// import * as WebpackDevMiddleware from 'webpack-dev-middleware'
// import * as path from 'path'
// import * as _debug from 'debug'
// const debug = _debug('app:server:webpack-dev')

// import configs from '../../configs'

const WebpackDevMiddleware = require('webpack-dev-middleware')
const webpackDevLog = require('debug')('app:server:webpack-dev')
// const configs = require('../../configs')
// const pathDev = require('path')
// const debug = _debug('')

module.exports = (compiler: any, publicPath: any) => {
  webpackDevLog('Enable webpack dev middleware.')

  const middleware = WebpackDevMiddleware(compiler, {
    publicPath,
    // contentBase: path.join(__dirname, '..', '..', 'src'),

  })

  return async(ctx: any, next: any) => {
    let hasNext = await applyServiceMiddlewares(middleware, ctx.req, {
      end: (content: any) => (ctx.body = content),
      setHeader: function() {
        ctx.set.apply(ctx, arguments)
      },
    })

    if (hasNext) {
      await next()
    }
  }
}

function applyServiceMiddlewares(fn: any, req: any, res: any) {
  const originalEnd = res.end

  return new Promise((resolve: any) => {
    res.end = function() {
      originalEnd.apply(this, arguments)
      resolve(false)
    }
    fn(req, res, function() {
      resolve(true)
    })
  })
}
