<script lang="ts">
  import { createBubbler } from 'svelte/legacy'

  const bubble = createBubbler()
  import PropertyCardRow from '@/modules/properties/components/PropertyCardRow.svelte'
  import ContactCardRow from '@/modules/contacts/components/ContactCardRow.svelte'
  import type { ILabelValue } from '@/modules/shared/interfaces/ILabelValue'
  import type { IProperty } from '@/modules/properties/interfaces/IProperty'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'
  import type { IEvent } from '@/modules/calendar/interfaces/IEvent'
  import type { IAgent } from '@/modules/users/interfaces/IAgent'

  import Input from '@/modules/shared/components/Input.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import Modal from '@/modules/shared/components/Modal.svelte'
  import SelectSimple from '@/modules/shared/components/SelectSimple.svelte'
  import SelectCheckbox from '@/modules/shared/components/SelectCheckbox.svelte'

  import { dicTypes, dicRepeater, dicStatus, dicDuration } from '@/modules/calendar/constants/calendar'
  import { formatToDatetimeLocal } from '@/modules/shared/scripts/generic'
  import { api } from '@/modules/shared/scripts/api'
  import { agents, events, currentAgent } from '@/store'

  let closedProperties: boolean = $state(true)
  let closedContacts: boolean = $state(true)
  let loading: boolean = $state(false)

  interface Props {
    closed?: boolean
    contacts?: IContact[]
    agentsOptions?: ILabelValue[]
    updateEventId?: string
  }

  let { closed = $bindable(true), contacts = [], agentsOptions = [], updateEventId = '' }: Props = $props()

  let titleError: boolean = $state(false)

  const eventToUpdate: IEvent = $events.find((event: IEvent) => updateEventId === event.id)

  const types: ILabelValue[] = Object.entries(dicTypes).map(([key, label]) => ({ label, value: key }))
  const status: ILabelValue[] = Object.entries(dicStatus).map(([key, label]) => ({ label, value: key }))
  const repeater: ILabelValue[] = Object.entries(dicRepeater).map(([key, label]) => ({ label, value: key }))
  const duration: ILabelValue[] = Object.entries(dicDuration).map(([key, label]) => ({ label, value: key }))

  const data: IEvent = $state({
    title: eventToUpdate?.title || '',
    description: eventToUpdate?.description || '',
    status: eventToUpdate?.status || '',
    type: eventToUpdate?.type || '',
    repeater: eventToUpdate?.repeater || '',
    duration: eventToUpdate?.duration || '',
    date: eventToUpdate?.date || formatToDatetimeLocal(),
    agent: eventToUpdate?.agent || $currentAgent.id,
    property: eventToUpdate?.property || null,
    contact: eventToUpdate?.contact || null,
    relatedAgents: eventToUpdate?.relatedAgents || '',
  })

  const createEvent = async () => {
    if (!data.title) return (titleError = true)
    loading = true
    const newEvent: IEvent = (await api.post('/api/private/events', data)).data
    $events = [...$events, newEvent]
    loading = false
    closed = true
  }

  const updateEvent = async () => {
    loading = true
    await api.put('/api/private/events', data)
    loading = false
  }

  const deleteEvent = async () => {
    await api.delete('/api/private/events', { id: updateEventId })
  }

  let contactsOptions: ILabelValue[] = contacts.map((contact: IContact) => {
    return {
      label: contact.name,
      value: contact.id,
    }
  })

  let properties: IProperty[] = $state([])
  const getProperties = async () => (properties = (await api.post('/api/private/properties')).data)
</script>

