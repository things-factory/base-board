import { headless } from './headless'
import { fonts } from './fonts'
import { initializeChromium } from '../headless-chromium'

const protocol = 'http'
const host = 'localhost'
const path = 'headless-board-view'

export const screenshot = async ({
  id = '',
  model = null,
  data = null,
  width: w = 0,
  height: h = 0,
  options = { encoding: 'base64' } as any,
  isThumbnail = false
} = {}) => {
  var browser = await initializeChromium()

  model = await headless({ id, model })
  model.fonts = (await fonts()).map((font: { name }) => font.name)

  var { width, height } = model

  if (isThumbnail) {
    var widthRatio = 400 / width,
      heightRatio = 300 / height
    var ratio = widthRatio < heightRatio ? widthRatio : heightRatio
    width = width * ratio
    height = height * ratio
  }
  width = Math.floor(w || Number(width))
  height = Math.floor(h || Number(height))

  const port = process.env.PORT
  const url = `${protocol}://${host}:${port}/${path}`

  var page = await browser.newPage()
  await page.setViewport({ width, height })
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

  await page.evaluate(async data => {
    if (data) {
      // @ts-ignore
      s.data = data
    }

    // data 주입 후 강제 지연시킴.
    return new Promise(resolve => {
      // @ts-ignore
      requestAnimationFrame(() => resolve())
    })
  }, data)

  var screenshot = await page.screenshot(options)
  page.close()

  return screenshot
}
