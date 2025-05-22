import type { ITourScene } from '@/modules/properties/interfaces/ITourScene'

export interface IFolderStructure {
  mainFolder: {
    id: string
    name: string
  }
  subfolders: {
    id: string
    name: string
  }[]
}

export interface IProperty {
  id: number
  ref?: string
  titulo?: string | null
  descripcion?: string | null
  accion?: string | null
  tipo_ofer?: string | null
  precioCompra?: number | null
  precioAlquiler?: number | null
  ciudad?: string | null
  provincia?: string | null
  zona?: string | null
  cp?: number | null
  orientacion?: string | null
  direccion?: string | null
  latitud?: number | null
  altitud?: number | null
  tour?: string | null
  tourScenes?: ITourScene[] | null
  metrosCons?: number | null
  metrosUtiles?: number | null
  metrosParcela?: number | null
  habitaciones?: number | null
  banyos?: number | null
  aseos?: number | null
  conservacion?: string | null
  antiguedad?: string | null
  planta?: string | null
  numplanta?: number | null
  ascensor?: number | null
  garajedoble?: number | null
  nplazasparking?: number | null
  jardin?: number | null
  piscina_com?: number | null
  piscina_prop?: number | null
  terraza?: number | null
  metrosCocina?: number | null
  metrosComedor?: number | null
  metrosTerraza?: number | null
  numfotos?: number | null
  fotos?: string[] | any
  energiaLetra?: string | null
  energiaValor?: number | null
  emisionesLetra?: string | null
  emisionesValor?: number | null
  destacado?: number | null
  opcioncompra?: number | null
  aconsultar?: number | null
  distmar?: number | null
  gastos_com?: number | null
  comunidadincluida?: number | null
  habdobles?: number | null
  fechaact?: string | null
  adaptadominus?: number | null
  airecentral?: number | null
  aire_con?: number | null
  bar?: number | null
  barbacoa?: number | null
  cajafuerte?: number | null
  keycalefa?: number | null
  keysuelo?: number | null
  calefacentral?: number | null
  calefaccion?: number | null
  descalcificador?: number | null
  despensa?: number | null
  diafano?: number | null
  electro?: number | null
  esquina?: number | null
  galeria?: number | null
  plaza_gara?: number | null
  gasciudad?: number | null
  gimnasio?: number | null
  habjuegos?: number | null
  tipomensual?: string | null
  hidromasaje?: number | null
  jacuzzi?: number | null
  lavanderia?: number | null
  linea_tlf?: number | null
  luminoso?: number | null
  ibi?: number | null
  luz?: number | null
  muebles?: number | null
  ojobuey?: number | null
  parking?: number | null
  patio?: number | null
  preinstaacc?: number | null
  primera_line?: number | null
  puerta_blin?: number | null
  satelite?: number | null
  sauna?: number | null
  solarium?: number | null
  sotano?: number | null
  mirador?: number | null
  apartseparado?: number | null
  bombafriocalor?: number | null
  buhardilla?: number | null
  pergola?: number | null
  tv?: number | null
  terrazaacris?: number | null
  todoext?: number | null
  trastero?: number | null
  urbanizacion?: number | null
  vestuarios?: number | null
  video_port?: number | null
  vistasalmar?: number | null
  cocina_inde?: number | null
  keyelectricidad?: number | null
  keyfachada?: number | null
  keyagua?: number | null
  keyvista?: number | null
  keytecho?: number | null
  montana?: number | null
  rural?: number | null
  costa?: number | null
  vallado?: number | null
  autobuses?: number | null
  centros_comerciales?: number | null
  tranvia?: number | null
  zonas_infantiles?: number | null
  colegios?: number | null
  arboles?: number | null
  hospitales?: number | null
  tren?: number | null
  metro?: number | null
  estadoficha?: number | null
  exclu?: number | null
  keyagente?: number | null
  golf?: number | null
  chimenea?: number | null
  depoagua?: number | null
  alarma?: number | null
  alarmaincendio?: number | null
  alarmarobo?: number | null
  arma_empo?: number | null
  agente?: string | null
  agenteEmail?: string | null
  agenteTelf?: string | null
  photosLoaded?: boolean | null
  hide?: boolean
  googleDriveFolders?: IFolderStructure | null
}
