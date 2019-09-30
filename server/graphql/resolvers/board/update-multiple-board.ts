import { getRepository } from 'typeorm'
import { Board } from '../../../entities'

export const updateMultipleBoard = {
  async updateMultipleBoard(_: any, { patches }, context: any) {
    let results = []
    const _createRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === '+')
    const _deleteRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === '-')
    const _updateRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === 'M')
    const boardRepo = getRepository(Board)

    if (_createRecords.length > 0) {
      for (let i = 0; i < _createRecords.length; i++) {
        const newRecord = _createRecords[i]
        if (!newRecord.thumbnail) {
          newRecord.thumbnail = ''
        }
        const result = await boardRepo.save({
          domain: context.state.domain,
          ...newRecord,
          creator: context.state.user,
          updater: context.state.user
        })

        results.push({ ...result, cuFlag: '+' })
      }
    }

    if (_updateRecords.length > 0) {
      for (let i = 0; i < _updateRecords.length; i++) {
        const newRecord = _updateRecords[i]
        const board = await boardRepo.findOne(newRecord.id)

        const result = await boardRepo.save({
          ...board,
          ...newRecord,
          updater: context.state.user
        })

        results.push({ ...result, cuFlag: 'M' })
      }
    }

    if (_deleteRecords.length > 0) {
      for (let i = 0; i < _deleteRecords.length; i++) {
        const newRecord = _deleteRecords[i]
        const result = await boardRepo.delete(newRecord.id)

        results.push({ ...result, cuFlag: '-' })
      }
    }
    return results
  }
}
