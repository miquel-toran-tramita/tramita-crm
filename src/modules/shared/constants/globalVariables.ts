import type { IMenuItem } from '@/modules/shared/interfaces/IMenuItem'

export const BREAKPOINT = 1170
export const MENU_HEIGHT = 70

const basePathname = '/panel'

export const menuItemsUp: IMenuItem[] = [
  { title: 'Propiedades', icon: 'apartment', link: `${basePathname}/propiedades` },
  { title: 'Agenda', icon: 'calendar', link: `${basePathname}/agenda` },
  //{ title: 'Seguimiento', icon: 'lupa', link: `${basePathname}/seguimiento` },
  { title: 'Leads', icon: 'groups', link: `${basePathname}/leads` },
  { title: 'Contactos', icon: 'person', link: `${basePathname}/contactos` },
  { title: 'Calculadoras', icon: 'calculator', link: `${basePathname}/calculadoras` },
  { title: 'Escaparates', icon: 'blog', link: `${basePathname}/generador-de-escaparates` },
  { title: 'Espacio QR', icon: 'qr', link: `${basePathname}/espacio-qr` },
  { title: 'Contratos', icon: 'contract', link: `${basePathname}/contratos` },
]

export const menuItemsDown: IMenuItem[] = [{ title: 'Ajustes', icon: 'settings', link: `${basePathname}/ajustes` }]
