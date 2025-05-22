<script lang="ts">
  import type { IUser } from '@/modules/users/interfaces/IUser'
  import Modal from '@/modules/shared/components/Modal.svelte'

  interface Props {
    user: IUser
  }

  let { user }: Props = $props()

  let imageSelector: boolean = $state(false)
</script>

<style lang="scss">
  $row: 6;
  $col: 5;

  .avatar {
    overflow: hidden;
    width: 199px;
    height: 220px;
    box-shadow: var(--shadow);
    border-radius: var(--radius);

    img {
      width: 2200px;
      margin-left: calc(-200px * $row);
      margin-top: calc(-230px * $col);
    }
  }
</style>

<button class="avatar" onclick={() => (imageSelector = true)}>
  <img src="/assets/avatares.jpg" alt="" />
</button>

<div class="name">{user.username}</div>
<div class="email">{user.email}</div>
<div class="phone">{user.phone}</div>
<div class="roles">{user.roles}</div>

<Modal bind:open={imageSelector}>
  {#snippet modalHeader()}
    <h2 slot="modal-header">Selecciona tu avatar</h2>
  {/snippet}
</Modal>
