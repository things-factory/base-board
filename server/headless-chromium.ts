const puppeteer = require('puppeteer')

function initializeChromium() {
  return puppeteer.launch({
    // devtools: true,
    args: ['--hide-scrollbars', '--mute-audio', '--no-sandbox']
  })
}

export const browser = initializeChromium()
export const page = browser.then(async browser => {
  var pages = await browser.pages()
  return pages[0]
})
module.exports.browser = browser
module.exports.page = page
