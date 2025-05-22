<script lang="ts">
  import FormSignup from '@/modules/users/components/FormSignup.svelte'
  import Modal from '@/modules/shared/components/Modal.svelte'
  import type { IUser } from '@/modules/users/interfaces/IUser'
  import UserRow from '@/modules/users/components/UserRow.svelte'

  interface Props {
    users?: IUser[]
  }

  let { users = [] }: Props = $props()

  let open: boolean = $state(false)
</script>

<style lang="scss">
  .user-list {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    overflow-y: auto;
    gap: 30px;
    padding: 10px;
    margin-left: -10px;
  }

  .new-user {
    transition: 0.3s ease;
    margin-top: 20px;
    font-size: 12px;

    &:hover {
      transition: 0.3s ease;
      color: var(--colorPrimary);
    }
  }
</style>

<div class="user-list">
  {#each users as user}
    <UserRow {user} />
  {/each}
</div>

<button class="new-user" onclick={() => (open = true)}>+ Crear nuevo usuario</button>

<Modal bind:open>
  {#snippet modalHeader()}
    <h2 slot="modal-header">Nuevo usuario</h2>
  {/snippet}
  <FormSignup admin />
</Modal>
