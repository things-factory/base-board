import { getRepository } from 'typeorm'
import { Group } from '../../../entities'

export const createGroup = {
  async createGroup(_, { group }, context) {
    return await getRepository(Group).save({
      domain: context.state.domain,
      ...group,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
