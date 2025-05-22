import type { SvgStore } from '@/modules/shared/interfaces/ISvgStore'

export interface ISectionViewer {
    title: string
    icon: keyof SvgStore
}