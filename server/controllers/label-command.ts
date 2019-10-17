/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { initializeChromium } from '../headless-chromium'
import { fonts } from './fonts'
import uuid from 'uuid/v4'

import { headless } from './headless'

var fontsInUse = [],
  fontsToUse = [],
  labelPage

export async function initializeLabelPage() {
  var browser = await initializeChromium()

  const protocol = 'http'
  const host = 'localhost'
  const path = 'label-board-view'

  const port = process.env.PORT
  const url = `${protocol}://${host}:${port}/${path}`

  labelPage = await browser.newPage()
  fontsToUse = (await fonts()).map((f: { name: string }) => f.name)

  await labelPage.setRequestInterception(true)
  labelPage.on('console', msg => {
    console.log(`[browser ${msg._type}] ${msg._text}`)
    for (let i = 0; i < msg.args().length; ++i) console.log(`${i}: ${msg.args()[i]}`)
  })
  labelPage.on('request', request => {
    if (request.url() === url) {
      request.continue({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        postData: JSON.stringify(fontsToUse)
      })
    } else {
      request.continue()
    }
  })
  await labelPage.goto(url, { timeout: 0 })
  return labelPage
}

/**
 * 라벨 출력
 *
 * @param {String} id 모델 ID
 * @param {Object} data 매핑할 데이터
 * @param {String} orientation (시계방향) N: 0, R: 90, I: 180, B: 270
 * @param {boolean} mirror 좌우반전
 * @param {boolean} upsideDown 상하반전
 */
export const labelcommand = async (id, data, orientation, mirror = false, upsideDown = false) => {
  var model = await headless({ id })
  var fontListChanged = false
  fontsToUse = (await fonts()).map((f: { name: string }) => {
    if (!fontListChanged && !fontsInUse.find(inUse => inUse == f.name)) {
      fontListChanged = true
    }
    return f.name
  })

  var page = labelPage

  if (fontListChanged) {
    fontsInUse = fontsToUse
    console.log('[label-command] Refreshing page to load fonts.')
    await page.reload()
  }

  var guid = uuid()

  const grf = await page.evaluate(
    async (guid, model, data, orientation, mirror, upsideDown) => {
      //@ts-ignore
      let s = createScene(guid, model)
      if (data) {
        s.data = data
      }
      return new Promise(resolve => {
        // @ts-ignore
        requestAnimationFrame(() => {
          // @ts-ignore
          let grf = imageDataToGrf(s, model, orientation, mirror, upsideDown)
          resolve(grf)
          // @ts-ignore
          sceneContainer.removeChild(s.target)
          s.dispose()
        })
      })
    },
    guid,
    model,
    data,
    orientation,
    mirror,
    upsideDown
  )
  return `
^XA
^GFA,${grf}
^FS
^XZ`
}
