<script lang="ts">
  import { formatPrice } from '@/modules/shared/scripts/generic'
  import Input from '@/modules/shared/components/Input.svelte'

  interface Props {
    alquilerAnual: number
  }

  const offset: number = 1.115

  let { alquilerAnual }: Props = $props()

  let perBCN: number = $state(15.85)
  let perSTK: number = $state(13.33)

  let precioVenta: number = $state(0)
  let precioImp1: number = $derived(precioVenta * offset)
  let rentBruta1: number = $derived((alquilerAnual / precioImp1) * 100)

  const rangos: number[] = $derived([10, 13, 15, 20])

  let precioBCN: number = $derived(((alquilerAnual / perBCN) * 100) / offset)
  let precioSTK: number = $derived(((alquilerAnual / perSTK) * 100) / offset)
</script>

<style lang="scss">
  .per {
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

<div class="per g-box g-calc">
  <h2>PRECIO SEGÚN TIEMPO EN RECUPERAR LA INVERSIÓN (PER)</h2>

  <div class="grid">
    <h5>Precio venta</h5>
    <Input bind:nValue={precioVenta} type="currency" sufix="€" />
    {#each rangos as rango}
      <div class="text-center">{formatPrice((alquilerAnual * rango) / offset)} €</div>
    {/each}

    <h5>Precio + Imp.</h5>
    <div class="text-center">{formatPrice(precioVenta * offset)} €</div>
    {#each rangos as rango}
      <div class="text-center">{formatPrice(alquilerAnual * rango)} €</div>
    {/each}

    <h5>PER</h5>
    <span class="text-center">{formatPrice((precioVenta * offset) / alquilerAnual, true)} años</span>
    {#each rangos as rango}
      <span class="text-center">{formatPrice(rango)} años</span>
    {/each}
  </div>

  <hr />

  <div class="grid">
    <h5 class="text-center">PER BCN</h5>
    <div class="text-center">{formatPrice(perBCN, true)} años</div>
    <h5 class="text-center">PER STK</h5>
    <div class="text-center">{formatPrice(perSTK, true)} años</div>

    <h5 class="row2 text-center">Recomendado</h5>

    <h5 class="text-center">Precio</h5>
    <div class="text-center">{formatPrice(precioBCN, false)} €</div>
    <h5 class="text-center">Precio</h5>
    <div class="text-center">{formatPrice(precioSTK, false)} €</div>
    <div class="result text-center">{formatPrice(precioVenta, false)} €</div>
  </div>
</div>
