/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { labelPage } from '../headless-chromium'
import uuid from 'uuid/v4'

const puppeteer = require('puppeteer')

const protocol = 'http'
const host = 'localhost'
const path = 'label-board-view'

import { headless } from './headless'

export const labelcommand = async (id, data) => {
  var model = await headless({ id })
  let { width, height } = model

  width = Number(width)
  height = Number(height)

  width = Math.floor(width)
  height = Math.floor(height)

  const port = process.env.PORT
  const url = `${protocol}://${host}:${port}/${path}`

  const page = await labelPage.then(async page => {
    if (page.url() != url) {
      await page.goto(url)
      page.on('console', msg => {
        console.log(`[browser ${msg._type}] ${msg._text}`)
        for (let i = 0; i < msg.args().length; ++i) console.log(`${i}: ${msg.args()[i]}`)
      })
    }
    return page
  })

  var guid = uuid()

  const grf = await page.evaluate(
    async (guid, model, data) => {
      //@ts-ignore
      let s = createScene(guid, model)
      if (data) {
        s.data = data
      }
      return new Promise(resolve => {
        setTimeout(
          () => {
            // @ts-ignore
            let grf = imageDataToGrf(s, model)
            resolve(grf)
            // @ts-ignore
            sceneContainer.removeChild(s.target)
            s.dispose()
          },
          data ? 500 : 10
        )
      })
    },
    guid,
    model,
    data
  )

  var bytesPerLine = (width + 7) >> 3

  return `
^XA
^GFA,${bytesPerLine * height},${bytesPerLine * height},${bytesPerLine},${grf}
^FS
^XZ`
}
