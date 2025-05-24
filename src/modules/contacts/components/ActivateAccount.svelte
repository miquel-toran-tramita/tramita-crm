<script lang="ts">
  import type { IContact } from '@/modules/contacts/interfaces/IContact'
  import Button from '@/modules/shared/components/Button.svelte'
  import { api } from '@/modules/shared/scripts/api'

  interface Props {
    contact: IContact
    isAccountActivated?: boolean
  }

  let { contact, isAccountActivated = $bindable(false) }: Props = $props()

  let loading: boolean = $state(false)

  const activateAccount = async () => {
    loading = true
    const response = await api.post('/api/private/contacts/activateAccount', { contactId: contact.id })
    loading = false

    if (response.ok) isAccountActivated = true
  }

  const sendResetPassword = async () => {
    loading = true
    await api.post('/api/private/users/sendResetPasswordEmail', { id: contact.id })
    loading = false
  }
</script>

{#if isAccountActivated}
  <Button click={sendResetPassword} type="secondary" icon="person" {loading}>
    {loading ? 'Enviando...' : 'Enviar email para cambiar contraseña'}
  </Button>
{:else}
  <Button click={activateAccount} type="secondary" icon="person" {loading}>
    {loading ? 'Creando usuario...' : 'Activar área personal'}
  </Button>
{/if}
