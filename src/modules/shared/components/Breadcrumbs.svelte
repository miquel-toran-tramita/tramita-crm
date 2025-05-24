<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { page } from '$app/state'

  interface IBreadCrumb {
    title: string
    path: string
  }

  const generateBreadCrumbs = (): IBreadCrumb[] => {
    const { pathname, origin } = page.url
    const pathItems: string[] = pathname.split('/')

    return pathItems.map((item, index) => {
      const path = `/${pathItems.slice(0, index + 1).join('/')}`
      const title = item.charAt(0).toUpperCase() + item.slice(1)

      return {
        title,
        path: `${origin}${path}`,
      }
    })
  }

  let breadCrumbs: IBreadCrumb[] = $derived(generateBreadCrumbs())
</script>

<style lang="scss">
  @use '@/sass/mixins.scss' as *;

  .breadcrumbs {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: var(--margin);
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 20px;

    .text {
      color: var(--colorPrimary);
      font-family: var(--fontPrimary);
      font-size: 20px;
      display: flex;
      align-items: center;

      @include notDesktop {
        font-size: 20px;
      }
    }

    :global(.splitter) {
      transform: rotate(-90deg) translateX(-2px);
      fill: var(--colorPrimary);
    }
  }
</style>

{#if breadCrumbs.length > 1}
  <div class="g-box breadcrumbs">
    {#each breadCrumbs as breadCrumb, index}
      <a href={breadCrumb.path} class="text">
        {breadCrumb.title}
      </a>
      {#if index > 0 && index < breadCrumbs.length - 1}
        <Svg name="arrow" height="20" width="20" className="splitter" fill="var(--colorPrimary)" />
      {/if}
    {/each}
  </div>
{/if}
