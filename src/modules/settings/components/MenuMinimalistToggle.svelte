<script lang="ts">
  import Checkbox from '@/modules/shared/components/Checkbox.svelte'
  import { api } from '@/sync/scripts/api'
  import { onMount } from 'svelte'
  let { agent } = $props()

  let onMounted: boolean = false
  let menuToggle = $state(agent.menuMinimalist)

  onMount(() => (onMounted = true))

  const toggleMenuMinimalista = async () => {
    if (!onMounted) return

    await api.put('/api/private/agents', {
      id: agent.id,
      menuMinimalist: !agent.menuMinimalist,
    })

    window.dispatchEvent(new CustomEvent('toggleMenuMinimalist'))
  }
</script>

<div class="menu-settings">
  <div class="aj-setting">
    <h3>Menú minimalista</h3>
    <Checkbox toggle bind:value={menuToggle} input={toggleMenuMinimalista} />
  </div>
</div>
