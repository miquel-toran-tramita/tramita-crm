import type { IProperty } from '@/modules/properties/interfaces/IProperty'
import type { IFilters } from '@/modules/properties/interfaces/IFilters'

const toNumber = (value: string | undefined | null): number => {
  if (!value) return 0
  const num = Number(value)
  return isNaN(num) ? 0 : num
}

export const orderTipoOfers = (tipo_ofer: string | null | undefined) => {
  if (!tipo_ofer) return -1

  const priorities = ['Casa', 'Casa con terreno', 'Ático', 'Piso', 'Local', 'Negocio', 'Oficina', 'Pareado', 'Entresuelo', 'Parking'] // generateProperties duplicated!!!!
  const indice = priorities.indexOf(tipo_ofer)

  return indice === -1 ? Infinity : indice // Si no está en el array, retorna un valor grande para ir al final
}

export const filterProperties = (properties: IProperty[], filters: IFilters): IProperty[] => {
  // Clonamos los objetos para evitar mutaciones directas
  let newProperties = properties.map((property) => ({
    ...property,
    hide: false,
  }))

  // Aplicamos filtros sin modificar el original
  newProperties = newProperties.map((property) => {
    const updatedProperty = { ...property }

    if (filters.city && updatedProperty.ciudad !== filters.city) updatedProperty.hide = true
    if (filters.zone && updatedProperty.zona !== filters.zone) updatedProperty.hide = true
    if (filters.tipoOfer.length && updatedProperty.tipo_ofer && !filters.tipoOfer.includes(updatedProperty.tipo_ofer))
      updatedProperty.hide = true

    if (!filters.nosell && updatedProperty.accion === 'Vender') updatedProperty.hide = true
    if (!filters.norent && updatedProperty.accion === 'Alquilar') updatedProperty.hide = true
    if (!filters.notransfer && updatedProperty.accion?.includes('Traspasar')) updatedProperty.hide = true

    if (updatedProperty.accion === 'Vender') {
      if (filters.priceMax && updatedProperty.precioCompra && updatedProperty.precioCompra > toNumber(filters.priceMax))
        updatedProperty.hide = true
      if (filters.priceMin && updatedProperty.precioCompra && updatedProperty.precioCompra < toNumber(filters.priceMin))
        updatedProperty.hide = true
    } else {
      if (filters.priceMax && updatedProperty.precioAlquiler && updatedProperty.precioAlquiler > toNumber(filters.priceMax))
        updatedProperty.hide = true
      if (filters.priceMin && updatedProperty.precioAlquiler && updatedProperty.precioAlquiler < toNumber(filters.priceMin))
        updatedProperty.hide = true
    }

    if (filters.sizeMax && updatedProperty.metrosCons && updatedProperty.metrosCons > toNumber(filters.sizeMax)) updatedProperty.hide = true
    if (filters.sizeMin && updatedProperty.metrosCons && updatedProperty.metrosCons < toNumber(filters.sizeMin)) updatedProperty.hide = true

    if (filters.rooms && updatedProperty.habitaciones && updatedProperty.habitaciones < toNumber(filters.rooms)) updatedProperty.hide = true
    if (filters.baths && updatedProperty.banyos && updatedProperty.banyos < toNumber(filters.baths)) updatedProperty.hide = true

    if (filters.ascensor && !updatedProperty.ascensor) updatedProperty.hide = true
    if (filters.terraza && !updatedProperty.terraza) updatedProperty.hide = true

    return updatedProperty
  })

  // Filtramos solo las propiedades visibles
  newProperties = newProperties.filter((property) => !property.hide)

  // Ordenamos de manera eficiente (solo una vez)
  const sortingFunctions: Record<string, (a: IProperty, b: IProperty) => number> = {
    'Más baratos': (a, b) => (a.precioCompra ?? 0) - (b.precioCompra ?? 0),
    'Más caros': (a, b) => (b.precioCompra ?? 0) - (a.precioCompra ?? 0),
    'Más pequeños': (a, b) => (a.metrosCons ?? 0) - (b.metrosCons ?? 0),
    'Más grandes': (a, b) => (b.metrosCons ?? 0) - (a.metrosCons ?? 0),
  }

  if (filters.orderBy && sortingFunctions[filters.orderBy]) {
    newProperties = [...newProperties].sort(sortingFunctions[filters.orderBy])
  } else {
    newProperties = [...newProperties].sort((a, b) => orderTipoOfers(a.tipo_ofer) - orderTipoOfers(b.tipo_ofer))
  }

  return newProperties
}

export const getFilters = (properties: IProperty[]) => {
  // Obtener tipos de oferta únicos
  const ofers = [...new Set(properties.map((property) => property.tipo_ofer).filter(Boolean))]

  // Obtener ciudades y zonas
  const locations = properties.map((property) => ({
    ciudad: property.ciudad ?? '',
    zona: (property.zona ?? '').replace('-', ''),
  }))

  // Agrupar por ciudad y eliminar zonas repetidas
  const groupedByCity = locations.reduce<Record<string, string[]>>((acc, item) => {
    if (!acc[item.ciudad]) acc[item.ciudad] = []

    const zonaRepeated = acc[item.ciudad].find((zona) => zona === item.zona)

    if (!zonaRepeated) acc[item.ciudad].push(item.zona)
    return acc
  }, {})

  // Construir las opciones de ubicación
  const locationsOptions = Object.keys(groupedByCity).map((ciudad) => {
    return {
      label: ciudad,
      subOptions: groupedByCity[ciudad],
    }
  })

  // Construir los filtros
  const filters = {
    ofers: ofers.sort((a, b) => orderTipoOfers(a) - orderTipoOfers(b)),
    locations: locationsOptions,
  }

  return filters
}
