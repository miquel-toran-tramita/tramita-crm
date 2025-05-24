import { api } from '@/modules/shared/scripts/api'
import { redirect } from '@sveltejs/kit'
import type { IProperty } from '@/modules/properties/interfaces/IProperty'
import type { IAgent } from '@/modules/users/interfaces/IAgent'
import type { IContact } from '@/modules/contacts/interfaces/IContact'

export const load = async ({ locals, fetch }) => {
  if (!locals.user) throw redirect(302, '/login')

  const responseProperties = await api.post('/api/private/properties', { customFetch: fetch })
  const responseAgents = await api.get('/api/private/agents', { customFetch: fetch })
  const responseContacts = await api.get('/api/private/contacts', { customFetch: fetch })
  const responseEvents = await api.get('/api/private/events', { customFetch: fetch })
  const propertiesData: IProperty[] = responseProperties.data
  const agentsData: IAgent[] = responseAgents.data
  const contactsData: IContact[] = responseContacts.data
  const eventsData: IContact[] = responseEvents.data
  const currentAgent: IAgent = agentsData.find((agent) => agent.id === locals.user.id) as IAgent

  return {
    user: locals.user,
    properties: propertiesData,
    agents: agentsData,
    contacts: contactsData,
    events: eventsData,
    currentAgent,
  }
}
