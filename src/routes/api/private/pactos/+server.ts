import { db } from '@/db/client'
import { Pactos } from '@/db/tables'
import { eq } from 'drizzle-orm'
import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import { randomUUID } from 'crypto'

export const GET: RequestHandler = async () => {
  try {
    const pactos = await db.select().from(Pactos)

    return json(pactos)
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { title, content, contracts } = await request.json()

    await db.insert(Pactos).values({ id: randomUUID(), title, content, contracts })

    return json({ status: 'success' })
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}

export const PUT: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json()

    const newSet: any = {}
    if ('title' in data) newSet.title = data.title
    if ('content' in data) newSet.content = data.content
    if ('contracts' in data) newSet.contracts = data.contracts

    await db.update(Pactos).set(newSet).where(eq(Pactos.id, data.id))

    return json({ status: 'success' })
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}

export const DELETE: RequestHandler = async ({ request }) => {
  try {
    const { id } = await request.json()

    await db.delete(Pactos).where(eq(Pactos.id, id))

    return json({ status: 'success' })
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}
