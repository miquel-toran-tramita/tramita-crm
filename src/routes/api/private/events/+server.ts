import type { RequestHandler } from '@sveltejs/kit'
import { randomUUID } from 'crypto'
import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { db } from '@/db/client'
import { Event, EventAgent } from '@/db/tables'
import type { IEvent } from '@/modules/calendar/interfaces/IEvent'

export const GET: RequestHandler = async () => {
  try {
    const events = await db.select().from(Event)

    return json(events)
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}
export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json()
    const newId = randomUUID()

    const newEvent = {
      id: newId,
      title: data.title,
      description: data.description,
      status: data.status,
      type: data.type,
      repeater: data.repeater,
      duration: data.duration,
      date: data.date,
      agent: data.agent,
      property: data.property || null,
      contact: data.contact || null,
    }

    await db.insert(Event).values(newEvent)

    // Insertar relaciones en EventAgent
    if (data.relatedAgents.length > 0) {
      await Promise.all(
        data.relatedAgents.map((agentId: string) =>
          db.insert(EventAgent).values({
            event: newId,
            agent: agentId,
          })
        )
      )
    }

    return json(newEvent)
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}

export const PUT: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json()

    const newSet: any = {}
    if ('title' in data) newSet.title = data.title
    if ('description' in data) newSet.description = data.description
    if ('status' in data) newSet.status = data.status
    if ('type' in data) newSet.type = data.type
    if ('repeater' in data) newSet.repeater = data.repeater
    if ('duration' in data) newSet.duration = data.duration
    if ('date' in data) newSet.date = data.date
    if ('agent' in data) newSet.agent = data.agent
    if ('property' in data) newSet.property = data.property
    if ('contact' in data) newSet.contact = data.contact

    // Actualizar el evento
    await db.update(Event).set(newSet).where(eq(Event.id, data.id))

    // Eliminar relaciones antiguas en EventAgent
    await db.delete(EventAgent).where(eq(EventAgent.event, data.id))

    // Insertar nuevas relaciones en EventAgent
    const relatedAgents: string[] = data.relatedAgents.split(',')
    await Promise.all(
      relatedAgents.map((agentId: string) =>
        db.insert(EventAgent).values({
          event: data.id,
          agent: agentId,
        })
      )
    )

    return json({ success: true, message: 'Event updated successfully' })
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}

export const DELETE: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json()
    // Eliminar relaciones en EventAgent
    await db.delete(EventAgent).where(eq(EventAgent.event, data.id))

    // Eliminar el evento
    await db.delete(Event).where(eq(EventAgent.event, data.id))

    return json({ success: true, message: 'Event deleted successfully' })
  } catch (err) {
    return json({ error: err }, { status: 500 })
  }
}
