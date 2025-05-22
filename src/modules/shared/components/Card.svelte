<script lang="ts">
  import type { ICard } from '@/modules/shared/interfaces/ICard.ts'
  import Svg from '@/modules/shared/components/Svg.svelte'

  interface Props {
    card: ICard
  }

  let { card }: Props = $props()
</script>

<style lang="scss">
  .card {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    transition: 0.3s ease;
    padding: 20px;

    &:hover {
      transform: scale(0.9);

      h3 {
        transition: 0.3s ease;
        color: var(--colorPrimary);
      }

      :global(svg) {
        transition: 0.3s ease;
        fill: var(--colorPrimary);
      }
    }
  }
</style>

<a href={card.href}>
  <button class="g-box card">
    <Svg name={card.icon} width="80" height="80" />
    <h3>{card.title}</h3>
  </button>
</a>
