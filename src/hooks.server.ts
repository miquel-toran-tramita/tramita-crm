// src/hooks.server.ts
import { db } from '@/db/client'
import { Session, User } from '@/db/tables'
import { eq, and, gt } from 'drizzle-orm'

export const handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get('Session')
  let currentUser = null

  if (sessionId) {
    const now = Math.floor(Date.now() / 1000)
    const [result] = await db
      .select({ User })
      .from(Session)
      .innerJoin(User, eq(User.id, Session.userId))
      .where(and(eq(Session.id, sessionId), gt(Session.expiresAt, now)))

    if (result) {
      currentUser = result.User
    }
  }

  return resolve(event)
}
