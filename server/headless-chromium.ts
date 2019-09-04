const puppeteer = require('puppeteer')

function initializeChromium() {
  return puppeteer.launch({
    // devtools: true,
    args: ['--hide-scrollbars', '--mute-audio', '--no-sandbox']
  })
}

export const browser = initializeChromium()
export const labelPage = browser.then(async browser => {
  return await browser.newPage()
})
module.exports.browser = browser
module.exports.labelPage = labelPage
