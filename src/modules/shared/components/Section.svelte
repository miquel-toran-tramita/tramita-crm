<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'
  import type { SvgStore } from '../interfaces/ISvgStore'

  interface Props {
    title?: string
    icon?: keyof SvgStore
    id?: string
    children?: import('svelte').Snippet
  }

  let { title = '', icon = 'person', id = '', children }: Props = $props()

  let open: boolean = $state(false)
</script>

<style lang="scss">
  section {
    padding: 20px;
    border-bottom: 1px solid var(--colorBorder);
    height: fit-content;

    &.open {
      height: 100px;
      overflow: hidden;

      .section-header {
        :global(svg) {
          transform: unset;
        }
      }
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      cursor: pointer;
      font-size: 20px;
      padding-bottom: 20px;

      .title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
      }

      :global(.section-arrow) {
        transition: 0.3s ease;
        transform: rotate(180deg);
      }
    }

    .section-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
  }
</style>

<section {id} class="g-box" class:open>
  <button class="section-header" onclick={() => (open = !open)}>
    <div class="title">
      <Svg name="arrow" width="30" height="30" fill="var(--colorText2)" className="section-arrow" />
      <h2 class="title">{title}</h2>
    </div>

    <Svg name={icon} width="60" height="60" fill="var(--colorPrimary)" />
  </button>

  <div class="section-content">
    {@render children?.()}
  </div>
</section>
