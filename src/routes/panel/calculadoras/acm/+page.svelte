<script lang="ts">
  import ModulePrecioCompra from '@/modules/calculators/components/ModulePrecioCompra.svelte'
  import ModuleMainData from '@/modules/calculators/components/ModuleMainData.svelte'
  import ModuleTestigos from '@/modules/calculators/components/ModuleTestigos.svelte'
  import ModulePriceByIdealista from '@/modules/calculators/components/ModulePriceByIdealista.svelte'
  import ModuleRentAlquiler from '@/modules/calculators/components/ModuleRentAlquiler.svelte'
  import ModuleComparativaTasaciones from '@/modules/calculators/components/ModuleComparativaTasaciones.svelte'
  import ModulePER from '@/modules/calculators/components/ModulePER.svelte'
  import { onMount } from 'svelte'
  import { spotlight } from '@/modules/calculators/scripts/spotlight'

  let supRegistral: number = 0
  let supRegistralCons: number = 0
  let supComprobada: number = 0
  let supComprobadaCons: number = 0
  let supCatastralCons: number = 0
  let alquilerAnual: number = 0

  let resultACM: number = 0
  let resultRentAlquiler: number = 0
  let resultIdealista: number = 0
  let resultCompra: number = 0

  let HTMLSpotlight: HTMLElement

  onMount(() => {
    spotlight(HTMLSpotlight)
  })
</script>

<style lang="scss">
  #calculadora-acm {
    width: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    padding-bottom: 100px;
  }
</style>

<div id="calculadora-acm">
  <div class="g-calc-spotlight" bind:this={HTMLSpotlight}></div>
  <ModuleMainData
    bind:supComprobada
    bind:supRegistral
    bind:supRegistralCons
    bind:supCatastralCons
    bind:alquilerAnual
    bind:supComprobadaCons
  />
  <ModuleTestigos {supRegistralCons} {supComprobadaCons} {supCatastralCons} bind:resultACM />
  <ModuleRentAlquiler {alquilerAnual} bind:resultRentAlquiler />
  <ModulePER {alquilerAnual} />
  <ModulePriceByIdealista {supCatastralCons} bind:resultIdealista />
  <ModulePrecioCompra {supRegistral} bind:resultCompra />
  <ModuleComparativaTasaciones {supCatastralCons} {resultACM} {resultRentAlquiler} {resultIdealista} {resultCompra} />
</div>
