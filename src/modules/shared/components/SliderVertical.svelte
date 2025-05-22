<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { onMount } from 'svelte'

  interface Props {
    height?: string
    gap?: number
    sticky?: boolean
    children?: import('svelte').Snippet
  }

  let { height = '100%', gap = 30, children, sticky = false }: Props = $props()

  let HTMLSlider: HTMLElement = $state()
  let HTMLSlides: HTMLElement = $state()
  let currentScroll: number = $state(0)

  const scrollBefore = () => {
    const slide = HTMLSlides.children[0] as HTMLElement

    HTMLSlider.scrollTo({
      top: currentScroll - slide.offsetHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  const scrollNext = () => {
    const slide = HTMLSlides.children[0] as HTMLElement

    HTMLSlider.scrollTo({
      top: currentScroll + slide.offsetHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  onMount(() => {
    HTMLSlider.addEventListener('scroll', () => {
      currentScroll = HTMLSlider.scrollTop
    })
  })
</script>

<style lang="scss">
  .slider-vertical-container {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 300px;
    z-index: 1;

    &.sticky {
      position: sticky;
      top: 20px;
    }

    //Special css
    :global(.photos) {
      border-radius: 8px !important;
    }
    ///////

    .slider-vertical {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 300px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 0px;
      }
    }

    .slide-it {
      transition: background 1s ease;
      position: absolute;
      height: 80px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: linear-gradient(to right, transparent, transparent);
      z-index: 3;

      :global(svg) {
        filter: drop-shadow(0 0 1px black);
      }

      &.bottom {
        bottom: -2px;
      }

      &.top {
        top: 0;

        transform: rotate(-180deg);
      }

      &::after {
        content: '';
        transition: opacity 0.3s ease;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
        opacity: 0;
        z-index: -1;
        border-radius: var(--radius);
      }

      &:hover::after {
        opacity: 1;
      }
    }
  }
</style>

<div class="slider-vertical-container g-box" style="height: {height};" class:sticky>
  {#if currentScroll > 0}
    <button class="slide-it top" aria-label="Anterior" onclick={scrollBefore}>
      <Svg name="arrow" width="50" height="50" fill="#FFF" />
    </button>
  {/if}

  <div class="slider-vertical" style="height: {height}; gap: {gap}px" bind:this={HTMLSlider}>
    <div class="slides" bind:this={HTMLSlides}>
      {@render children?.()}
    </div>
  </div>

  <button class="slide-it bottom" aria-label="Siguiente" onclick={scrollNext}>
    <Svg name="arrow" width="50" height="50" fill="#FFF" />
  </button>
</div>
