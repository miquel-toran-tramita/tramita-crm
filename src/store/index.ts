import { writable } from 'svelte/store'
import type { IAgent } from '@/modules/users/interfaces/IAgent'
import type { IProperty } from '@/modules/properties/interfaces/IProperty'

export const agents = writable<IAgent[]>([])
export const loggedAgent = writable<IAgent>()
export const properties = writable<IProperty[]>([])
