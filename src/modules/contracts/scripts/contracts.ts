const unidades: string[] = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
const especiales: string[] = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince']
const decenas: string[] = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']
const centenas: string[] = [
  '',
  'ciento',
  'doscientos',
  'trescientos',
  'cuatrocientos',
  'quinientos',
  'seiscientos',
  'setecientos',
  'ochocientos',
  'novecientos',
]

const convertirEntero = (n: number): string => {
  if (n === 0) return 'cero'
  if (n === 100) return 'cien'

  let palabras = ''

  if (n >= 1_000_000) {
    const millones = Math.floor(n / 1_000_000)
    palabras += millones === 1 ? 'un millón' : convertirEntero(millones) + ' millones'
    n %= 1_000_000
    if (n > 0) palabras += ' '
  }

  if (n >= 1000) {
    const miles = Math.floor(n / 1000)
    palabras += miles === 1 ? 'mil' : convertirEntero(miles) + ' mil'
    n %= 1000
    if (n > 0) palabras += ' '
  }

  if (n >= 100) {
    const centena = Math.floor(n / 100)
    palabras += centenas[centena]
    n %= 100
    if (n > 0) palabras += ' '
  }

  if (n >= 10 && n <= 15) {
    palabras += especiales[n - 10]
  } else if (n >= 16 && n <= 19) {
    palabras += 'dieci' + unidades[n - 10]
  } else if (n >= 20 && n <= 29) {
    palabras += n === 20 ? 'veinte' : 'veinti' + unidades[n - 20]
  } else if (n >= 30) {
    const decena = Math.floor(n / 10)
    const unidad = n % 10
    palabras += decenas[decena]
    if (unidad > 0) palabras += ' y ' + unidades[unidad]
  } else if (n > 0) {
    palabras += unidades[n]
  }

  return palabras
}

export const numberToWord = (num: number): string => {
  if (isNaN(num)) return ''

  const entero = Math.floor(num)
  const decimal = Math.round((num - entero) * 100)

  let resultado = convertirEntero(entero)

  if (decimal > 0) {
    resultado += ' con ' + convertirEntero(decimal)
    resultado += decimal === 1 ? ' céntimo' : ' céntimos'
  }

  return resultado
}

export const checkDNI = (id: string): boolean => {
  const letters = 'TRWAGMYFPDXBNJZSQVHLCKE'
  const cleaned = id.toUpperCase().trim()

  let numberPart: string
  let letter: string

  // NIE
  if (/^[XYZ]\d{7}[A-Z]$/.test(cleaned)) {
    const prefix = cleaned[0]
    const replacement = { X: '0', Y: '1', Z: '2' }[prefix]
    numberPart = replacement + cleaned.slice(1, 8)
    letter = cleaned[8]
  }
  // DNI
  else if (/^\d{8}[A-Z]$/.test(cleaned)) {
    numberPart = cleaned.slice(0, 8)
    letter = cleaned[8]
  }
  // Invalid format
  else {
    return false
  }

  const number = parseInt(numberPart, 10)
  const expectedLetter = letters[number % 23]

  return letter === expectedLetter
}
