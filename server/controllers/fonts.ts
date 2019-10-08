import { getRepository } from 'typeorm'
import { Font } from '@things-factory/font-base'

export const fonts = async () => {
  return await getRepository(Font).find({ select: ['name'] })
}
