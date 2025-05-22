<script lang="ts">
  import Checkbox from '@/modules/shared/components/Checkbox.svelte'
  import { api } from '@/sync/scripts/api'
  import { onMount } from 'svelte'
  import type { IUser } from '@/modules/users/interfaces/IUser'
  import { menuItemsUp } from '@/modules/shared/constants/globalVariables'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import type { IMenuItem } from '@/modules/shared/interfaces/IMenuItem'

  let { agent } = $props()

  let onMounted: boolean = false
  let menuItems = $state(JSON.parse(JSON.stringify(menuItemsUp)))

  menuItems = menuItems.map((item: IMenuItem) => {
    item.favorite = agent.menuMovil.includes(item.title)

    return item
  })

  onMount(() => (onMounted = true))

  const toggleMenuFavoriteList = async () => {
    if (!onMounted) return

    /*await api.put('/api/auth/user', {
      id: user.id,
      menuMinimalist: !user.menuMinimalist,
    })*/
  }

  $effect(() => {
    toggleMenuFavoriteList(), menuItemsUp
  })
</script>

<div class="menu-settings">
  <div class="aj-setting">
    {#each menuItems as menuItem}
      <div style="display: flex; align-items: center; gap: 10px;">
        <Svg name={menuItem.icon} fill="var(--colorText2)" />
        <h3>{menuItem.title}</h3>
      </div>
      <Checkbox toggle bind:value={menuItem.favorite} />
    {/each}
  </div>
</div>
