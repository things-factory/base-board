import print from 'printer'

/**
 * shoot raw data to printer
 * 
 * @param printer Printer ID
 * @param command Raw command
 */
export async function printDirect(printer, command) {
  await print.printDirect({
    data: command,
    printer: printer,
    docname: 'RAW print',
    success: function(jobId) {
      console.log(`Job ID: ${jobId}`)
    },
    error: function(error) {
      console.error(error)
    }
  })
}

/**
 * get all installed printers
 */
export function getPrinters() {
  return print.getPrinters()
}

/**
 * get specific printer by name
 * @param printerName printer name
 */
export function getPrinter(printerName) {
  return print.getPrinter(printerName)
}

/**
 * get default printer name
 */
export function getDefaultPrinterName() {
  return print.getDefaultPrinterName()
}

export function getSupportedPrintFormats() {
  return print.getSupportedPrintFormats()
}