import { Lucia } from 'lucia'
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { db } from '@/db/client' // tu instancia de drizzle
import { session, user } from '@/db/tables'

export const lucia = new Lucia(new DrizzleSQLiteAdapter(db, session, user), {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
})

export type Auth = typeof lucia
