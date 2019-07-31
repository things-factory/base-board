import { store } from '@things-factory/shell'

import { REGISTER_PRINTER_TYPE } from '@things-factory/print-base'
import { labelPrinterHandler } from './handlers/label-printer-handler'

export default function bootstrap() {
  store.dispatch({
    type: REGISTER_PRINTER_TYPE,
    printerType: 'label',
    handler: labelPrinterHandler
  })
}
