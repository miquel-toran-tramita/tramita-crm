<script lang="ts">
  import type { ILead } from '@/modules/leads/interfaces/ILead'
  import Button from '@/modules/shared/components/Button.svelte'
  import { api } from '@/modules/shared/scripts/api'
  import { contacts } from '@/store'
  interface Props {
    lead: ILead
  }

  let { lead }: Props = $props()

  let removed: boolean = $state(false)
  let quit: boolean = $state(false)

  const leadToContact = async () => {
    await api.post('/api/private/leads/lead-to-contact', { data: lead })

    removed = true
    setTimeout(() => (quit = true), 1000)

    const newContacts = await api.get('/api/private/contacts')
    contacts.set(newContacts)
  }

  const remove = async () => {
    await api.delete('/api/private/leads', { data: lead.id })

    removed = true
    setTimeout(() => (quit = true), 1000)
  }
</script>

<style lang="scss">
  @use '@/sass/mixins.scss' as *;
  .card-lead {
    transition: 0.3s ease;
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    overflow: hidden;
    height: 100%;

    @include notDesktop {
      flex-direction: column;
      align-items: flex-start;
      padding: 0;
      padding-top: 20px;
    }

    &.removed {
      opacity: 0;
    }

    &.quit {
      display: none;
    }

    .contact {
      min-width: 300px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      @include notDesktop {
        padding: 0 20px;
      }

      .content {
        color: var(--colorText2);
        font-size: 13px;
        width: fit-content;
      }
    }

    .name {
      display: flex;
      align-items: center;
      gap: 10px;
      .type {
        font-size: 12px;
        color: var(--colorText2);

        &.colored {
          color: var(--colorPrimary);
        }
      }
    }

    .message {
      color: var(--colorText2);
      font-size: 14px;

      @include notDesktop {
        padding: 0 20px;
        padding-top: 10px;
      }
    }

    .actions {
      display: flex;
      gap: 20px;

      @include notDesktop {
        width: 100%;
        gap: 0;
        margin-top: 20px;

        :global(.btn) {
          border-radius: 0;
          border: 0;
          width: 100%;
          border-top: 1px solid var(--colorBorder);
        }
      }
    }
  }
</style>

<div class="card-lead g-box" class:removed class:quit>
  <div class="contact">
    <div class="name">
      {lead.name}
      {lead.surname}

      {#if lead.buyer}
        <div class="type">Comprador</div>{/if}
      {#if lead.seller}
        <div class="type colored">Vendedor</div>{/if}
    </div>
    <div class="content" copy-to-clipboard={lead.email}>{lead.email}</div>
    <div class="content" copy-to-clipboard={lead.phone}>{lead.phone}</div>
  </div>

  <div class="message">{lead.message}</div>

  <div class="actions">
    <Button click={leadToContact}>Convertir en contacto</Button>
    <Button click={remove} type="secondary">Descartar</Button>
  </div>
</div>
