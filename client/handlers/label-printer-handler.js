export async function labelPrinterHandler(
  { type: printerType, name: printerName },
  { accept, content, name, options }
) {
  /* content should be a element */
  const board = typeof content == 'function' ? content.call() : content

  /*
   * 프린트 서비스를 호출한다.
   * 서비스명 : GET /print-label/${content.id}?printerId=${name}
   */

  const response = await fetch(`/print-label/${board.id}?printerId=${printerName}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  if (response.ok) {
    return true
  } else {
    throw new Error(response.status)
  }
}
