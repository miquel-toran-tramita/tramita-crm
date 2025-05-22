import type { IContact } from '@/modules/contacts/interfaces/IContact'
import type { IAgent } from '@/modules/users/interfaces/IAgent'
import type { IProperty } from '@/sync/interfaces/IProperty'

export interface IPropertyJoin {
  Property: IProperty
  Contact: IContact | null
  Agent: IAgent | null
  PropertyContact: {
    propertyId: number
    contactId: string
    owner: boolean
    buyer: boolean
  }
}
