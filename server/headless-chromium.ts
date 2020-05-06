const puppeteer = require('puppeteer')
import { config } from '@things-factory/env'

const CHROMIUM_PATH = config.get('CHROMIUM_PATH')

var _browser: any

async function setup() {
  var launchSetting = {
    // devtools: true,
    args: ['--hide-scrollbars', '--mute-audio', '--no-sandbox']
  }

  if (CHROMIUM_PATH) {
    launchSetting['executablePath'] = CHROMIUM_PATH
  }

  _browser = await puppeteer.launch(launchSetting)

  _browser.on('disconnected', setup)
}

export async function initializeChromium() {
  if (!_browser) {
    await setup()
  }

  return _browser
}
