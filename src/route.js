export default function route(page) {
  switch (page) {
    case 'board-viewer':
      import('./pages/board-viewer')
      return true

    case 'board-player':
      import('./pages/board-player')
      return true
  }
}
