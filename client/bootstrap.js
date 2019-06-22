import { store } from '@things-factory/shell'

import board from './reducers/board'
import { APPEND_PRINTER, REGISTER_PRINTER_TYPE } from '@things-factory/print-base'
import { labelPrinterHandler } from './handlers/label-printer-handler'

export default function bootstrap() {
  store.addReducers({ board })

  store.dispatch({
    type: REGISTER_PRINTER_TYPE,
    printerType: 'label',
    handler: labelPrinterHandler
  })

  store.dispatch({
    type: APPEND_PRINTER,
    printer: {
      type: 'label',
      name: 'Zebra_Technologies_ZTC_GT800__EPL_'
    }
  })
}
