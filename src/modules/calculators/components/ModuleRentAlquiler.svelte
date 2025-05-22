<script lang="ts">
  import { formatPrice, toNumber } from '@/modules/shared/scripts/generic.ts'
  import Input from '@/modules/shared/components/Input.svelte'

  interface Props {
    alquilerAnual: number
    resultRentAlquiler: number
  }

  const offset: number = 1.115

  let { alquilerAnual, resultRentAlquiler = $bindable() }: Props = $props()

  let rentBCN: number = $state(6.31)
  let rentSTK: number = $state(7.5)
  let precioVenta: number = $state(0)
  let precioImp1: number = $derived(precioVenta * offset)
  let rentBruta1: number = $derived((alquilerAnual / precioImp1) * 100)

  const rangos: number[] = $derived([rentBruta1, 3.5, 4, 5, 6])

  let precioBCN: number = $derived(((alquilerAnual / rentBCN) * 100) / offset)
  let precioSTK: number = $derived(((alquilerAnual / rentSTK) * 100) / offset)

  $effect(() => {
    resultRentAlquiler = precioVenta
  })
</script>

<style lang="scss">
  .rent-alquiler {
    padding: 20px;
    grid-column: span 2;

    .grid {
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: 1fr 1fr;

      .row2,
      .result {
        grid-column: span 2;
      }
    }
  }
</style>

<div class="rent-alquiler g-box g-calc">
  <h2>PRECIO SEGÚN RENTABILIDAD POR ALQUILER</h2>

  <div class="grid">
    <h5>Precio venta</h5>
    <Input bind:nValue={precioVenta} type="currency" sufix="€" />
    {#each rangos.slice(1, rangos.length) as rango}
      <div class="text-center">{formatPrice(((alquilerAnual / rango) * 100) / offset)} €</div>
    {/each}

    <h5>Precio + Imp.</h5>
    {#each rangos as rango}
      <div class="text-center">{formatPrice((alquilerAnual / rango) * 100)} €</div>
    {/each}

    <h5>Rentab. Bruta</h5>
    {#each rangos as rango}
      <span class="text-center">{formatPrice(rango, true)} %</span>
    {/each}
  </div>

  <hr />

  <div class="grid">
    <h5 class="text-center">Rentab. BCN</h5>
    <Input bind:nValue={rentBCN} value={formatPrice(rentBCN, true)} type="currency" sufix="%" />
    <h5 class="text-center">Rentab. STK</h5>
    <Input bind:nValue={rentSTK} value={formatPrice(rentSTK, true)} type="currency" sufix="%" />

    <h5 class="row2 text-center">Recomendado</h5>

    <h5 class="text-center">Precio</h5>
    <span class="text-center">{formatPrice(precioBCN)} €</span>
    <h5 class="text-center">Precio</h5>
    <span class="text-center">{formatPrice(precioSTK)} €</span>

    <div class="result text-center">{formatPrice(precioVenta)} €</div>
  </div>
</div>
