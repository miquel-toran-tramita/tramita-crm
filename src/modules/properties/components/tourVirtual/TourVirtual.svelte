<script lang="ts">
  import type { BridgeType, ClickModeType, IBridge, ITourScene } from '@/sync/interfaces/ITourScene'
  import { CLICK_MODES } from '@/modules/properties/constants/tourVirtual'
  import { TourVirtual } from '@/modules/properties/scripts/TourVirtual'
  import { api } from '@/modules/shared/scripts/api'
  import { generateId } from 'lucia'
  import { onMount } from 'svelte'

  import TourVirtualPanelElement from '@/modules/properties/components/tourVirtual/TourVirtualPanelElement.svelte'
  import TourVirtualPanelCarrousel from '@/modules/properties/components/tourVirtual/TourVirtualPanelCarrousel.svelte'
  import TourVirtualPanelScene from '@/modules/properties/components/tourVirtual/TourVirtualPanelScene.svelte'

  interface Props {
    ref: string
    tourScenes: ITourScene[]
  }

  let { ref, tourScenes = [] }: Props = $props()

  let HTMLTourVirtual: HTMLElement
  let tour: TourVirtual = $state()
  let currentSceneI: number = $state(0)
  let clickMode: ClickModeType = $state('')

  let newBridge: IBridge = $state()
  let newDestiny: string = $state('')
  let newType: BridgeType = $state('Flecha')
  let grabbing: boolean = $state(false)

  const removeBridge = async (ev: MouseEvent) => {
    const removedId = tour.onContextMenu(ev)
    const tourScene = tourScenes[currentSceneI]

    tourScenes[currentSceneI].bridges = tourScene.bridges.filter((br: IBridge) => br.id != removedId)

    await api.put('/api/private/properties', { ref, tourScenes })
  }

  const setBridge = async (ev: MouseEvent) => {
    const destinyScene = tourScenes.find((sc: ITourScene) => sc.id === newDestiny)

    if (clickMode === CLICK_MODES.ADDER) {
      newBridge = {
        id: generateId(5),
        destiny: newDestiny,
        type: newType || 'Flecha',
        text: destinyScene?.text,
      }

      const coords = tour.addButton(newBridge, ev)
      newBridge = { ...newBridge, ...coords }
      tourScenes[currentSceneI]?.bridges.push({ ...newBridge })

      await api.put('/api/private/properties', { ref, tourScenes })

      //reset
      newBridge.id = generateId(5)
      newBridge.destiny = ''
      newBridge.text = ''
      newDestiny = ''

      clickMode = ''
    }
  }

  const mouseDown = (ev: MouseEvent) => {
    const isBtn = tour.onMouseDown(ev)

    grabbing = !isBtn
  }

  onMount(() => {
    tour = new TourVirtual(HTMLTourVirtual, tourScenes)

    document.addEventListener('roomUpdated', (ev: CustomEvent) => {
      currentSceneI = ev.detail
    })
  })
</script>

<style lang="scss">
  .tour-virtual-editor {
    position: relative;

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

    :global(.panel h4) {
      font-size: 24px;
      width: 100%;
      padding-bottom: 20px;
      text-align: center;
    }
    :global(.panel .btn) {
      width: 100%;
      text-wrap: auto;
      padding: 10px;
    }

    .tour-virtual-container {
      cursor: grab;

      &.grabbing {
        cursor: grabbing !important;
      }
      &.adder {
        cursor: crosshair !important;
      }
    }
  }
</style>

<div class="tour-virtual-editor">
  <div
    class="tour-virtual-container"
    class:grabbing
    class:adder={clickMode === CLICK_MODES.ADDER}
    role="button"
    tabindex="0"
    onclick={tour.onClick}
    onmousemove={tour.onMouseMove}
    onmousedown={mouseDown}
    onmouseup={() => (grabbing = false)}
    onwheel={tour.onMouseWheel}
    oncontextmenu={removeBridge}
    ondblclick={setBridge}
    onkeydown={() => {}}
    bind:this={HTMLTourVirtual}
  ></div>

  {#if tourScenes?.length}
    <TourVirtualPanelElement bind:clickMode bind:newType {newDestiny} />
    <TourVirtualPanelScene bind:tourScenes {ref} {currentSceneI} {tour} />
  {/if}
  <TourVirtualPanelCarrousel bind:clickMode bind:currentSceneI bind:tourScenes bind:newDestiny {tour} {ref} />
</div>

<svelte:window onresize={tour.onResize} />
