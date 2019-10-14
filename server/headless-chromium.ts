const puppeteer = require('puppeteer')
import { fonts } from './controllers/fonts'

function initializeChromium() {
  return puppeteer.launch({
    // devtools: true,
    args: ['--hide-scrollbars', '--mute-audio', '--no-sandbox']
  })
}

export const browser = initializeChromium()
export const defaultPage = browser.then(async browser => {
  var pages = await browser.pages()
  return pages[0]
})
export const labelPage = browser.then(async browser => {
  const protocol = 'http'
  const host = 'localhost'
  const path = 'label-board-view'

  const port = process.env.PORT
  const url = `${protocol}://${host}:${port}/${path}`

  var fontList = (await fonts()).map((font: { name }) => font.name)

  var page = await browser.newPage()
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
        postData: JSON.stringify(fontList)
      })
    } else {
      request.continue()
    }
  })
  await page.goto(url, { timeout: 0 })

  return page
})
