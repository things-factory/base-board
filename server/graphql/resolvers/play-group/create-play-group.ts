import { getRepository } from 'typeorm'
import { PlayGroup } from '../../../entities'

export const createPlayGroup = {
  async createPlayGroup(_, { playGroup }, context) {
    return await getRepository(PlayGroup).save({
      domain: context.domain,
      ...playGroup,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id
    })
  }
}
