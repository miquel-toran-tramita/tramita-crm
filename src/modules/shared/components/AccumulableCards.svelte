<script lang="ts">
  import { onMount } from 'svelte'
  import Svg from '@/modules/shared/components/Svg.svelte'
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()

  let HTMLCardsContainer: HTMLElement = $state()
  let indexItems = []
  let active: number = 0

  const handleScroll = (ev) => {
    active = Math.round(ev.deltaY / 100)
  }

  onMount(() => {
    const cards = HTMLCardsContainer.querySelectorAll('.accumulable-card')

    cards.forEach((HTMLCard: HTMLElement) => {
      const newItem = {
        icon: HTMLCard.getAttribute('meta-icon'),
        title: HTMLCard.getAttribute('meta-title'),
      }

      indexItems = [...indexItems, newItem]
    })
  })
</script>

<style lang="scss">
  .accumulable-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 20px;
    width: 100%;
    height: fit-content;
  }
</style>

<div class="accumulable-cards" bind:this={HTMLCardsContainer}>
  {@render children?.()}
</div>

<svelte:window onscroll={handleScroll} />
