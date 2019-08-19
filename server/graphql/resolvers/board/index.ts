import { boardResolver } from './board'
import { boardsResolver } from './boards'

import { updateBoard } from './update-board'
import { createBoard } from './create-board'
import { deleteBoard } from './delete-board'

export const Query = {
  ...boardsResolver,
  ...boardResolver
}

export const Mutation = {
  ...updateBoard,
  ...createBoard,
  ...deleteBoard
}
