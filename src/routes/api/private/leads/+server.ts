import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import { db } from '@/db/client'
import { Lead } from '@/db/tables'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'

export const GET: RequestHandler = async () => {
  try {
    const leads = await db.select().from(Lead)

    return json(leads)
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json()

    await db
      .insert(Lead)
      .values({ id: randomUUID(), name: data.name, email: data.email, phone: data.phone, message: data.message, context: data.context })

    return json({ success: true })
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}

export const DELETE: RequestHandler = async ({ request }) => {
  try {
    const lead = await request.json()

    await db.delete(Lead).where(eq(Lead.id, lead))

    return json({ success: true })
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}
