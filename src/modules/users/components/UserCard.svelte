<script lang="ts">
  import type { IUser } from '@/modules/users/interfaces/IUser.ts'
  import { ADMIN_ROLES, CLIENT_ROLES } from '@/modules/users/constants/roles'
  import Svg from '@/modules/shared/components/Svg.svelte'

  interface Props {
    user: IUser;
  }

  let { user = $bindable() }: Props = $props();

  let modeEditor: boolean = $state(false)

  const addrol = async (rol: string) => {
    if (!modeEditor) return

    if (user.roles.includes(rol)) {
      user.roles = user.roles.filter((userrol: string) => userrol != rol)
    } else {
      user.roles.push(rol)
    }

    await fetch('/api/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        roles: JSON.stringify(user.roles),
      }),
    })
  }
</script>

<style lang="scss">
  .user-card {
    width: 100%;
    padding: 25px;
    border-radius: 10px;
    border: 1px solid var(--colorPrimaryLighter);
    background-color: var(--colorTransparent);
    backdrop-filter: blur(5px);
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    .icon {
      height: 75px;
      width: 75px;
      border-radius: 50px;
      background-color: var(--colorPrimaryLighter);
    }

    .data {
      display: flex;
      flex-direction: column;
      align-items: center;

      .username {
        font-weight: 500;
      }

      .email,
      .phone {
        font-size: 14px;
        color: var(--colorText2);
      }
    }

    .roles {
      display: flex;
      gap: 10px;

      .rol {
        padding: 2px 10px;
        background-color: var(--colorPrimaryLighter);
        border-radius: 50px;

        color: var(--colorPrimary);
        font-size: 13px;
      }
    }

    .actions {
      position: absolute;
      top: 10px;
      right: 10px;

      display: none;

      :global(svg) {
        fill: var(--colorPrimaryLight);
        transition: 0.3s ease;

        &:hover {
          transition: 0.3s ease;
          fill: var(--colorPrimary);
        }
      }
    }

    &:hover {
      .actions {
        display: block;
      }
    }
  }
</style>

<div class="user-card" class:modeEditor>
  <div class="icon">
    <img src={user.avatar} alt="" />
  </div>

  <div class="data">
    <div class="username">{user.username}</div>
    <div class="email">{user.email}</div>
    <div class="phone">{user.phone}</div>
  </div>

  <!--<div class="roles">
      <div class="admin-roles">
        {#each ADMIN_ROLES as rol}
          <button class="rol" class:active={user.roles.includes(rol)} on:click={() => addrol(rol)}>
            {rol}
          </button>
        {/each}
      </div>

      <div class="client-roles">
        {#each CLIENT_ROLES as rol}
          <button class="rol" class:active={user.roles.includes(rol)} on:click={() => addrol(rol)}>
            {rol}
          </button>
        {/each}
      </div>
    </div>-->

  <div class="roles">
    <div class="rol">Cliente</div>
    <div class="rol">Admin</div>
  </div>

  <div class="actions">
    <button class="edit" onclick={() => (modeEditor = !modeEditor)}>
      <Svg name="edit" />
    </button>
  </div>
</div>
