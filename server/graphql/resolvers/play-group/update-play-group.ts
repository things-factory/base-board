import { getRepository } from 'typeorm'
import { PlayGroup } from '../../../entities'

export const updatePlayGroup = {
  async updatePlayGroup(_, { id, patch }, context) {
    const repository = getRepository(PlayGroup)

    const playGroup = await repository.findOne({ id })

    return await repository.save({
      ...playGroup,
      ...patch,
      updater: context.state.user
    })
  }
}
