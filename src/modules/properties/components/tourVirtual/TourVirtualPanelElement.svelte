<script lang="ts">
  import Button from '@/modules/shared/components/Button.svelte'
  import SelectSimple from '@/modules/shared/components/SelectSimple.svelte'
  import { CLICK_MODES, BRIDGE_OPTIONS } from '@/modules/properties/constants/tourVirtual'
  import type { BridgeType, ClickModeType, IBridge } from '@/sync/interfaces/ITourScene'

  interface Props {
    clickMode: ClickModeType
    newDestiny: string
    newType: BridgeType
  }

  let { clickMode = $bindable(), newType = $bindable(), newDestiny }: Props = $props()

  const options = Object.values(BRIDGE_OPTIONS)

  const toggleDestiny = () => {
    clickMode = clickMode === CLICK_MODES.DESTINY ? '' : CLICK_MODES.DESTINY
  }
</script>

<style lang="scss">
  .type-element {
    transform-origin: top left;
    left: 20px;
    top: 20px;
    width: 300px;
    right: unset;

    .g-box {
      padding: 20px;
    }

    .advice {
      padding-top: 10px;
      font-size: 14px;
    }
  }
</style>

<div class="panel type-element">
  <div class="g-box">
    <h4>Elementos</h4>
    <SelectSimple bind:value={newType} {options} hideDelete></SelectSimple>

    <br />

    <Button type={clickMode ? 'secondary' : 'main'} click={toggleDestiny}>
      {#if clickMode === CLICK_MODES.DESTINY}
        Eligiendo...
      {:else if newDestiny}
        Destino elegido 👍 <br /><br /> Ahora haz doble click donde quieras añadirlo
      {:else}
        Elegir destino
      {/if}
    </Button>

    <div class="advice">* Para borrar click derecho encima de un elemento</div>
  </div>
</div>
