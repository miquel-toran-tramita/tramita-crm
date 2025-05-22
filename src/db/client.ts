import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { TURSO_URL, TURSO_AUTH_TOKEN } from '$env/static/private'

const turso = createClient({
  url: TURSO_URL!,
  authToken: TURSO_AUTH_TOKEN,
})

export const db = drizzle(turso)
