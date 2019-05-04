import { ADD_BOARD_COMPONENTS } from '../actions/board.js'

const INITIAL_STATE = {
  components: []
}

const board = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BOARD_COMPONENTS:
      return {
        ...state,
        components: [...state.components, ...action.components]
      }

    default:
      return state
  }
}

export default board
