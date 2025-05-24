import { randomUUID } from 'crypto'
import { json } from '@sveltejs/kit'
import { eq, sql, and, or } from 'drizzle-orm'
import { db } from '@/db/client'
import { Contact } from '@/db/tables'

export const GET = async ({ url }) => {
  try {
    const buyer = url.searchParams.get('buyer')
    const seller = url.searchParams.get('seller')
    const search = url.searchParams.get('search')?.toLowerCase() ?? ''
    const conditions = []
    
    
    if (buyer === 'true') {
      conditions.push(eq(Contact.buyer, true))
    }
    
    if (seller === 'true') {
      conditions.push(eq(Contact.seller, true))
    }


    if (search) {
      const pattern = `%${search}%`
      conditions.push(
        or(
          sql`LOWER(${Contact.name}) LIKE ${pattern}`,
          sql`LOWER(${Contact.surname}) LIKE ${pattern}`,
          sql`LOWER(${Contact.email}) LIKE ${pattern}`,
          sql`LOWER(${Contact.phone}) LIKE ${pattern}`,
          sql`LOWER(${Contact.dni}) LIKE ${pattern}`
        )
      )
    }

    const contacts = await db
      .select()
      .from(Contact)
      .where(and(...conditions))


    return json(contacts)
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return json({ success: false, error: errorMsg }, { status: 500 })
  }
}

export const POST = async ({ request }) => {
  try {
    const data: any = await request.json()

    await db.insert(Contact).values({
      id: randomUUID(),
      avatar: data.avatar ?? null,
      name: data.name,
      surname: data.surname ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      dni: data.dni ?? '',
      nation: data.nation ?? '',
      birth: data.birth ?? '',
      profesion: data.profesion ?? '',
      comments: data.comments ?? '',
      buyer: data.buyer ?? false,
      seller: data.seller ?? false,
      timePreference: data.timePreference ?? '',
      contactPreference: data.contactPreference ?? '',
      importantInfo: data.importantInfo ?? '',
      agent: data.agent ?? null,
      contactWay: data.contactWay ?? null,
      userId: null,
      process: data.process ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return json({ success: true })
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return json({ success: false, error: errorMsg }, { status: 400 })
  }
}

export const PUT = async ({ request }) => {
  try {
    const data: any = await request.json()
    const keys = Object.keys(data)
    const newData: any = {}

    if (keys.includes('activatedAccount')) newData.accountActivated = data.accountActivated
    if (keys.includes('password')) newData.password = data.password
    if (keys.includes('process')) newData.process = data.process

    if (Object.keys(newData).length) {
      await db.update(Contact).set(newData).where(eq(Contact.id, data.id))
    }

    return new Response('', { status: 200 })
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return json({ success: false, error: errorMsg }, { status: 400 })
  }
}
