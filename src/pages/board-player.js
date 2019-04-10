import { store } from '@things-factory/shell'
import { html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '@things-factory/base-menu/src/components/menu'

class BoardPlayer extends connect(store)(LitElement) {
  static get properties() {
    return {
      menuId: String,
      menus: Array,
      routingTypes: Object
    }
  }
  render() {
    return html`
      <section>
        <h2>Board Player</h2>
      </section>
    `
  }

  stateChanged(state) {}
}

window.customElements.define('board-player', BoardPlayer)
