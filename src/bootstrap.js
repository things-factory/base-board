import { store } from '@things-factory/shell'
import { addRoutingType } from '@things-factory/base-menu'

export default function bootstrap() {
  store.dispatch(addRoutingType('VIEWER', 'board-viewer'))
  store.dispatch(addRoutingType('PLAYER', 'board-player'))
}
