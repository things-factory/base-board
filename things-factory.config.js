import route from './src/route'
import bootstrap from './src/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'board-viewer-page',
      pageName: 'board-viewer'
    },
    {
      tagname: 'board-player-page',
      pageName: 'board-player'
    }
  ],
  bootstrap
}
