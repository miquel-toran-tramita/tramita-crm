<script lang="ts">
  import ContactSelector from '@/modules/contacts/components/ContactSelector.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'
  import { api } from '@/modules/shared/scripts/api'
  import PersonalData from '@/modules/contacts/components/PersonalData.svelte'

  interface Props {
    propertyId: number
    contacts: IContact[]
    owner?: boolean
    buyer?: boolean
  }

  let { propertyId, contacts = [], owner, buyer }: Props = $props()

  let loading: boolean = $state(false)
  let closed: boolean = $state(true)

  const selectContact = async (selectedContact: IContact) => {
    loading = true
    await api.post('/api/private/propertyJoin/connectContact', { propertyId, contactId: selectedContact.id, owner, buyer })
    contacts = [...contacts, selectedContact]
    loading = false

    closed = true
  }

  const removeContact = async (contact: IContact) => {
    await api.delete('/api/private/propertyJoin/connectContact', { propertyId, contactId: contact.id, owner, buyer })
    contacts = contacts.filter((c) => c.id !== contact.id)
  }

  contacts = contacts.filter((contact) => {
    if (owner && contact.seller) return true
    if (buyer && contact.buyer) return true
    return false
  })
</script>

<style lang="scss">
  .contacts {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>

<div class="section-contacts">
  <Button {loading} icon="addPerson" type="main" click={() => (closed = false)}>
    Vincular {owner ? 'propietario' : 'comprador'}
  </Button>

  <div class="contacts">
    {#each contacts as contact}
      <hr />

      <PersonalData {contact} slim removeCard={removeContact} />
    {/each}
  </div>
</div>

<ContactSelector bind:closed {selectContact} {buyer} {owner} />
