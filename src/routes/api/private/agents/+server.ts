import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { db } from '@/db/client'
import { User, Agent } from '@/db/tables'
import { eq, and } from 'drizzle-orm'

export const GET: RequestHandler = async () => {
  try {
    const agents = await db.select().from(Agent)
    return json(agents)
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json()

  const conditions = []
  if (data.id) conditions.push(eq(User.id, data.id))

  const users = await db
    .select()
    .from(User)
    .where(and(...conditions))

  const usersWithoutPassword = users.map(({ password, ...user }) => user)

  const response = data.id ? usersWithoutPassword[0] : usersWithoutPassword
  return json(response)
}

export const PUT: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json()

    const updateData: Partial<typeof Agent> = {}
    if ('username' in data) updateData.username = data.username
    if ('phone' in data) updateData.phone = data.phone
    if ('menuMinimalist' in data) updateData.menuMinimalist = data.menuMinimalist
    if ('darkMode' in data) updateData.darkMode = data.darkMode

    await db.update(Agent).set(updateData).where(eq(Agent.id, data.id))

    return json({ success: true })
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}
