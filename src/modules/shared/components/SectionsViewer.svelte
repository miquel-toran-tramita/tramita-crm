<script lang="ts">
  import type { ISectionViewer } from '@/modules/shared/interfaces/ISectionViewer'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { onMount } from 'svelte'

  interface Props {
    sections: ISectionViewer[]
    activeSection?: number
    children?: import('svelte').Snippet
  }

  let { sections, activeSection = $bindable(0), children }: Props = $props()

  let transporterWidth = $derived(`calc(100% / ${sections.length})`)
  let transporterLeft = $derived(`calc(${transporterWidth} * ${activeSection})`)

  let borderBottom: boolean = $state(false)

  onMount(() => {
    const HTMLAdminArea = document.querySelector('.admin-area__content')

    console.log('HTMLAdminArea', HTMLAdminArea)

    HTMLAdminArea?.addEventListener('scroll', () => {
      borderBottom = HTMLAdminArea.scrollTop > 100
    })
  })
</script>

<style lang="scss">
  .sections-viewer {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;

    .header {
      position: relative;
      display: flex;
      justify-content: space-between;
      position: sticky;
      top: 0;
      padding: 20px 0;
      background-color: var(--colorNeutral);
      z-index: 5;

      &.borderBottom {
        border-bottom: 1px solid var(--colorBorder);
      }

      .item {
        transition: 0.3s ease;
        cursor: pointer;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 10px;
        opacity: 0.5;

        :global(svg) {
          transition: 0.3s ease;
        }

        &:hover {
          opacity: 1;
        }

        &.active {
          opacity: 1;
          color: var(--colorPrimary);

          :global(svg) {
            fill: var(--colorPrimary);
          }
        }
      }
    }

    .transporter {
      transition: 0.3s ease;
      position: absolute;
      height: calc(100% - 40px);
      width: calc(100% / 5);
      z-index: -1;
    }

    .content {
      min-height: 200px;
      padding: 20px;
    }
  }
</style>

<div class="sections-viewer">
  <div class="header" class:borderBottom>
    <div class="g-box transporter" style="width: {transporterWidth}; left: {transporterLeft};"></div>
    {#each sections as section, i}
      <button class="item" class:active={activeSection === i} onclick={() => (activeSection = i)}>
        <Svg name={section.icon}></Svg>
        {section.title}
      </button>
    {/each}
  </div>

  <div class="content g-box">
    {@render children?.()}
  </div>
</div>
