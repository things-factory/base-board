export * from './entities'
export * from './migrations'
export * from './graphql'

import './routes'

process.on('bootstrap-module-middleware' as any, app => {
  const render = require('koa-ejs')
  const path = require('path')

  render(app, {
    root: path.join(__dirname, '..', 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
  })
})
