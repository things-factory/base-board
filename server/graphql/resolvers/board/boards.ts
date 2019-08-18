import { getRepository } from 'typeorm'
import { Board } from '../../../entities'
import { ListParam, buildQuery } from '@things-factory/shell'

export const boardsResolver = {
  async boards(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(Board).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('Inventory.domain', 'Domain')
      .leftJoinAndSelect('Inventory.creator', 'Creator')
      .leftJoinAndSelect('Inventory.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
