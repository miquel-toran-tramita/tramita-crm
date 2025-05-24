<script lang="ts">
  import '@/sass/global.scss'
  import Menu from '@/modules/shared/components/Menu.svelte'
  import Breadcrumbs from '@/modules/shared/components/Breadcrumbs.svelte'
  import { properties, agents, currentAgent, contacts } from '@/store'
  import type { IAgent } from '@/modules/users/interfaces/IAgent'
  import type { IProperty } from '@/modules/properties/interfaces/IProperty'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'
  import { fade } from 'svelte/transition'
  import { page } from '$app/state'

  interface PageData {
    properties: IProperty[]
    agents: IAgent[]
    currentAgent: IAgent
    contacts: IContact[]
    user: any
  }

  let { data, children } = $props<{ data: PageData }>()

  if (data) {
    properties.set(data.properties)
    agents.set(data.agents)
    contacts.set(data.contacts)
    currentAgent.set(data.currentAgent)
  }
</script>

<style lang="scss">
  .panel-layout {
    transition: 0.3s ease;
    position: relative;
    height: 100dvh;
    min-width: 100vw;
    background-color: var(--colorNeutral);
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 20px;
    padding-right: 20px;
  }
</style>

<div class="panel-layout">
  <div class="panel-layout__menu">
    <Menu agent={$currentAgent} />
  </div>

  <div class="panel-layout__content">
    <div class="breadcrumbs">
      <Breadcrumbs />
    </div>

    {#key page.url.pathname}
      <main in:fade={{ delay: 300, duration: 200 }} out:fade={{ duration: 200 }}>
        {@render children()}
      </main>
    {/key}
  </div>
</div>
