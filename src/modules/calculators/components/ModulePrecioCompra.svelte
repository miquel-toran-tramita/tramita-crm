<script lang="ts">
  import { formatPrice } from '@/modules/shared/scripts/generic'
  import Input from '@/modules/shared/components/Input.svelte'

  interface Props {
    supRegistral: number
    resultCompra: number
  }

  let { supRegistral, resultCompra = $bindable() }: Props = $props()

  let buyed: number = $state(0)
  let year: number = $state(0)
  let m2Buy: number = $derived(buyed / supRegistral)
  let m2Price: number = $state(0)
  let result: number = $derived((m2Price * buyed) / m2Buy)

  $effect(() => {
    resultCompra = result
  })
</script>

<style lang="scss">
  .precio-compra {
    padding: 20px;
    grid-column: span 2;

    .grid {
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: 1fr 1fr;

      .special {
        :global(input) {
          padding-right: 50px;
        }
      }
    }
  }
</style>

<div class="precio-compra g-box g-calc">
  <h2>PRECIO DE VENTA SEGÚN PRECIO DE COMPRA</h2>

  <div class="grid">
    <h5 class="text-center">Compró por</h5>
    <h5 class="text-center">En el año</h5>
    <h5 class="text-center">€/m² compra</h5>
    <h5 class="text-center">€/m² actual</h5>
    <h5 class="text-center">Precio actual</h5>

    <Input bind:nValue={buyed} type="currency" sufix="€" />
    <Input bind:value={year} />
    <span>{formatPrice(m2Buy)} €/m²</span>
    <div class="special">
      <Input bind:nValue={m2Price} type="currency" sufix="€/m²" />
    </div>
    <span class="result text-center">{formatPrice(result)} €</span>
  </div>
</div>
