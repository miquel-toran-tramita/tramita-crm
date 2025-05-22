// https://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero/COVCCallejero.svc/json/help
// https://www.catastro.hacienda.gob.es/ws/Webservices_Libres.pdf
// REF ejemplo: 5396301DF3859E0017UD

import type { ICatastroData } from '@/modules/properties/interfaces/ICatastroData'

const mapResponse = (data: any): ICatastroData => {
  const base = data?.consulta_dnprcResult?.bico

  const dataMapped: ICatastroData = {
    provincia: base?.bi?.dt?.np || '',
    ciudad: base?.bi?.dt?.nm || '',
    tipoVia: base?.bi?.dt?.locs?.lous?.lourb?.dir?.tv || '',
    calle: base?.bi?.dt?.locs?.lous?.lourb?.dir?.nv || '',
    bloque: base?.bi?.dt?.locs?.lous?.lourb.loint?.bq || '',
    numero: base?.bi?.dt?.locs?.lous?.lourb?.dir?.pnp || '',
    escalera: base?.bi?.dt?.locs?.lous?.lourb?.loint?.es || '',
    piso: base?.bi?.dt?.locs?.lous?.lourb?.loint?.pt || '',
    puerta: base?.bi?.dt?.locs?.lous?.lourb?.loint?.pu || '',
    cp: base?.bi?.dt?.locs?.lous?.lourb?.dp || '',
    construccion: Number(base?.bi?.debi?.ant),
    metrosCons: Number(base?.lcons[0]?.dfcons?.stl),
    metrosComunes: Number(base?.lcons[1]?.dfcons?.stl),
  }

  return dataMapped
}

export const getPropertyDataFromCatastro = async (refCatastral: string): Promise<ICatastroData> => {
  const apiURL = `https://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero/COVCCallejero.svc/json/Consulta_DNPRC?RefCat=${refCatastral}`

  try {
    const response = await fetch(apiURL)
    const data = await response.json()

    return mapResponse(data)
  } catch (err) {
    console.error(err)
  }
}
