import { dev } from '$app/environment'
import { db } from '@/db/client'
import { User, Session, Agent } from '@/db/tables'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'

export const POST = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json()

    const result = await db
      .select({
        agent: Agent,
        user: User
      })
      .from(Agent)
      .innerJoin(User, eq(Agent.userId, User.id))
      .where(eq(Agent.email, email))
    
    const found = result.at(0)
    
    if (!found) {
      return new Response('Usuario no encontrado', { status: 404 })
    }

    if (!found.user.password) {
      return new Response('Error de autenticación', { status: 400 })
    }

    const valid = await bcrypt.compare(password, found.user.password)
    if (!valid) return new Response('Contraseña incorrecta', { status: 401 })

    const sessionId = randomUUID()
    const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 días

    await db.insert(Session).values({
      id: sessionId,
      userId: found.user.id,
      expiresAt,
    })

    cookies.set('session', sessionId, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 7,
    })

    return new Response('Login ok')
  } catch (error) {
    console.error('Error en el proceso de login:', error)
    return new Response('Error interno del servidor', { status: 500 })
  }
}
