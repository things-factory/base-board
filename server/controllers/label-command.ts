/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { labelPage } from '../headless-chromium'
import uuid from 'uuid/v4'

const protocol = 'http'
const host = 'localhost'
const path = 'label-board-view'

import { headless } from './headless'

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
  const port = process.env.PORT
  const url = `${protocol}://${host}:${port}/${path}`

  const page = await labelPage
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
