import { ADMIN_ROLES } from '@/modules/users/constants/roles'
import { db, eq, User } from 'astro:db'
import type { APIContext } from 'astro'

export const validateAdminRole = async (context: APIContext): Promise<boolean> => {
  if (!context.locals.user) return false

  const user = await db.select({ roles: User.roles }).from(User).where(eq(User.id, context.locals.user?.id))

  const hasPermission = user ? user[0].roles.some((role: string) => ADMIN_ROLES.includes(role)) : false

  return hasPermission
}
