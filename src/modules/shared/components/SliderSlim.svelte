<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'

  interface Props {
    length: number
    index?: number
    children?: import('svelte').Snippet
  }

  let { length, index = $bindable(0), children }: Props = $props()

  let HTMLSliderSlim: HTMLElement = $state()
  let HTMLSlides: HTMLElement = $state()

  const goToLeft = () => {
    const width = parseInt(getComputedStyle(HTMLSliderSlim).width)

    const value = index === 0 ? 0 : --index

    HTMLSlides.style.transform = `translateX(-${value * width}px)`
  }

  const goToRight = () => {
    const width = parseInt(getComputedStyle(HTMLSliderSlim).width)
    const value = index < length - 1 ? ++index : index

    HTMLSlides.style.transform = `translateX(-${value * width}px)`
  }
</script>

<style lang="scss">
  .slider-slim {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius);

    .slides {
      cursor: pointer;
      transition: 0.3s ease;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      scroll-snap-type: y mandatory;

      :global(> *) {
        scroll-snap-align: center;
      }
    }

    .slide-it {
      transition: background 1s ease;
      position: absolute;
      top: 0;
      height: 100%;
      width: 100px;
      display: flex;
      align-items: center;
      cursor: pointer;
      background: linear-gradient(to right, transparent, transparent);
      z-index: 1;
      user-select: none;

      &.hide {
        display: none;
      }

      // Pseudo-element for hover gradient
      &::after {
        content: '';
        transition: opacity 0.3s ease;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent);
        opacity: 0;
        z-index: -1;
      }

      &:hover::after {
        opacity: 1;
      }

      &.right {
        right: 0;
        transform: rotateZ(180deg);
      }

      :global(svg) {
        width: 50px !important;
        height: 50px !important;
        fill: white;
        filter: drop-shadow(0 0 1px black);
      }

      &.left {
        :global(svg) {
          transform: rotate(90deg);
        }
      }

      &.right {
        :global(svg) {
          transform: rotate(90deg);
        }
      }
    }
  }
</style>

<div class="slider-slim" bind:this={HTMLSliderSlim}>
  <button class="slide-it left" class:hide={index === 0} onclick={goToLeft} aria-label="Anterior">
    <Svg name="arrow" />
  </button>

  <div class="slides" bind:this={HTMLSlides}>
    {@render children?.()}
  </div>

  <button class="slide-it right" class:hide={index === length - 1} onclick={goToRight} aria-label="Siguiente">
    <Svg name="arrow" />
  </button>
</div>