<style lang="scss">
  .create-event-form {
    display: flex;
    flex-direction: column;
    padding: 25px;
    padding-top: 0;
    gap: 25px;

    :global(.input-wrapper) {
      width: 100%;
    }

    .important {
      width: 100%;
      display: flex;
      gap: 25px;
    }

    .options {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 25px;
    }

    :global(.isTextarea) {
      padding-bottom: 0;
    }

    .extra {
      display: flex;
      justify-content: space-between;
      gap: 25px;

      :global(textarea) {
        height: 100%;
      }

      .relations {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 25px;
      }
    }

    .edit-btns {
      display: flex;
      gap: 20px;

      :global(button:nth-child(2)) {
        width: 100%;
      }
    }

    :global(.properties-container button),
    :global(.relation-contact) {
      width: 100%;
      justify-content: flex-start;
      height: 60px;
    }
  }
</style>

<Modal bind:closed neutral maxWidth={800}>
  {#snippet modalHeader()}
    <h2 slot="modal-header">{updateEventId ? `Editar "${data.title}"` : `Nuevo evento creado por ${$currentAgent.username}`}</h2>
  {/snippet}

  {#snippet modalContent()}
    <div slot="modal-content" class="create-event-form">
      <div class="important">
        <Input bind:value={data.title} label="Título" error={titleError} />
        <Input bind:value={data.date} label="Fecha" type="datetime-local" />
      </div>

      <div class="options">
        <SelectSimple options={types} bind:value={data.type} placeholder="Tipo" />
        <SelectSimple options={status} bind:value={data.status} placeholder="Status" />
        <SelectSimple options={repeater} bind:value={data.repeater} placeholder="Frecuencia" />
        <SelectSimple options={duration} bind:value={data.duration} placeholder="Duración" />
      </div>

      <div class="extra">
        <Input bind:value={data.description} label="Descripción" type="textarea" />

        <div class="relations">
          {data.relatedAgents}
          <SelectCheckbox options={agentsOptions} placeholder="Agentes involucrados" />

          <div class="properties-container" onmouseover={getProperties} onfocus={bubble('focus')} role="contentinfo">
            {#if data.property}
              <button onclick={() => (closedProperties = false)}>
                <PropertyCardRow slim property={properties.find((p: IProperty) => p.ref === data.property)} />
              </button>
            {:else}
              <Button type="secondary" icon="apartment" click={() => (closedProperties = false)}>Relacionar una propiedad</Button>
            {/if}
          </div>

          {#if data.contact}
            <button onclick={() => (closedContacts = false)}>
              <ContactCardRow slim contact={contacts.find((c: IContact) => c.id === data.contact)} />
            </button>
          {:else}
            <Button customClass="relation-contact" type="secondary" icon="person" click={() => (closedContacts = false)}>
              Relacionar contacto
            </Button>
          {/if}
        </div>
      </div>

      {#if updateEventId}
        <div class="edit-btns">
          <Button type="secondary" click={deleteEvent}>Borrar</Button>
          <Button click={updateEvent} bind:loading>{loading ? 'Actualizando...' : 'Actualizar'}</Button>
        </div>
      {:else}
        <Button click={createEvent} bind:loading>{loading ? 'Creando...' : 'Crear evento'}</Button>
      {/if}
    </div>
  {/snippet}
</Modal>

<Modal bind:closed={closedProperties} neutral maxWidth={800}>
  {#snippet modalHeader()}
    <h2 slot="modal-header">Selecciona una propiedad</h2>
  {/snippet}
  {#snippet modalContent()}
    <div slot="modal-content" class="create-event-form">
      {#each properties as property}
        <button
          onclick={() => {
            data.property = property.ref
            closedProperties = true
          }}
        >
          <PropertyCardRow {property} />
        </button>
      {/each}
    </div>
  {/snippet}
</Modal>

<Modal bind:closed={closedContacts} neutral maxWidth={800}>
  {#snippet modalHeader()}
    <h2 slot="modal-header">Selecciona un contacto</h2>
  {/snippet}
  {#snippet modalContent()}
    <div slot="modal-content" class="create-event-form">
      {#each contacts as contact}
        <button
          onclick={() => {
            data.contact = contact.id
            closedContacts = true
          }}
        >
          <ContactCardRow {contact} />
        </button>
      {/each}
    </div>
  {/snippet}
</Modal>
