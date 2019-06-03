import { buildQuery, ListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { PlayGroup } from '../../../entities'

export const playGroupsResolver = {
  async playGroups(_: any, params: ListParams, context: any) {
    const queryBuilder = getRepository(PlayGroup).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
