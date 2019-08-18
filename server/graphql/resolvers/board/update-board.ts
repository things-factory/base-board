import { getRepository } from 'typeorm'
import { Board, Group } from '../../../entities'
import { thumbnail } from '../../../controllers/thumbnail'

export const updateBoard = {
  async updateBoard(_, { id, patch }) {
    const repository = getRepository(Board)

    const board = await repository.findOne(
      { id },
      {
        relations: ['group']
      }
    )

    if (patch.model) {
      const base64 = await thumbnail({
        model: patch.model
      })

      patch.thumbnail = 'data:image/png;base64,' + base64.toString('base64')
    }

    if (patch.groupId) {
      const groupRepository = getRepository(Group)
      board.group = await groupRepository.findOne({
        id: patch.groupId
      })

      delete patch.groupId
    }

    return await repository.save({
      ...board,
      ...patch
    })
  }
}
