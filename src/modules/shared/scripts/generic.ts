export const getQueryParams = (url: string = '') => {
  if (!url) return

  const parsedUrl = new URL(url)
  const queryParams: any = {}

  for (let [key, value] of parsedUrl.searchParams.entries()) {
    queryParams[key] = value
  }

  return queryParams
}

export const addQueryParam = (key: string, value: string | number) => {
  const parsedUrl = new URL(window.location.href)

  if (!value) {
    parsedUrl.searchParams.delete(key)
  } else {
    parsedUrl.searchParams.set(key, value.toString())
  }

  window.history.replaceState({}, '', parsedUrl.toString())
}

export const toNumber = (str: string): number => {
  if (!str) return 0

  // Limpiar dejando solo dígitos, puntos, comas y signo negativo
  const cleanedStr = str.replace(/[^0-9.,-]/g, '')

  if (cleanedStr.includes(',') && cleanedStr.includes('.')) {
    // Formato europeo: "1.234.567,89"
    return parseFloat(cleanedStr.replace(/\./g, '').replace(',', '.'))
  }

  if (cleanedStr.includes(',')) {
    // Formato con coma decimal: "123,45"
    return parseFloat(cleanedStr.replace(',', '.'))
  }

  if (cleanedStr.includes('.')) {
    // Asumimos que los puntos son separadores de miles: "15.000" → "15000"
    const parts = cleanedStr.split('.')
    if (parts.every((p) => /^\d+$/.test(p))) {
      return parseFloat(parts.join(''))
    }
  }

  // Ningún separador → parse directo
  return parseFloat(cleanedStr)
}

export const formatPrice = (x: number | string, withDecimals: boolean = false): string => {
  if (!x) return '0'

  let value: string
  let negative: string = ''

  if (typeof x === 'number') {
    negative = x < 0 ? '-' : ''

    value = x.toFixed(2).toString().replace('.', ',')
  } else {
    value = x
  }

  // Only numbers and comma
  value = value.replace(/[^0-9,]/g, '')

  // Decimals
  const splitByComa = value.split(',')
  const decimals = splitByComa.length === 2 ? `,${splitByComa[1]}` : ''
  value = splitByComa[0]

  // Remove left 0
  if (value.length > 1) value = value.replace(/^0+/, '')

  // Add dots
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  // Add negative char if needed + symbol
  value = negative + value

  // Add decimals
  if (withDecimals) value = value + decimals.substring(0, 3)

  return value
}

export const currencyToNumber = (currency: string): number => {
  if (!currency) return 0

  // Elimina puntos (separadores de miles) y reemplaza la coma decimal por punto
  const normalized = currency.replace(/\./g, '').replace(',', '.')
  const parsed = parseFloat(normalized)
  const rounded = Math.round(parsed * 100) / 100

  return isNaN(rounded) ? 0 : rounded
}

export const slugify = (text: string): string => {
  if (!text) return ''

  return text
    .normalize('NFD') // Normalize to NFD Unicode form
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

export const copyToClipboard = (text: string) => {
  if (!text) return
  navigator.clipboard.writeText(text)
}

export const formatToDatetimeLocal = () => {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // Meses empiezan en 0
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  // Formatear en "yyyy-MM-ddTHH:mm"
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export const formatToInputDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Meses empiezan en 0
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const capitalize = (str: string) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const blobToBase64 = (blob: Blob | any) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}

// Eliminar el prefijo "data:image/png;base64," si está presente
export const base64ToBuffer = (base64: string) => {
  const base64String = base64.split(',')[1] // Si tienes el prefijo 'data:image/png;base64,'
  return Buffer.from(base64String, 'base64')
}

export const prettyResult = (num: number): string => {
  if (!num) return '0'

  let str = num.toFixed(2).replace('.', ',')
  return str.endsWith(',00') ? str.slice(0, -3) : str
}

export const debounce = (fn: () => void, delay: number = 300) => {
  let timeout: any

  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(fn, delay)
  }
}
