export const getMondayOfDate = (date: Date): Date => {
  let newDate = new Date(date) // Crear una nueva instancia para no modificar el original
  // Obtener el día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)
  let dayOfWeek = newDate.getDay()

  // Calcular el desplazamiento para llegar al lunes
  let diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek // Si es domingo (0), mover al lunes anterior

  // Ajustar la fecha para obtener el lunes
  newDate.setDate(newDate.getDate() + diff)

  // Devolver el lunes con minutos y segundos redondeados a 0
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

export const buildHours = (): string[] => {
  let hours: string[] = []

  // de 6am a 23pm
  for (let i = 7; i <= 23; i++) {
    const hour = i.toString() //.padStart(2, '0') // Asegura que siempre tenga dos dígitos
    hours.push(`${hour}:00`)
  }

  return hours
}

export const compareDayDates = (a: Date, b: Date): boolean => {
  let dateA = new Date(a)
  let dateB = new Date(b)

  dateA.setHours(0, 0, 0, 0)
  dateB.setHours(0, 0, 0, 0)

  return dateA.getTime() === dateB.getTime()
}

export const compareHourDates = (a: Date, b: Date): boolean => {
  let dateA = new Date(a)
  let dateB = new Date(b)

  dateA.setHours(dateA.getHours(), 0, 0, 0)
  dateB.setHours(dateB.getHours(), 0, 0, 0)

  return dateA.getTime() === dateB.getTime()
}

export const isInDayHour = (date: Date): boolean => {
  const today: Date = new Date()
  const newDate: Date = new Date(date)

  today.setMinutes(0, 0, 0)
  newDate.setMinutes(0, 0, 0)

  return today.getTime() === newDate.getTime()
}

export const sumDays = (date: Date, nDays: number): Date => {
  let newDate = new Date(date) // Crear una nueva instancia para no modificar el original

  newDate.setDate(newDate.getDate() + (nDays - 1)) // Sumar los días
  return newDate
}

export const sumWeeks = (date: Date, nWeeks: number): Date => {
  let newDate = new Date(date) // Crear una nueva instancia para no modificar el original

  const daysToAdd = nWeeks * 7
  newDate.setDate(newDate.getDate() + daysToAdd)

  return newDate
}

export const prettyDate = (date: Date): string => {
  if (typeof date != 'object') {
    return ''
  }

  const currentMonth = date.getMonth() + 1

  let month = currentMonth < 10 ? `0${date.getMonth()}` : currentMonth

  return `${date.getDate()}/${month}/${date.getFullYear()}`
}

export const prettyDateLong = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat('es-ES', { month: 'long' })
  const month = formatter.format(date)

  return `${date.getDate()} de ${month} de ${date.getFullYear()}`
}

export const formatToInputDateTime = (date: Date): string => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`
}
