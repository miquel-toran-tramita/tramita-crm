<script lang="ts">
  import { api } from '@/sync/scripts/api'
  import Checkbox from '@/modules/shared/components/Checkbox.svelte'

  let { agent } = $props()

  let darkModeToggle = $state(agent.darkMode)

  const toggleDarkMode = async () => {
    await api.put('/api/private/agents', {
      id: agent.id,
      darkMode: darkModeToggle,
    })

    document.body.classList.toggle('dark-mode')
  }
</script>

<style lang="scss">
  .menu-settings {
  }
</style>

<div class="dark-mode">
  <div class="aj-setting">
    <h3>Modo oscuro</h3>
    <Checkbox toggle bind:value={darkModeToggle} input={toggleDarkMode} />
  </div>
</div>
