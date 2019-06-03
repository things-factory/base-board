import { getRepository } from 'typeorm'
import { Board } from '../../../entities'
import { ListParams, buildQuery } from '@things-factory/shell'

export const boardsResolver = {
  async boards(_: any, params: ListParams, context: any) {
    const queryBuilder = getRepository(Board).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
