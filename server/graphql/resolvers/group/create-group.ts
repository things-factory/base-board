import { getRepository } from 'typeorm'
import { Group } from '../../../entities'

export const createGroup = {
  async createGroup(_, { group }, context) {
    return await getRepository(Group).save({
      domain: context.domain,
      ...group,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id
    })
  }
}
