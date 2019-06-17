import  WebpackDevMiddleware from 'webpack-dev-middleware'
import  path from 'path'
import  _debug from 'debug'
const debug = _debug('app:server:webpack-dev')

import configs from '../../configs'

export default (compiler: any, opts?: WebpackDevMiddleware.Options) => {
  debug('Enable webpack dev middleware.')

  const middleware = WebpackDevMiddleware(compiler, opts)

  return async(ctx: any, next: any) => {
    let hasNext = await applyServiceMiddleware(middleware, ctx.req, {
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

function applyServiceMiddleware(fn: any, req: any, res: any) {
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
