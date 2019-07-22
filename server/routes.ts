import koaBodyParser from 'koa-bodyparser'
const send = require('koa-send')

import { screenshot } from './controllers/screenshot'
import { pdf } from './controllers/pdf'
import { thumbnail } from './controllers/thumbnail'
import { headless } from './controllers/headless'
import { screencast } from './controllers/screencast'
import { labelcommand } from './controllers/label-command'
import { printDirect } from './controllers/print'

process.on('bootstrap-module-history-fallback' as any, (app, fallbackOption) => {
  fallbackOption.whiteList.push(
    '/screenshot',
    '/thumbnail',
    '/label-command',
    '/print',
    '/label-board-view',
    '/headless',
    '/headless-board-view'
  )
})

process.on('bootstrap-module-route' as any, (app, routes) => {
  const bodyParserOption = {
    formLimit: '10mb',
    jsonLimit: '10mb',
    textLimit: '10mb'
  }

  // Send index.html when the user access the web
  const path = require('path')
  const root = path.join(__dirname, '..')

  // for board view only
  routes.post('/headless-board-view', koaBodyParser(bodyParserOption), async (context, next) => {
    let model = context.request.body
    await context.render('headless-board-view', { model })
  })

  // for label-command view only
  routes.post('/label-board-view', koaBodyParser(bodyParserOption), async (context, next) => {
    let model = context.request.body
    await context.render('label-board-view', { model })
  })

  // for label-command view only
  routes.get('/label-board-view', koaBodyParser(bodyParserOption), async (context, next) => {
    await context.render('label-board-view', { model: {} })
  })

  // for board headless
  routes.get('/headless/:id', async (context, next) => {
    let id = context.params.id
    let model = await headless({ id })

    await context.render('headless-board-view', { model })
  })

  routes.get('/label-board-view/:id', async (context, next) => {
    let id = context.params.id
    let model = await headless({ id })

    await context.render('label-board-view', { model })
  })

  // for board screencast
  routes.get('/screencast/:id', async (context, next) => {
    let id = context.params.id
    await screencast({ id })
    await send(context, 'output.webm', { root })
  })

  // for board thumbnail
  routes.get('/thumbnail/:id', async (context, next) => {
    let id = context.params.id
    let data = Object.keys(context.query).length ? context.query : null

    context.type = 'image/png'
    context.body = await thumbnail({ id, data, options: { encoding: 'binary', type: 'png' } })
  })

  // for webpage scrap
  routes.get('/screenshot/:id', async (context, next) => {
    let id = context.params.id
    let data = Object.keys(context.query).length ? context.query : null

    context.type = 'image/png'
    context.body = await screenshot({ id, data, options: { encoding: 'binary', type: 'png' } })
  })

  // for webpage scrap
  routes.get('/pdf/:id', async (context, next) => {
    let id = context.params.id
    let data = Object.keys(context.query).length ? context.query : null

    context.type = 'application/pdf'
    context.body = await pdf({
      id,
      data,
      options: {
        format: 'A4'
      }
    })
  })

  /**
   * ?printerId=printer_id&data=grf_string
   */
  routes.get('/print', async (context, next) => {
    let data = Object.keys(context.query).length ? context.query : null

    context.body = await printDirect(data.printerId, data.data)
  })

  /**
   * { printerId: 'printer driver ID', data: 'grf string' }
   */
  routes.post('/print', koaBodyParser(bodyParserOption), async (context, next) => {
    let params = context.request.body

    context.type = 'text/plain'
    context.body = await printDirect(params.printerId, params.data)
  })

  routes.get('/print-label/:id', async (context, next) => {
    let id = context.params.id
    let data = Object.keys(context.query).length ? context.query : null
    
    let orientation = data && data.orientation
    let mirror = data && data.mirror
    let upsideDown = data && data.upsideDown
    let grf = await labelcommand(id, data, orientation, mirror, upsideDown)

    context.type = 'text/plain'
    // TODO: 동기화
    context.body = printDirect(data.printerId, grf)
  })

  // for webpage scrap => zpl image print(grf format) command
  routes.get('/label-command/:id', async (context, next) => {
    let id = context.params.id
    let data = Object.keys(context.query).length ? context.query : null

    let orientation = data && data.orientation
    let mirror = data && data.mirror
    let upsideDown = data && data.upsideDown

    context.type = 'text/plain'
    context.body = await labelcommand(id, data, orientation, mirror, upsideDown)
  })

  routes.post('/label-command/:id', koaBodyParser(bodyParserOption), async (context, next) => {
    let model = context.request.body
    await context.render('label-command', { model })
  })
})
