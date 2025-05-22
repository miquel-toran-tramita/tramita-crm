<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { menuItemsUp, menuItemsDown } from '@/modules/shared/constants/globalVariables'
  import type { IMenuItem } from '@/modules/shared/interfaces/IMenuItem'
  import { page } from '$app/state'
  import { afterNavigate } from '$app/navigation'
  import { tick } from 'svelte'

  interface Props {
    minimalist?: boolean
    agent: any
  }

  let { minimalist = false, agent }: Props = $props()

  let top: number = $state(0)
  let HTMLMenuItems: HTMLElement
  let name = $state(page.url.pathname.split('/')[2])

  afterNavigate(async () => {
    name = page.url.pathname.split('/')[2]
    await tick()

    const rect = HTMLMenuItems.querySelector('.menu-item.active')?.getBoundingClientRect()
    top = rect?.top ?? 0
  })

  const favoriteItems: IMenuItem[] = menuItemsUp.filter((item: IMenuItem) => agent?.menuMovil.includes(item.title))
  const unfavoriteItems: IMenuItem[] = menuItemsUp.filter((item: IMenuItem) => !agent?.menuMovil.includes(item.title)).concat(menuItemsDown)

  let expandMobileMenu: boolean = $state(false)
</script>

<style lang="scss">
  @use '@/sass/mixins.scss' as *;

  .menu-left {
    padding-top: 20px;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--colorNeutral);

    .brand {
      display: flex;
      justify-content: center;
      padding-bottom: 30px;
      margin-left: 4px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      height: 80px;
      width: 100%;

      border-left: 4px solid transparent;

      &:hover,
      &.active {
        .menu-item__name {
          color: var(--colorPrimary);
        }

        :global(svg) {
          fill: var(--colorPrimary);
          stroke: var(--colorPrimary);
        }
      }

      :global(svg) {
        fill: var(--colorText2);
        stroke: var(--colorText2);
      }

      &__name {
        color: var(--colorText2);
        line-height: 1;
        font-size: 12px;
      }
    }

    .border-left {
      transition: 0.3s ease;
      position: absolute;
      background: var(--colorPrimary);
      height: 80px;
      top: 0;
      left: 0px;
      width: 4px;
    }

    @include notDesktop {
      display: none;
    }
  }

  .menu-mobile {
    transition: 0.3s ease;
    display: none;
    position: absolute;
    width: 100%;
    height: 80px;
    background-color: var(--colorBlur);
    backdrop-filter: blur(20px);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
    z-index: 7;
    bottom: 0;
    padding: 0 20px;
    interpolate-size: allow-keywords;
    overflow: hidden;

    &.expandMobileMenu {
      height: auto;

      .expand-menu {
        transform: rotate(-180deg);
      }
    }

    .expand-menu {
      transition: 0.3s ease;
      width: 100%;
    }

    .favorite-part {
      display: flex;
      width: 100%;
      height: 80px;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .unfavorite-part {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
      grid-template-rows: repeat(auto-fit, minmax(80px, 1fr));
      gap: 10px;
      padding-bottom: 20px;
    }

    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 5px;
      &__name {
        font-size: 12px;
        color: var(--colorText2);
      }

      &.active {
        .menu-item__name {
          color: var(--colorPrimary);
        }

        :global(svg) {
          fill: var(--colorPrimary);
          stroke: var(--colorPrimary);
        }
      }
    }

    @include notDesktop {
      display: block;
    }
  }
</style>

<div class="menu-left" bind:this={HTMLMenuItems} class:minimalist>
  <div class="menu-items-up">
    <a href="/panel" title="Home" class="brand">
      <Svg name="logo" width="40" height="40" />
    </a>
    {#each menuItemsUp as menuItem, i}
      <a class="menu-item" href={menuItem.link} class:active={menuItem.link.includes(name) && name} style="order: {i}">
        <Svg name={menuItem.icon} />
        <h5 class="menu-item__name">
          {menuItem.title}
        </h5>
      </a>
    {/each}
  </div>

  <div class="border-left" style="top: {top}px"></div>

  <div class="menu-items-down">
    {#each menuItemsDown as menuItem, i}
      <a class="menu-item" href={menuItem.link} class:active={menuItem.link.includes(name) && name} style="order: {i}">
        <Svg name={menuItem.icon} />
        <h5 class="menu-item__name">
          {menuItem.title}
        </h5>
      </a>
    {/each}
  </div>
</div>

<div class="menu-mobile" class:expandMobileMenu>
  <div class="favorite-part">
    {#each favoriteItems as menuItem}
      <a class="menu-item" href={menuItem.link} class:active={menuItem.link.includes(name) && name}>
        <Svg name={menuItem.icon} />
        <div class="menu-item__name">
          {menuItem.title}
        </div>
      </a>
    {/each}

    <button class="expand-menu" onclick={() => (expandMobileMenu = !expandMobileMenu)}>
      <Svg name="arrow" width="40" height="40" fill="var(--colorPrimary)" />
    </button>
  </div>

  <div class="unfavorite-part">
    {#each unfavoriteItems as menuItem}
      <a class="menu-item" href={menuItem.link} class:active={menuItem.link.includes(name) && name}>
        <Svg name={menuItem.icon} />
        <div class="menu-item__name">
          {menuItem.title}
        </div>
      </a>
    {/each}
    <a href="/" title="Home" class="menu-item">
      <Svg name="logo" width="25" height="25" />
      <div class="menu-item__name">Home</div>
    </a>
  </div>
</div>
