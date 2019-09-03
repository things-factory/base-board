import { getRepository } from 'typeorm'
import { Board, Group } from '../../../entities'

import { thumbnail } from '../../../controllers/thumbnail'

export const createBoard = {
  async createBoard(_, { board }, context) {
    const repository = getRepository(Board)
    const groupRepository = getRepository(Group)

    const newBoard = {
      ...board,
      group: await groupRepository.findOne({
        id: board.groupId
      })
    }

    const base64 = await thumbnail({
      model: board.model
    })

    newBoard.thumbnail = 'data:image/png;base64,' + base64.toString('base64')

    return await repository.save({
      domain: context.state.domain,
      ...newBoard,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
