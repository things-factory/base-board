import { store } from '@things-factory/shell'
import { html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '@things-factory/base-menu/src/components/menu'

class BoardViewer extends connect(store)(LitElement) {
  static get properties() {
    return {
      menuId: String,
      menus: Array,
      routingTypes: Object,
      resourceId: String,
      data: Object
    }
  }
  render() {
    return html`
      <section>
        <h2>Board Viewer</h2>
      </section>
    `
  }

  stateChanged(state) {
    if (state.app.page === 'board-viewer' && this.resourceId !== state.app.resourceId) {
      this.resourceId = state.app.resourceId
      this._fetchData()
    }
  }

  async _fetchData() {
    const res = await fetch(`http://52.231.75.202/rest/scenes/${this.resourceId}`, {
      credentials: 'include'
    })

    if (res.ok) {
      this.data = await res.json()
      console.log('Board data responsed', this.data)
    }
  }
}

window.customElements.define('board-viewer', BoardViewer)
