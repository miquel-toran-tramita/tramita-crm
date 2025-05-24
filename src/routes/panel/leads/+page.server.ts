import { redirect } from '@sveltejs/kit'
import { api } from '@/modules/shared/scripts/api'


export const load = async ({ locals, fetch }) => {
    if (!locals.user) throw redirect(302, '/login')
  
    const responseLeads = await api.get('/api/private/leads', { customFetch: fetch })


    return {
        leads: responseLeads.data,
    }
  }