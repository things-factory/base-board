/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
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

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--hide-scrollbars', '--mute-audio', '--headless', '--no-sandbox']
  })

  const page = await browser.newPage()

  /* @remember-me setViewport의 width, height는 정수여야 한다. */
  await page.setViewport({
    width,
    height
  })

  const port = process.env.PORT
  const url = `${protocol}://${host}:${port}/${path}`

  await page.setRequestInterception(true)

  page.on('console', msg => {
    console.log(`[browser ${msg._type}] ${msg._text}`)
    for (let i = 0; i < msg.args().length; ++i) console.log(`${i}: ${msg.args()[i]}`)
  })

  page.on('request', request => {
    if (request.url() === url) {
      request.continue({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        postData: JSON.stringify(model)
      })
    } else {
      request.continue()
    }
  })

  await page.goto(url)

  const grf = await page
    .evaluate(
      async (width, height, data) => {
        if (data) {
          // @ts-ignore
          s.data = data
        }
        return new Promise(resolve => {
          setTimeout(
            () => {
              // @ts-ignore
              let grf = imageDataToGrf(width, height)
              resolve(grf)
            },
            data ? 500 : 0
          )
        })
      },
      width,
      height,
      data
    )
    .finally(() => {
      browser.close()
    })

  // var guid = uuid()

  var bytesPerLine = (width + 7) >> 3

  return `
^XA
^GFA,${bytesPerLine * height},${bytesPerLine * height},${bytesPerLine},${grf}
^FS
^XZ`

//   return `
// ^XA

// ~DG${guid},${grfString}
// ^FO0,0
// ^XGR:${guid},1,1
// ^PQ1
// ^FS

// ^XZ
// `
}
