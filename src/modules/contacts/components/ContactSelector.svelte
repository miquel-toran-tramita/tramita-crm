<script lang="ts">
  import { api } from '@/modules/shared/scripts/api'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'
  import Modal from '@/modules/shared/components/Modal.svelte'
  import { onMount } from 'svelte'
  import Input from '@/modules/shared/components/Input.svelte'

  interface Props {
    selectedContact?: IContact
    closed?: boolean
    buyer?: boolean
    owner?: boolean
    selectContact?: Function
  }

  const defaultSelectContact = (contact: IContact) => {
    selectedContact = contact
    closed = true
  }

  let { selectedContact = $bindable(), closed = $bindable(), buyer, owner, selectContact = defaultSelectContact }: Props = $props()
  let contacts: IContact[] = $state([])
  let search: string = $state('')

  const searchContacts = async () => {
    const response = await api.get(`/api/private/contacts?buyer=${buyer}&seller=${owner}&search=${search}`)

    contacts = response.ok ? response.data : []
  }

  onMount(async () => await searchContacts())
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;

    :global(input) {
      padding-top: 10px !important;
      padding-right: 10px !important;
      padding-bottom: 10px !important;
    }

    .contacts {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .contact-row {
        cursor: pointer;
        transition: 0.3s ease;
        position: relative;
        padding: 10px;
        display: grid;
        grid-template-columns: 1fr 150px 1fr;
        gap: 20px;
        text-align: left;

        &__phone,
        &__email {
          color: var(--colorText2);
        }

        &:hover {
          border: 1px solid var(--colorPrimary);
          background-color: var(--colorNeutral);
        }

        &:active {
          transform: scale(0.9);
        }
      }
    }
  }
</style>

<Modal bind:closed maxWidth={800}>
  {#snippet modalHeader()}
    Vincular {owner ? 'propietario' : buyer ? 'comprador' : 'contacto'}
  {/snippet}

  {#snippet modalContent()}
    <div class="container">
      <Input prefix="search" bind:value={search} placeholder="Buscar" onStopTyping={searchContacts}></Input>
      <div class="contacts">
        {#each contacts as contact}
          <button class="contact-row g-box" onclick={() => selectContact(contact)}>
            <div class="contact-row__name">{contact.name}</div>
            <div class="contact-row__phone">{contact.phone}</div>
            <div class="contact-row__email">{contact.email}</div>
          </button>
        {/each}
      </div>
    </div>
  {/snippet}
</Modal>
