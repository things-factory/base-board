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
