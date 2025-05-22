import type { IFilters } from '@/modules/properties/interfaces/IFilters'

export const ORDER_BY_OPTIONS: string[] = ['Más baratos', 'Más caros', 'Más grandes', 'Más pequeños']

export const PRICES: string[] = [
  '10.000 €',
  '30.000 €',
  '60.000 €',
  '80.000 €',
  '100.000 €',
  '120.000 €',
  '140.000 €',
  '150.000 €',
  '160.000 €',
  '180.000 €',
  '200.000 €',
  '250.000 €',
  '300.000 €',
  '400.000 €',
  '500.000 €',
]

export const SIZES: string[] = [
  '40 m²',
  '60 m²',
  '80 m²',
  '100 m²',
  '120 m²',
  '140 m²',
  '160 m²',
  '180 m²',
  '200 m²',
  '250 m²',
  '300 m²',
  '350 m²',
  '400 m²',
  '450 m²',
  '500 m²',
  '600 m²',
  '700 m²',
  '800 m²',
  '900 m²',
]

export const ROOMS_BATHS = ['1+', '2+', '3+', '4+']

export const DEFAULT_FILTERS: IFilters = Object.freeze({
  city: '',
  zone: '',
  orderBy: '',
  priceMin: '',
  priceMax: '',
  sizeMin: '',
  sizeMax: '',
  rooms: '',
  baths: '',
  nosell: true,
  norent: true,
  notransfer: true,
  terraza: false,
  ascensor: false,
  tipoOfer: [],
})

export const FILTERS_COUNTER = ['']
