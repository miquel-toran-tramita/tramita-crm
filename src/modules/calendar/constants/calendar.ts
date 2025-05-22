import type { IDicRepeater, IDicTypes, IDicStatus, IDicDuration, IDicEventTypes } from '@/modules/calendar/interfaces/IEvent'
import type { ILabelValue } from '@/modules/shared/interfaces/ILabelValue'

export const dicRepeater: IDicRepeater = {
  X: 'Una vez',
  D: 'Cada día',
  S: 'Cada semana',
  M: 'Cada mes',
  T: 'Cada trimestre',
  Y: 'Cada año',
}

// Revisar Event.svelte
export const dicTypes: IDicTypes = {
  G: 'General',
  V: 'Visita',
  T: 'Tasación',
  S: 'Seguimiento',
  R: 'Reunión',
  A: 'Asuntos personales',
  X: 'Recordatorio',
  L: 'Llamada',
  C: 'Cierre',
}

export const dicStatus: IDicStatus = {
  A: 'Activa',
  C: 'Cancelada',
  F: 'Finalizada',
}

export const dicDuration: IDicDuration = {
  A: '1/2 Hora',
  B: '1 Hora',
  C: '2 Horas',
  D: '3 Horas',
  E: '4 Horas',
  F: '8 Horas',
  X: 'Todo el día',
}

export const eventDesigns: IDicEventTypes = {
  G: {
    icon: 'calendar',
    bg: 'rgba(15, 133, 111, 0.2)',
    color: 'var(--colorPrimary)',
  },
  V: {
    icon: 'car',
    bg: 'rgba(	220,20,60, 0.3)',
    color: 'crimson',
  },
  T: {
    icon: 'valuation',
    bg: 'rgba(221, 160, 221, 0.3)',
    color: 'plum',
  },
  S: {
    icon: 'eye',
    bg: 'rgba(100,149,237, 0.3)',
    color: 'cornflowerblue',
  },
  R: {
    icon: 'groups',
    bg: 'rgba(244,164,96, 0.3)',
    color: 'sandybrown',
  },
  A: {
    icon: 'calendar',
    bg: 'rgba(255, 0, 0, 0.3)',
    color: 'red',
  },
  X: {
    icon: 'warning',
    bg: 'rgba(255, 0, 0, 0.3)',
    color: 'red',
  },
  L: {
    icon: 'phone',
    bg: 'rgba(255, 0, 0, 0.3)',
    color: 'red',
  },
  C: {
    icon: 'key',
    bg: 'rgba(255, 0, 0, 0.3)',
    color: 'red',
  },
}

export const weekDays: string[] = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO']
export const monthNames: string[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

export const organizeByOptions: ILabelValue[] = [
  {
    label: 'Agentes',
    value: 'agent',
  },
  {
    label: 'Tipos',
    value: 'type',
  },
]
