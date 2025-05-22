import { parseString } from 'xml2js'
import type { IProperty } from '@/modules/properties/interfaces/IProperty'
import { PUBLIC_INMOVILLA_XML } from '$env/static/public'

const parseXml = (xmlString: string) => {
  return new Promise((resolve, reject) => {
    parseString(xmlString, { trim: true, explicitArray: false }, (err: any, result: any) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const isFiniteNumber = (value: any): boolean => {
  return typeof value === 'number' && isFinite(value)
}

const sanitizeData = (data: any): any => {
  if (typeof data === 'number') {
    return isFiniteNumber(data) ? data : null
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeData)
  }

  if (typeof data === 'object' && data !== null) {
    const sanitizedData: any = {}
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        sanitizedData[key] = sanitizeData(data[key])
      }
    }
    return sanitizedData
  }

  return data
}

const mapProperties = (result: any): IProperty[] => {
  const rawProperties = result?.propiedades?.propiedad || []

  let properties = rawProperties.map((property: any) => {
    return {
      ref: property.ref,
      id: property.id,
      titulo: property.titulo1,
      descripcion: property.descrip1.replaceAll('~', '<br>'),
      accion: property.accion,
      tipo_ofer: property.tipo_ofer,
      precioCompra: Math.round(Number(property.precioinmo)),
      precioAlquiler: Math.round(Number(property.precioalq)),
      ciudad: property.ciudad,
      provincia: property.provincia,
      zona: property.zona,
      cp: Number(property.cp),
      orientacion: property.orientacion,
      direccion: property.direccion,
      latitud: Number(property.latitud),
      altitud: Number(property.altitud),
      tour: property.tour,
      metrosCons: Number(property.m_cons),
      metrosUtiles: Number(property.m_uties),
      metrosParcela: Number(property.m_parcela),
      habitaciones: Number(property.habitaciones) + Number(property.habdobles),
      banyos: Number(property.banyos),
      aseos: Number(property.aseos),
      conservacion: property.conservacion,
      antiguedad: property.antiguedad,
      planta: property.planta,
      numplanta: Number(property.numplanta),
      ascensor: Number(property.ascensor),
      garajedoble: Number(property.garajedoble),
      nplazasparking: Number(property.nplazasparking),
      jardin: Number(property.jardin),
      piscina_com: Number(property.piscina_com),
      piscina_prop: Number(property.piscina_prop),
      terraza: Number(property.terraza),
      metrosCocina: Number(property.m_cocina),
      metrosComedor: Number(property.m_comedor),
      metrosTerraza: Number(property.m_terraza),
      numfotos: Number(property.numfotos),
      fotos: [
        property.foto1,
        property.foto2,
        property.foto3,
        property.foto4,
        property.foto5,
        property.foto6,
        property.foto7,
        property.foto8,
        property.foto9,
        property.foto10,
        property.foto11,
        property.foto12,
        property.foto13,
        property.foto14,
        property.foto15,
        property.foto16,
        property.foto17,
      ],
      energiaLetra: property.energialetra,
      energiaValor: Number(property.energiavalor),
      emisionesLetra: property.emisionesletra,
      emisionesValor: Number(property.emisionesvalor),
      destacado: Number(property.destacado),
      opcioncompra: Number(property.opcioncompra),
      aconsultar: Number(property.aconsultar),
      distmar: Number(property.distmar),
      gastos_com: Number(property.gastos_com),
      comunidadincluida: Number(property.comunidadincluida),
      habdobles: Number(property.habdoble || 0),
      fechaact: property.fechaact,
      adaptadominus: Number(property.adaptadominus),
      airecentral: Number(property.airecentral),
      aire_con: Number(property.aire_con),
      bar: Number(property.bar),
      barbacoa: Number(property.barbacoa),
      cajafuerte: Number(property.cajafuerte),
      keycalefa: Number(property.keycalefa),
      keysuelo: Number(property.keysuelo),
      calefacentral: Number(property.calefacentral),
      calefaccion: Number(property.calefaccion),
      descalcificador: Number(property.descalcificador),
      despensa: Number(property.despensa),
      diafano: Number(property.diafano),
      electro: Number(property.electro),
      esquina: Number(property.esquina),
      galeria: Number(property.galeria),
      plaza_gara: Number(property.plaza_gara),
      gasciudad: Number(property.gasciudad),
      gimnasio: Number(property.gimnasio),
      habjuegos: Number(property.habjuegos),
      tipomensual: property.tipomensual,
      hidromasaje: Number(property.hidromasaje),
      jacuzzi: Number(property.jacuzzi),
      lavanderia: Number(property.lavanderia),
      linea_tlf: Number(property.linea_tlf),
      luminoso: Number(property.luminoso),
      ibi: Number(property.ibi),
      luz: Number(property.luz),
      muebles: Number(property.muebles),
      ojobuey: Number(property.ojobuey),
      parking: Number(property.parking),
      patio: Number(property.patio),
      preinstaacc: Number(property.preinstaacc),
      primera_line: Number(property.primera_line),
      puerta_blin: Number(property.puerta_blin),
      satelite: Number(property.satelite),
      sauna: Number(property.sauna),
      solarium: Number(property.solarium),
      sotano: Number(property.sotano),
      mirador: Number(property.mirador),
      apartseparado: Number(property.apartseparado),
      bombafriocalor: Number(property.bombafriocalor),
      buhardilla: Number(property.buhardilla),
      pergola: Number(property.pergola),
      tv: Number(property.tv),
      terrazaacris: Number(property.terrazaacris),
      todoext: Number(property.todoext),
      trastero: Number(property.trastero),
      urbanizacion: Number(property.urbanizacion),
      vestuarios: Number(property.vestuarios),
      video_port: Number(property.video_port),
      vistasalmar: Number(property.vistasalmar),
      cocina_inde: Number(property.cocina_inde),
      keyelectricidad: Number(property.keyelectricidad),
      keyfachada: Number(property.keyfachada),
      keyagua: Number(property.keyagua),
      keyvista: Number(property.keyvista),
      keytecho: Number(property.keytecho),
      montana: Number(property.montana),
      rural: Number(property.rural),
      costa: Number(property.costa),
      vallado: Number(property.vallado),
      autobuses: Number(property.autobuses),
      centros_comerciales: Number(property.centros_comerciales),
      tranvia: Number(property.tranvia),
      zonas_infantiles: Number(property.zonas_infantiles),
      colegios: Number(property.colegios),
      arboles: Number(property.arboles),
      hospitales: Number(property.hospitales),
      tren: Number(property.tren),
      metro: Number(property.metro),
      estadoficha: Number(property.estadoficha),
      exclu: Number(property.exclu),
      keyagente: Number(property.keyagente),
      golf: Number(property.golf),
      chimenea: Number(property.chimenea),
      depoagua: Number(property.depoagua),
      alarma: Number(property.alarma),
      alarmaincendio: Number(property.alarmaincendio),
      alarmarobo: Number(property.alarmarobo),
      arma_empo: Number(property.arma_empo),
      agente: property.agente,
      agenteEmail: property.email_agente,
      agenteTelf: property.tlf_agente,
    }
  })

  properties = properties.map((property: IProperty) => {
    // Remove nulls
    property.fotos = property.fotos.filter((foto: any) => foto)

    property.fotos = property.fotos.map((foto: any) => {
      return typeof foto === 'object' ? foto._ : foto
    })

    return sanitizeData(property)
  })

  return properties
}

export const fetchProperties = async (customFetch: typeof fetch = fetch): Promise<IProperty[]> => {
  const url = PUBLIC_INMOVILLA_XML || ''

  if (!url || !url.startsWith('http')) {
    throw new Error('Invalid PUBLIC_INMOVILLA_XML URL. Must be a valid HTTP URL.')
  }

  const response = await customFetch(url)
  const rawData = await response.text()
  const result = await parseXml(rawData)
  
  return mapProperties(result)
}
