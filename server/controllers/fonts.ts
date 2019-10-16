import { getRepository } from 'typeorm'
import { Font } from '@things-factory/font-base'

export const fonts = () => getRepository(Font).find({ select: ['name'] })
