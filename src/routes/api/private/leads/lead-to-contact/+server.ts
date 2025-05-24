import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import { db } from '@/db/client'
import { Lead } from '@/db/tables'
import { eq } from 'drizzle-orm'
import { api } from '@/modules/shared/scripts/api'

export const POST: RequestHandler = async ({ params, request }) => {
  try {
    const lead = await request.json()
   
    await api.post('/api/private/contacts', { data: lead})
    await db.delete(Lead).where(eq(Lead.id, lead.id))

    return json({ success: true })
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}
