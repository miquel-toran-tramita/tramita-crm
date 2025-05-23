import { db } from '@/db/client'
import { Property } from '@/db/tables'
import { eq, and } from 'drizzle-orm'
import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'

const propertyFields: (keyof typeof Property._.columns)[] = [
  'ref',
  'titulo',
  'descripcion',
  'accion',
  'tipo_ofer',
  'precioCompra',
  'precioAlquiler',
  'ciudad',
  'provincia',
  'zona',
  'cp',
  'orientacion',
  'direccion',
  'latitud',
  'altitud',
  'metrosCons',
  'metrosUtiles',
  'metrosParcela',
  'habitaciones',
  'banyos',
  'aseos',
  'conservacion',
  'antiguedad',
  'planta',
  'numplanta',
  'ascensor',
  'garajedoble',
  'nplazasparking',
  'jardin',
  'piscina_com',
  'piscina_prop',
  'terraza',
  'metrosCocina',
  'metrosComedor',
  'metrosTerraza',
  'numfotos',
  'fotos',
  'energiaLetra',
  'energiaValor',
  'emisionesLetra',
  'emisionesValor',
  'destacado',
  'opcioncompra',
  'aconsultar',
  'distmar',
  'gastos_com',
  'comunidadincluida',
  'habdobles',
  'fechaact',
  'adaptadominus',
  'airecentral',
  'aire_con',
  'bar',
  'barbacoa',
  'cajafuerte',
  'keycalefa',
  'keysuelo',
  'calefacentral',
  'calefaccion',
  'descalcificador',
  'despensa',
  'diafano',
  'electro',
  'esquina',
  'galeria',
  'plaza_gara',
  'gasciudad',
  'gimnasio',
  'habjuegos',
  'tipomensual',
  'hidromasaje',
  'jacuzzi',
  'lavanderia',
  'linea_tlf',
  'luminoso',
  'ibi',
  'luz',
  'muebles',
  'ojobuey',
  'parking',
  'patio',
  'preinstaacc',
  'primera_line',
  'puerta_blin',
  'satelite',
  'sauna',
  'solarium',
  'sotano',
  'mirador',
  'apartseparado',
  'tour',
  'tourScenes',
  'googleDriveFolders',
]

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json()

  const conditions = []
  if (data.ref) conditions.push(eq(Property.ref, data.ref))

  let selectedFields: Record<string, any> = {}

  if (data?.columns) {
    for (const field of propertyFields) {
      if (data?.columns.includes(field)) {
        selectedFields[field] = Property[field]
      }
    }
  }

  if (Object.keys(selectedFields).length === 0) {
    selectedFields = Property
  }

  try {
    const properties = await db
      .select(selectedFields)
      .from(Property)
      .where(and(...conditions))

    // Ordenar por tipo_ofer
    const orderTipoOfers = (tipo: string) => {
      const order = ['Venta', 'Alquiler', 'Alquiler Vacacional']
      return order.indexOf(tipo)
    }

    const sortedProperties = [...properties].sort(
      (a, b) => orderTipoOfers(a.tipo_ofer || '') - orderTipoOfers(b.tipo_ofer || '')
    )

    return json(sortedProperties)
  } catch (err) {
    return json([])
  }
}

export const PUT: RequestHandler = async ({ request }) => {
  const data = await request.json()

  if (Object.keys(data).length < 2) {
    return json({ success: false, error: '¡No has pasado ningún parámetro!' }, { status: 400 })
  }

  const updateData: Record<string, any> = {}

  for (const field of propertyFields) {
    if (field in data) {
      updateData[field] = data[field]
    }
  }

  try {
    await db.update(Property).set(updateData).where(eq(Property.ref, data.ref))

    return json({ success: true })
  } catch (err) {
    return json({ success: false, error: err instanceof Error ? err.message : 'Error desconocido' }, { status: 500 })
  }
}
