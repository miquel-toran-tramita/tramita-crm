import { api } from '@/modules/shared/scripts/api'
import { redirect } from '@sveltejs/kit'
import type { IProperty } from '@/modules/properties/interfaces/IProperty'
import type { IAgent } from '@/modules/users/interfaces/IAgent'

export const load = async ({ locals, fetch }) => {
  if (!locals.user) throw redirect(302, '/login')

  const responseProperties = await api.post('/api/private/properties', { customFetch: fetch })
  const responseAgents = await api.get('/api/private/agents', { customFetch: fetch })
  const propertiesData: IProperty[] = responseProperties.data
  const agentsData: IAgent[] = responseAgents.data
  const currentAgent = agentsData.find(agent => agent.id === locals.user.id)

  return { 
    user: locals.user,
    properties: propertiesData,
    agents: agentsData,
    currentAgent
  }
}