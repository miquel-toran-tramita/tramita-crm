import { db } from '@/db/client'
import { User, Session, Agent } from '@/db/tables'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'

export const POST = async ({ request, cookies }) => {
  const { email, password } = await request.json()

  const found = (
    await db
      .select()
      .from(Agent)
      .innerJoin(User, eq(Agent.userId, User.id)) // Unir Agent con User
      .where(eq(Agent.email, email))
  ).at(0)

  if (!found) return new Response('Usuario no encontrado', { status: 404 })

  const valid = await bcrypt.compare(password, found?.User?.password || '')
  if (!valid) return new Response('Usuario no encontrado', { status: 404 })

  const sessionId = randomUUID()
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 días

  await db.insert(Session).values({
    id: sessionId,
    userId: found.User.id,
    expiresAt,
  })

  cookies.set('session', sessionId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    maxAge: 60 * 60 * 24 * 7,
  })

  return new Response('Login ok')
}
