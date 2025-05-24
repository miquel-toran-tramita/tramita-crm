import type { SvgStore } from "@/modules/shared/interfaces/ISvgStore"

export interface ICard {
  href: string
  icon: keyof SvgStore
  title: string
}
