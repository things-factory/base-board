import { ADD_MODELLER_CONFIG } from '../actions/board.js'

const INITIAL_STATE = {
  modeller_configs: []
}

const board = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MODELLER_CONFIG:
      return {
        ...state,
        modeller_configs: [...state.modeller_configs, action.modeller_configs]
      }

    default:
      return state
  }
}

export default board
