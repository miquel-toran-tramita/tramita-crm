import type { IEvent } from '@/modules/calendar/interfaces/IEvent'

export interface IGrid {
  date?: Date
  events?: IEvent[]
  special?: string
}
