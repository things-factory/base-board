const puppeteer = require('puppeteer')

var _browser: any

export async function initializeChromium() {
  if (!_browser) {
    _browser = await puppeteer.launch({
      // devtools: true,
      args: ['--hide-scrollbars', '--mute-audio', '--no-sandbox']
    })
  }

  return _browser
}
