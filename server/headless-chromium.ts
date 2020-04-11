const puppeteer = require('puppeteer')

var _browser: any

async function setup() {
  _browser = await puppeteer.launch({
    // devtools: true,
    args: ['--hide-scrollbars', '--mute-audio', '--no-sandbox'],
  })

  _browser.on('disconnected', setup)
}

export async function initializeChromium() {
  if (!_browser) {
    await setup()
  }

  return _browser
}
