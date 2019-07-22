export function buildLabelPrintCommand(imageData, width, height, orientation, mirror, upsideDown) {
  var grf = imageDataToGrf(imageData, width, height, orientation, mirror, upsideDown)

  return `
^XA
^GFA,${grf}
^FS
^XZ`
}

export function imageDataToGrf(imageData, width, height, orientation = 'N', mirror = false, upsideDown = false) {
  var printWidth = width,
    printHeight = height
  var lay = false

  var startX = 0,
    startY = 0,
    endX = printWidth,
    endY = printHeight

  switch (orientation) {
    case 'R':
    case 'r':
    case 90:
      printWidth = height
      printHeight = width

      if (mirror) {
        startX = 0
        endX = printWidth
      } else {
        startX = 1 - printWidth
        endX = 1
      }
      if (upsideDown) {
        startY = 1 - printHeight
        endY = 1
      } else {
        startY = 0
        endY = printHeight
      }
      lay = true
      break
    case 'I':
    case 'i':
    case 180:
      if (mirror) {
        startX = 0
        endX = printWidth
      } else {
        startX = 1 - printWidth
        endX = 1
      }
      if (upsideDown) {
        startY = 0
        endY = printHeight
      } else {
        startY = 1 - printHeight
        endY = 1
      }
      break
    case 'B':
    case 'b':
    case 270:
      printWidth = height
      printHeight = width

      if (mirror) {
        startX = 1 - printWidth
        endX = 1
      } else {
        startX = 0
        endX = printWidth
      }
      if (upsideDown) {
        startY = 0
        endY = printHeight
      } else {
        startY = 1 - printHeight
        endY = 1
      }
      lay = true
      break
    case 'N':
    case 'n':
    case 0:
    default:
      if (mirror) {
        startX = 1 - printWidth
        endX = 1
      }
      if (upsideDown) {
        startY = 1 - printHeight
        endY = 1
      }
  }

  const R = 0
  const G = 1
  const B = 2
  const A = 3
  const THRESHOLD = 95

  // 이미지의 가로 한 줄당 바이트
  const bytesPerLine = (printWidth + 7) >> 3 // var bytesPerLine = Math.ceil(width / 8)

  // 이미지 너비와 grf 포맷에서 사용할 비트의 차이
  const diff = (bytesPerLine << 3) - printWidth

  // GRF 사이즈 = 가로 바이트 사이즈 * 세로
  const grfSize = bytesPerLine * printHeight

  // 가로 한 줄당 최대 문자 수 (바이트 당 두 글자)
  const maxCharsOfLine = bytesPerLine << 1

  // grf 압축을 위한 앞뒤 문자 비교용 그릇
  var shortInt = new Uint8Array(1)

  // zpl 이미지 포맷에 맞게 압축된 문자열
  var zippedGrf = ''

  // 압축 전 grf 포맷에서 중복되는 문자 수
  var count = 1

  // 비교 기준 문자
  var baseNibble = null

  // 비교 대상 문자
  var objectNibble = null

  // 현재 처리중인 가로 한 줄 문자열
  var currentLine = ''

  // 이전 줄 문자열
  var previousLine = ''

  // 도트 단위 처리를 위해 이미지 크기만큼 루프
  for (var cursorY = startY; cursorY < endY; cursorY++) {
    let y = Math.abs(cursorY)
    for (var cursorX = startX, sequenceX = 0; cursorX < endX; cursorX++, sequenceX++) {
      let x = Math.abs(cursorX) // 이미지 회전 시 이 값을 사용

      let j = lay ? width * x + y : width * y + x // 현재 도트 좌표 (처리중인 도트)
      let i = j << 2 // 이미지 데이터의 도트 좌표 (도트 * 4)

      // 도트의 밝기
      let luminance = imageData[i + R] * 0.21 + imageData[i + G] * 0.71 + imageData[i + B] * 0.07
      // Alpha 값이 낮을 수록 luminance가 높아지는 것으로 본다.
      luminance = luminance + ((255 - imageData[i + A]) * (255 - luminance)) / 255

      shortInt[0] <<= 1 // 도트 좌표 이동
      if (luminance < THRESHOLD) shortInt[0] |= 1 // THRESHOLD 값으로 칠할지 여부 판단, 어두우면 칠함

      // 4도트마다 압축 로직 적용 (16진수 문자 하나마다 압축 로직 적용)
      if ((sequenceX & 3) == 3) {
        // 현재 처리하는 바이트의 뒷 4자리(16진수 문자 하나)를 비교 대상으로 정한다.
        objectNibble = shortInt[0] & 0b1111

        // 행의 첫 문자는 비교 기준 문자로 정하고 다음 문자로 루프 넘김
        if (sequenceX == 3) {
          baseNibble = objectNibble
          continue
        }

        /**
         * 기준 문자와 대상 문자 비교하여 같은 문자가 나오면 count를 올리고
         * 다른 문자가 나오면 기준이었던 문자와 count를 사용해 압축,
         * 가로 줄 문자열에 추가
         */
        if (baseNibble === objectNibble) count++
        else {
          currentLine += compressHexString(baseNibble.toString(16), count)
          count = 1
          baseNibble = objectNibble
        }
      }
    }

    // 끝의 8도트는 남는 도트 수만큼 왼쪽으로 밀어줌
    shortInt[0] <<= diff

    // 니블을 16진수 문자화
    var baseChar = baseNibble.toString(16)

    // 행의 마지막 바이트 압축 처리
    if (diff != 0) {
      // 차이가 4를 넘었을 때 앞 니블이 위의 루프에서 처리되지 않으므로 여기서 함
      if (diff > 4) {
        if (baseNibble == shortInt[0] >> 4) count++
        else {
          currentLine += compressHexString(baseChar, count)
          count = 1
          baseNibble = shortInt[0] >> 4
        }
      }
      // 뒷 니블 처리
      if (baseNibble == (shortInt[0] & 15)) count++
      else {
        currentLine += compressHexString(baseChar, count)
        count = 1
        baseNibble = shortInt[0] & 15
      }
    }

    // 줄 마지막에 압축된 문자를 더함
    // 이 줄 전부가 같은 문자인지 여부
    var isOverTheLineMax = count >= maxCharsOfLine
    // 이 줄이 모두 0이면 ','로 압축
    if (isOverTheLineMax && baseNibble == 0) currentLine += ','
    // 이 줄이 모두 F이면 '!'로 압축
    else if (isOverTheLineMax && baseNibble == 0xf) currentLine += '!'
    // 아니면 그냥 압축
    else currentLine += compressHexString(baseChar, count)
    count = 1
    // 이전 줄과 현재 줄의 내용이 같으면 ':'로 압축, 아니면 그냥 추가함
    if (currentLine == previousLine) zippedGrf += ':'
    else zippedGrf += currentLine
    // 초기화하고 루프로 돌아감
    previousLine = currentLine
    currentLine = ''
  }
  return `${grfSize},${grfSize},${bytesPerLine},${zippedGrf}`
}

// GRF 데이터를 압축
function compressHexString(char, count) {
  const MAP_CODE = '\0GHIJKLMNOPQRSTUVWXYg' // 1 ~ 20
  const MAP_CODE_2 = '\0ghijklmnopqrstuvwxyz' // (1 ~ 20) * 20
  var result = ''
  if (count > 1) {
    while (count > 400) {
      result += MAP_CODE_2[20]
      count -= 400
    }
    if (count > 20) {
      var multi20 = Math.trunc(count / 20)
      var resto20 = count % 20
      result += MAP_CODE_2[multi20]
      if (resto20) result += MAP_CODE[resto20]
    } else result += MAP_CODE[count]
  }
  result += char
  return result
}
