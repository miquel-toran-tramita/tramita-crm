<script lang="ts">
  import '@/sass/global.scss'
  import Menu from '@/modules/shared/components/Menu.svelte'
  import Breadcrumbs from '@/modules/shared/components/Breadcrumbs.svelte'
  import { properties, agents, loggedAgent, contacts } from '@/store'
  import type { IAgent } from '@/modules/users/interfaces/IAgent'
  import type { IProperty } from '@/modules/properties/interfaces/IProperty'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'

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
    loggedAgent.set(data.currentAgent)
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
    <Menu agent={$loggedAgent} />
  </div>

  <div class="panel-layout__content">
    <div class="breadcrumbs">
      <Breadcrumbs />
    </div>
    {@render children()}
  </div>
</div>
