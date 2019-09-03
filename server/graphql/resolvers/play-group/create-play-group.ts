import { getRepository } from 'typeorm'
import { PlayGroup } from '../../../entities'

export const createPlayGroup = {
  async createPlayGroup(_, { playGroup }, context) {
    return await getRepository(PlayGroup).save({
      domain: context.state.domain,
      ...playGroup,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
