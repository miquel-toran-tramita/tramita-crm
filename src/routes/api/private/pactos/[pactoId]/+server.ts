import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import { db } from '@/db/client'
import { Pactos } from '@/db/tables'
import { sql } from 'drizzle-orm'

export const GET: RequestHandler = async ({ params }) => {
        try {
            const pactos = await db
            .select()
            .from(Pactos)
            .where(
                sql`EXISTS (
                    SELECT 1 FROM json_each(${Pactos.contracts})
                    WHERE value = ${params.pactoId}
                )`
            )

            return json(pactos)
            } catch (err) {
            return json({ error: err }, { status: 500 })
            }
        }
