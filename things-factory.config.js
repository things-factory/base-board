import route from './src/route'
import bootstrap from './src/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'board-viewer',
      pageName: 'board-viewer'
    },
    {
      tagname: 'board-player',
      pageName: 'board-player'
    }
  ],
  bootstrap
}
