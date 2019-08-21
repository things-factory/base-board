import { getRepository } from 'typeorm'
import { Group } from '../../../entities'

export const updateGroup = {
  async updateGroup(_, { id, patch }, context) {
    const repository = getRepository(Group)

    const group = await repository.findOne({ id })

    return await repository.save({
      ...group,
      ...patch,
      updater: context.state.user
    })
  }
}
