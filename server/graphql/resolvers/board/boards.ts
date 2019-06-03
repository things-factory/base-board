import { getRepository } from 'typeorm'
import { Board } from '../../../entities'
import { ListParam, buildQuery } from '@things-factory/shell'

export const boardsResolver = {
  async boards(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(Board).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
