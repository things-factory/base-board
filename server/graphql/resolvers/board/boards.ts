import { getRepository } from 'typeorm'
import { Board } from '../../../entities'
import { ListParam, buildQuery } from '@things-factory/shell'

export const boardsResolver = {
  async boards(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(Board).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('Board.domain', 'Domain')
      .leftJoinAndSelect('Board.creator', 'Creator')
      .leftJoinAndSelect('Board.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
