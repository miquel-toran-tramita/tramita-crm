import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  schema: './src/db/tables.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config
