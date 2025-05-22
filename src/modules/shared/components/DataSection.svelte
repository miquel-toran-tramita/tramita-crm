<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'
  import type { SvgStore } from '@/modules/shared/interfaces/ISvgStore'

  interface Props {
    icon: keyof SvgStore
    title: string
    children?: import('svelte').Snippet
  }

  let { icon, title, children }: Props = $props()
</script>

<style lang="scss">
  .data-section {
    position: relative;
    padding: 50px 0;

    &__title {
      display: flex;
      align-items: center;
      gap: 20px;
      padding-bottom: 10px;

      hr {
        width: 100%;
      }

      h2 {
        font-size: 24px;
        color: var(--colorPrimary);
        flex-shrink: 0;
      }

      :global(svg) {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: 20px;
      }
    }

    &__items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
  }
</style>

<div class="data-section">
  <div class="data-section__title">
    <hr />
    <h2>{title}</h2>
    <Svg name={icon} fill="var(--colorPrimary)" width="40" height="40"></Svg>
    <hr />
  </div>

  <div class="data-section__items">
    {@render children?.()}
  </div>
</div>
