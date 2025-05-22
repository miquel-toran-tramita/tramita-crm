import type { SvgStore } from '@/modules/shared/interfaces/ISvgStore'

export interface IMenuItem {
  title: string
  icon: keyof SvgStore
  link: string
  favorite?: boolean
  subitem?: IMenuItem[]
}
