<script lang="ts">
  import type { IUser } from '@/interfaces/IUser.ts'
  import { ADMIN_ROLES, CLIENT_ROLES } from '@/constants/roles'
  import Svg from '@/modules/shared/components/Svg.svelte'

  interface Props {
    user: IUser;
  }

  let { user = $bindable() }: Props = $props();

  let modeEditor: boolean = $state(false)

  const addRole = async (role: string) => {
    if (!modeEditor) return

    if (user.roles.includes(role)) {
      user.roles = user.roles.filter((userRole: string) => userRole != role)
    } else {
      user.roles.push(role)
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
  .user-row {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 20px;

    padding: 10px 20px;
    border-radius: 8px;

    background-color: var(--colorTransparent);
    backdrop-filter: blur(5px);

    border: 2px solid transparent;
    cursor: pointer;
    transition: 0.3s ease;

    &.modeEditor {
      background-color: var(--colorSecondary);
      border: 2px solid var(--colorPrimary) !important;
    }

    &:hover {
      transition: 0.3s ease;
      background-color: var(--colorSecondary);
    }

    .icon {
      height: 50px;
      max-width: 50px;
      width: 100%;
      border-radius: 50px;

      border: 1px solid var(--colorBorder);
    }

    .data {
      width: 100%;
      display: grid;
      align-items: center;

      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 15px;

      .email,
      .phone {
        font-size: 14px;
        color: var(--colorText2);
      }

      .roles {
        justify-self: end;

        .admin-roles,
        .client-roles {
          display: flex;
          gap: 10px;
          padding-bottom: 10px;
        }

        .role {
          width: fit-content;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 50px;
          background-color: var(--colorBorder);

          opacity: 0.2;
          box-shadow: var(--shadowInset);

          &.active {
            opacity: 1;
          }
        }
      }
    }

    button {
      display: flex;
      align-items: center;

      :global(svg) {
        transition: 0.3s ease;
        fill: var(--colorText2);

        &:hover {
          fill: var(--colorText);
        }
      }
    }
  }
</style>

<div class="user-row" class:modeEditor>
  <div class="icon">
    <img src={user.avatar} alt="" />
  </div>
  <div class="data">
    <div class="username">{user.username}</div>
    <div class="email">{user.email}</div>
    <div class="phone">{user.phone}</div>
    <div class="roles">
      <div class="admin-roles">
        {#each ADMIN_ROLES as role}
          <button class="role" class:active={user.roles.includes(role)} onclick={() => addRole(role)}>
            {role}
          </button>
        {/each}
      </div>

      <div class="client-roles">
        {#each CLIENT_ROLES as role}
          <button class="role" class:active={user.roles.includes(role)} onclick={() => addRole(role)}>
            {role}
          </button>
        {/each}
      </div>
    </div>
  </div>
  <div class="actions">
    <button class="edit" onclick={() => (modeEditor = !modeEditor)}>
      <Svg name="edit" />
    </button>
  </div>
</div>
