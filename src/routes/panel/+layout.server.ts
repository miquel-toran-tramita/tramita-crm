import { api } from '@/modules/shared/scripts/api'
import { redirect } from '@sveltejs/kit'
import { properties } from '@/store'
import type { IProperty } from '@/modules/properties/interfaces/IProperty.js'

export const load = async ({ locals, fetch }) => {
  if (!locals.user) throw redirect(302, '/login')

  const response = await api.post('/api/private/properties', { customFetch: fetch })
  const propertiesData: IProperty[] = response.data

  properties.set(propertiesData)

  return { user: locals.user }
}