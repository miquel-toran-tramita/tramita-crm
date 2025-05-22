import { Property } from '@/db/tables'
import { db } from '@/db/client'
import { fetchProperties } from '@/modules/properties/scripts/inmovilla'
import type { IProperty } from '@/modules/properties/interfaces/IProperty'
import { api } from '@/modules/shared/scripts/api'
import { eq, inArray } from 'drizzle-orm'
import type { RequestEvent } from '@sveltejs/kit'

// Función para normalizar valores
const normalizeValue = (value: any): any => {
  if (value === undefined || value === '') return null
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' && isNaN(value)) return null
  return value
}

// Función para comparar dos propiedades
const havePropertiesChanged = (existing: any, incoming: any): boolean => {
  // Lista de campos a ignorar en la comparación
  const ignoreFields = ['id', 'googleDriveFolders']
  
  // Obtener todas las claves únicas de ambos objetos
  const allKeys = new Set([
    ...Object.keys(existing),
    ...Object.keys(incoming)
  ])

  for (const key of allKeys) {
    // Ignorar campos específicos
    if (ignoreFields.includes(key)) continue

    const existingValue = normalizeValue(existing[key])
    const incomingValue = normalizeValue(incoming[key])

    // Comparación especial para arrays (como fotos)
    if (Array.isArray(existingValue) && Array.isArray(incomingValue)) {
      if (existingValue.length !== incomingValue.length) return true
      for (let i = 0; i < existingValue.length; i++) {
        if (normalizeValue(existingValue[i]) !== normalizeValue(incomingValue[i])) return true
      }
      continue
    }

    // Comparación normal para otros tipos de valores
    if (existingValue !== incomingValue) {
      return true
    }
  }

  return false
}

export const GET = async ({ fetch }: RequestEvent) => {
  try {
    const properties: IProperty[] = await fetchProperties(fetch)

    // Obtener registros actuales de la base de datos
    const currentProperties = await db.select().from(Property)

    // Crear mapas para facilitar la comparación usando ref como clave
    const currentMap = new Map(
      currentProperties
        .filter((p) => p.ref !== null)
        .map((p) => [p.ref, p])
    )
    const newMap = new Map(
      properties
        .filter((p) => p.ref !== null && p.ref !== undefined)
        .map((p) => [p.ref, p])
    )

    // Identificar inserciones, actualizaciones y eliminaciones
    const toInsert = []
    const toUpdate = []
    const toDelete = []

    for (const property of properties) {
      if (!property.ref) continue // Ignorar propiedades sin referencia

      const existing = currentMap.get(property.ref)
      if (!existing) {
        // No existe en la base de datos, insertar
        // Eliminar el id para que SQLite lo genere automáticamente
        const { id, ...propertyWithoutId } = property
        toInsert.push(propertyWithoutId)
      } else if (havePropertiesChanged(existing, property)) {
        // Existe y tiene cambios reales
        toUpdate.push({ ...property, id: existing.id })
      }
    }

    // Identificar eliminaciones
    for (const current of currentProperties) {
      if (current.ref && !newMap.has(current.ref)) {
        // No está en los nuevos datos, eliminar
        toDelete.push(current.id)
      }
    }

    // Realizar las operaciones en la base de datos
    if (toInsert.length) await db.insert(Property).values(toInsert)

    if (toUpdate.length > 0) {
      for (const property of toUpdate) {
        const { id, ...propertyWithoutId } = property
        await db.update(Property).set(propertyWithoutId).where(eq(Property.id, id))
      }
    }

    if (toDelete.length > 0) {
      await db.delete(Property).where(inArray(Property.id, toDelete))
    }

    const result = {
      toInsert: toInsert.length,
      toUpdate: toUpdate.length,
      toDelete: toDelete.length,
    }

    return api.sendSuccessResponse(result)
  } catch (err) {
    return api.sendErrorResponse(err)
  }
}