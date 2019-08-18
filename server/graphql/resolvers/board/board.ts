import { getRepository } from 'typeorm'
import { Board } from '../../../entities'

export const boardResolver = {
  async board(_, { id }, context, info) {
    return await getRepository(Board).findOne({
      where: { domain: context.domain, id },
      relations: ['domain', 'group', 'creator', 'updater']
    })
  }
}
