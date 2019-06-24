import { ADD_BOARD_COMPONENTS } from '../actions/board.js'

const INITIAL_STATE = {
  components: [],
  editors: {
    legend: 'property-editor-legend',
    number: 'property-editor-number',
    angle: 'property-editor-angle',
    string: 'property-editor-string',
    textarea: 'property-editor-textarea',
    checkbox: 'property-editor-checkbox',
    select: 'property-editor-select',
    color: 'property-editor-color',
    'solid-color-stops': 'property-editor-solid-colorstops',
    'gradient-color-stops': 'property-editor-gradient-colorstops',
    'multiple-color': 'property-editor-multiple-color',
    'editor-table': 'property-editor-table',
    'image-selector': 'property-editor-image-selector',
    options: 'property-editor-options',
    date: 'property-editor-date'
  }
}

const board = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BOARD_COMPONENTS:
      let components = action.components

      let addedEditors = {}
      for (let component in components) {
        let editors = components[component].editors

        editors &&
          editors.forEach(editor => {
            let { type, component } = editor

            addedEditors[type] = component
          })
      }

      return {
        ...state,
        components: [...state.components, ...action.components],
        editors: {
          ...state.editors,
          ...addedEditors
        }
      }

    default:
      return state
  }
}

export default board
