import { CLICK_MODES, BRIDGE_OPTIONS } from '@/modules/properties/constants/tourVirtual'
import { Vector3 } from 'three'

export type BridgeType = (typeof BRIDGE_OPTIONS)[keyof typeof BRIDGE_OPTIONS]
export type ClickModeType = (typeof CLICK_MODES)[keyof typeof CLICK_MODES] | ''
export interface IBridge {
  id?: string
  type: BridgeType
  text?: string
  destiny?: string
  x?: number
  y?: number
  z?: number
  normalFace?: Vector3
}
export interface ITourScene {
  id: string
  image: string
  cover: string
  text?: string
  bridges: IBridge[]
}
export interface IPoints {
  x: number
  y: number
  z: number
  normalFace?: Vector3
}
