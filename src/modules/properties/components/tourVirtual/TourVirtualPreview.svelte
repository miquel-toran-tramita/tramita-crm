<script lang="ts">
  import type { ITourScene } from '@/sync/interfaces/ITourScene'
  import { TourVirtual } from '@/modules/properties/scripts/TourVirtual'
  import TourVirtualPanelCarrousel from '@/modules/properties/components/tourVirtual/TourVirtualPanelCarrousel.svelte'
  import Svg from '@/modules/shared/components/Svg.svelte'

  interface Props {
    tourScenes: ITourScene[]
    title: string
  }

  let { tourScenes, title }: Props = $props()

  let HTMLTourVirtual: HTMLElement
  let opacity0: boolean = $state(false)
  let none: boolean = $state(false)
  let grabbing: boolean = $state(false)

  const firstImage = tourScenes[0].cover

  let tour: TourVirtual = $state()

  const loadTour = () => {
    if (!tour) {
      tour = new TourVirtual(HTMLTourVirtual, tourScenes)
    }
  }

  const showTour = () => {
    opacity0 = true

    setTimeout(() => (none = true), 1000)
  }
</script>

<style lang="scss">
  @use '/src/sass/mixins.scss' as *;
  .intro {
    transition: 1s ease;
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &.opacity0 {
      opacity: 0;
    }

    &.none {
      display: none;
    }

    .tour-title {
      padding-top: 50px;
      font-size: 50px;
      color: white;
      font-family: var(--fontPrimary);

      @include notDesktop {
        font-size: 30px;
      }
    }

    .property-title {
      font-size: 30px;
      font-weight: bold;
      color: var(--colorPrimary);
      text-align: center;

      @include notDesktop {
        font-size: 20px;
      }
    }

    .brand {
      position: absolute;
      left: 40px;
      bottom: 40px;
      display: flex;
      align-items: center;
      gap: 10px;

      span {
        color: white;
        font-family: var(--fontPrimary);
      }
    }

    button {
      transition: 0.3s ease;

      &:hover {
        transform: scale(0.9);
      }
    }

    img {
      width: 100%;
      height: 100vh;
      position: absolute;
      object-fit: cover;
      z-index: -1;
      filter: brightness(0.2);
    }
  }

  .tour-virtual-preview {
    position: relative;

    .tour-virtual-container {
      cursor: grab;

      &.grabbing {
        cursor: grabbing;
      }
    }

    :global(.panel) {
      transition: 0.3s ease;
      position: fixed;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      height: fit-content;
      z-index: 2;
      opacity: 1;
    }

    :global(.slides) {
      padding-left: 20px;
    }
  }
</style>

<div class="intro" onmouseenter={loadTour} onclick={showTour} onkeydown={() => {}} role="button" tabindex="0" class:opacity0 class:none>
  <img src={firstImage} alt="background" />

  <button class="g-box">
    <Svg name="play" width="100" height="100" fill="var(--colorPrimary)"></Svg>
  </button>

  <span class="tour-title"> Tour Virtual </span>
  <span class="property-title"> {title} </span>

  <div class="brand">
    <Svg name="logo" />
    <span>Tramita Inmobiliaria</span>
  </div>
</div>

<div class="tour-virtual-preview">
  <div
    bind:this={HTMLTourVirtual}
    class="tour-virtual-container"
    class:grabbing
    onclick={tour.onClick}
    onmousemove={tour.onMouseMove}
    onmousedown={() => (grabbing = true)}
    onmouseup={() => (grabbing = false)}
    onwheel={tour.onMouseWheel}
    role="button"
    tabindex="0"
    onkeydown={() => {}}
  ></div>

  <TourVirtualPanelCarrousel {tour} {tourScenes}></TourVirtualPanelCarrousel>
</div>
