export async function labelPrinterHandler(
  { type: printerType, name: printerName, txtRecord },
  { accept, content, name, options }
) {
  var { ['service-url']: serviceUrl } = txtRecord
  /* content should be a element */
  const board = typeof content == 'function' ? await content.call() : content

  /*
   * 프린트 서비스를 호출한다.
   * 서비스명 : GET /print-label/${content.id}?printerId=${name}
   */

  // const response = await fetch(`/print-label/${board.id}?printerId=${printerName}`, {
  //   method: 'GET',
  //   credentials: 'include',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json'
  //   }
  // })

  /*
   * 프린트 서비스를 호출한다.
   * 서비스명 : POST /print
   * 파라미터 : printerId, data
   */
  const response = await fetch(`${serviceUrl ? serviceUrl : ''}/print`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      printerId: printerName,
      data: board
    })
  })

  if (response.ok) {
    return true
  } else {
    throw new Error(response.status)
  }
}
