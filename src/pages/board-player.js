import { store } from '@things-factory/shell'
import { html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '@things-factory/base-menu/src/components/menu'

class BoardPlayer extends connect(store)(LitElement) {
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
        <h2>Board Player</h2>
      </section>
    `
  }

  stateChanged(state) {
    if (state.app.page.toLowerCase() === 'board-player' && this.resourceId !== state.app.resourceId) {
      this.resourceId = state.app.resourceId
      this._fetchData()
    }
  }

  async _fetchData() {
    const params = new URLSearchParams()
    params.append('sort', JSON.stringify([{ field: 'description', ascending: true }]))

    const res = await fetch(`http://52.231.75.202/rest/scenes/list/${this.resourceId}?${params}`, {
      credentials: 'include'
    })

    if (res.ok) {
      this.data = await res.json()
      console.log('Player data responsed', this.data)
    }
  }
}

window.customElements.define('board-player', BoardPlayer)
