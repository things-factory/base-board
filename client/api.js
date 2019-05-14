export var fetchBoardList = async (by, id) => {
  /*
    by : group | playGroup | recent
  */
}

export var fetchBoard = async id => {}

export var createBoard = async board => {
  /*
    board: {
      name        : String!
      description : String
      model       : String!
      width       : Int
      height      : Int
      published   : Boolean
    }
  */
}

export var updateBoard = async board => {
  /*
    board: {
      name        : String
      description : String
      model       : String
      width       : Int
      height      : Int
      published   : Boolean
    }
  */
}

export var deleteBoard = async id => {}

export var setAPI = api => {
  for (let exp in api) {
    switch (exp) {
      case 'fetchBoardList':
        fetchBoardList = api[exp]
        break
      case 'fetchBoard':
        fetchBoard = api[exp]
        break
      case 'createBoard':
        createBoard = api[exp]
        break
      case 'deleteBoard':
        deleteBoard = api[exp]
        break
    }
  }
}
