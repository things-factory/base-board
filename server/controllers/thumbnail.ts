import { screenshot } from './screenshot'

export const thumbnail = async ({
  id = '',
  model = null,
  data = null,
  options = { encoding: 'base64', type: 'png' } as any
} = {}) => {
  return await screenshot({
    id,
    model,
    data,
    options,
    isThumbnail: true
  })
}
