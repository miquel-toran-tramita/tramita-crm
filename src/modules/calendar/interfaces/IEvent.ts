import { dicTypes, dicRepeater, dicStatus, dicDuration } from '@/modules/calendar/constants/calendar'

export interface IDicRepeater {
  X: string
  D: string
  S: string
  M: string
  T: string
  Y: string
}

// Actualizar IDicEventTypes!!!
export interface IDicTypes {
  V: string
  T: string
  S: string
  R: string
  A: string
  X: string
  L: string
  C: string
  G: string
}

export interface IEventType {
  icon: string
  bg: string
  color: string
}
export interface IDicEventTypes {
  V: IEventType
  T: IEventType
  S: IEventType
  R: IEventType
  A: IEventType
  X: IEventType
  L: IEventType
  C: IEventType
  G: IEventType
}

export interface IDicStatus {
  A: string
  C: string
  F: string
}

export interface IDicDuration {
  A: string
  B: string
  C: string
  D: string
  E: string
  F: string
  X: string
}

type Repeater = keyof typeof dicRepeater | ''
type EventType = keyof typeof dicTypes | ''
type Status = keyof typeof dicStatus | ''
type Duration = keyof typeof dicDuration | ''

export interface IEvent {
  id?: string
  title?: string
  description?: string
  status?: Status
  type?: EventType
  repeater?: Repeater
  duration?: Duration
  date?: string
  agent?: string | null
  property?: string | null
  contact?: string | null
  relatedAgents?: string // 'idAgent,idAgent,idAgent'
}
