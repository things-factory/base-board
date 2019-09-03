import { getRepository } from 'typeorm'
import { Group } from '../../../entities'

export const groupResolver = {
  async group(_, { id }, context, info) {
    return await getRepository(Group).findOne({
      where: { domain: context.state.domain, id },
      relations: ['domain', 'creator', 'updater']
    })
  }
}
