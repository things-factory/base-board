import { getRepository } from 'typeorm'
import { PlayGroup } from '../../../entities'

export const playGroupResolver = {
  async playGroup(_, { id }, context, info) {
    return await getRepository(PlayGroup).findOne({
      where: { domain: context.domain, id },
      relations: ['domain', 'boards', 'creator', 'updater']
    })
  }
}
