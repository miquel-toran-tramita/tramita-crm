<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'

  interface Props {
    title?: string
    icon?: string
    children?: import('svelte').Snippet
  }

  let { title = '', icon = '', children }: Props = $props()
</script>

<style lang="scss">
  .accumulable-card {
    top: 20px;
    width: 100%;
    height: 100%;
    padding: 20px;

    &__header {
      display: flex;
      gap: 10px;
      padding-bottom: 20px;
      align-items: center;
      font-size: 30px;
      font-weight: bold;
      h2 {
        color: var(--colorPrimary);
      }

      :global(svg) {
        fill: var(--colorPrimary);
      }
    }

    &__content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
  }
</style>

<div class="accumulable-card g-box">
  <div class="accumulable-card__header">
    <Svg name={icon} width="40" height="40"></Svg>
    <h2>
      {title}
    </h2>
  </div>
  <div class="accumulable-card__content">
    {@render children?.()}
  </div>
</div>
