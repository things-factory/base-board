import { buildQuery, ListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Group } from '../../../entities'

export const groupsResolver = {
  async groups(_: any, params: ListParams, context: any) {
    const queryBuilder = getRepository(Group).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
