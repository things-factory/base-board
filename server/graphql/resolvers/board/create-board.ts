import { getRepository } from 'typeorm'
import { Group, Board } from '../../../entities'

import { thumbnail } from '../../../controllers/thumbnail'

export const createBoard = {
  async createBoard(_, { board, groupId }, context) {
    const repository = getRepository(Board)
    const newBoard = {
      ...board
    }

    const groupRepository = getRepository(Group)
    newBoard.group = await groupRepository.findOne({
      id: groupId
    })

    const base64 = await thumbnail({
      model: board.model
    })

    newBoard.thumbnail = 'data:image/png;base64,' + base64.toString('base64')

    return await repository.save({
      ...newBoard,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id
    })
  }
}
