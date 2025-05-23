import { writable } from 'svelte/store'
import type { IAgent } from '@/modules/users/interfaces/IAgent'
import type { IProperty } from '@/modules/properties/interfaces/IProperty'
import type { IContact } from '@/modules/contacts/interfaces/IContact'

export const agents = writable<IAgent[]>([])
export const loggedAgent = writable<IAgent>()
export const properties = writable<IProperty[]>([])
export const contacts = writable<IContact[]>([])
