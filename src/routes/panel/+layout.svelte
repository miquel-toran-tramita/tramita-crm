<script lang="ts">
  import '@/sass/global.scss'
  import Menu from '@/modules/shared/components/Menu.svelte'
  import Breadcrumbs from '@/modules/shared/components/Breadcrumbs.svelte'

  let { children } = $props()
</script>

<style lang="scss">
  .panel-layout {
    transition: 0.3s ease;
    position: relative;
    height: 100dvh;
    min-width: 100vw;
    background-color: var(--colorNeutral);
    display: grid;
    grid-template-columns: 90px 1fr;
    gap: 20px;
    padding-right: 20px;
  }
</style>

<div class="panel-layout">
  <div class="panel-layout__menu">
    <Menu />
  </div>

  <div class="panel-layout__content">
    <div class="breadcrumbs">
      <Breadcrumbs />
    </div>
    {@render children()}
  </div>
</div>
