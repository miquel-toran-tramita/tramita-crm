<script lang="ts">
  import Svg from './../../shared/components/Svg.svelte'
  import { formatPrice } from '@/modules/shared/scripts/generic.ts'
  import Input from '@/modules/shared/components/Input.svelte'

  interface Props {
    supCatastralCons: number
    resultACM: number
    resultRentAlquiler: number
    resultIdealista: number
    resultCompra: number
  }

  let { supCatastralCons, resultACM, resultRentAlquiler, resultIdealista, resultCompra }: Props = $props()

  let mvi: number = $state(0)
  let asset: number = $state(0)
</script>

<style lang="scss">
  .comparativa-tasaciones {
    padding: 20px;
    grid-column: span 2;

    h2 {
      padding-bottom: 0;
    }

    h3 {
      padding-bottom: 40px;
    }

    .grid {
      grid-template-columns: repeat(6, 1fr);
    }

    .recommeded-price {
      display: flex;
      font-size: 30px;
      div {
        width: 100%;
        text-align: center;
        color: var(--colorPrimary);
        justify-content: center;
      }

      &__title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
      }

      &__price {
        font-weight: bold;
      }
    }
  }
</style>

<div class="comparativa-tasaciones g-box g-calc">
  <h2>COMPARATIVA DE TASACIONES</h2>
  <h3>De más fiable a menos</h3>

  <div class="grid">
    <h5 class="text-center">MVI</h5>
    <h5 class="text-center">ACM</h5>
    <h5 class="text-center">ASSET</h5>
    <h5 class="text-center">RENTAB.</h5>
    <h5 class="text-center">IDEALISTA</h5>
    <h5 class="text-center">COMPRA</h5>

    <Input bind:nValue={mvi} type="currency" sufix="€" />
    <div class="text-center">{formatPrice(resultACM)} €</div>
    <Input bind:nValue={asset} type="currency" sufix="€" />
    <div class="text-center">{formatPrice(resultRentAlquiler)} €</div>
    <div class="text-center">{formatPrice(resultIdealista)} €</div>
    <div class="text-center">{formatPrice(resultCompra)} €</div>

    <div class="text-center">{formatPrice(mvi / supCatastralCons)} €/m²</div>
    <div class="text-center">{formatPrice(resultACM / supCatastralCons)} €/m²</div>
    <div class="text-center">{formatPrice(asset / supCatastralCons)} €/m²</div>
    <div class="text-center">{formatPrice(resultRentAlquiler / supCatastralCons)} €/m²</div>
    <div class="text-center">{formatPrice(resultIdealista / supCatastralCons)} €/m²</div>
    <div class="text-center">{formatPrice(resultCompra / supCatastralCons)} €/m²</div>
  </div>

  <hr />

  <div class="recommeded-price">
    <div class="recommeded-price__title">
      <Svg name="logo" fill="var(--colorPrimary)" width="40" height="40"></Svg>
      PRECIO RECOMENDADO
    </div>
    <div class="recommeded-price__price">{formatPrice(mvi)} €</div>
  </div>
</div>
