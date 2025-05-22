<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { onMount } from 'svelte'

  interface Props {
    height?: string
    gap?: number
    children?: import('svelte').Snippet
  }

  let { height = '100%', gap = 30, children }: Props = $props()

  let HTMLSlider: HTMLElement = $state()
  let HTMLSlides: HTMLElement = $state()

  let currentScroll: number = $state(0)

  const scrollBefore = () => {
    const slide = HTMLSlides.children[0] as HTMLElement

    HTMLSlider.scrollTo({
      left: currentScroll - slide.offsetHeight * 2,
      behavior: 'smooth',
    })
  }

  const scrollNext = () => {
    const slide = HTMLSlides.children[0] as HTMLElement

    HTMLSlider.scrollTo({
      left: currentScroll + slide.offsetWidth * 2,
      behavior: 'smooth',
    })
  }

  onMount(() => {
    HTMLSlider.addEventListener('scroll', () => {
      currentScroll = HTMLSlider.scrollLeft
    })
  })
</script>

<style lang="scss">
  .slider-horizontal-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;

    .slider-horizontal {
      position: relative;
      display: flex;
      width: 100%;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 0px;
        height: 0;
      }

      .slides {
        display: flex;
      }
    }

    .slide-it {
      transition: background 1s ease;
      position: absolute;
      height: 100%;
      width: 80px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;

      z-index: 3;

      :global(svg) {
        filter: drop-shadow(0 0 1px black);
      }

      &.left {
        top: 0;
        bottom: 0;

        :global(svg) {
          transform: rotate(90deg);
        }

        &::after {
          content: '';
          transition: opacity 0.3s ease;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.6), transparent);
          opacity: 0;
          z-index: -1;
        }
      }

      &.right {
        top: 0;
        bottom: 0;
        right: 0;

        :global(svg) {
          transform: rotate(-90deg);
        }

        &::after {
          content: '';
          transition: opacity 0.3s ease;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to left, rgba(0, 0, 0, 0.6), transparent);
          opacity: 0;
          z-index: -1;
        }
      }

      &:hover::after {
        opacity: 1;
      }
    }
  }
</style>

<div class="slider-horizontal-container g-box" style="height: {height};">
  {#if currentScroll > 0}
    <button class="slide-it left" aria-label="Anterior" onclick={scrollBefore}>
      <Svg name="arrow" width="50" height="50" fill="#FFF" />
    </button>
  {/if}

  <div class="slider-horizontal" style="height: {height}; gap: {gap}px" bind:this={HTMLSlider}>
    <div class="slides" bind:this={HTMLSlides}>
      {@render children?.()}
    </div>
  </div>

  <button class="slide-it right" aria-label="Siguiente" onclick={scrollNext}>
    <Svg name="arrow" width="50" height="50" fill="#FFF" />
  </button>
</div>
