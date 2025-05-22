<script lang="ts">
  import { formatPrice, toNumber } from '@/modules/shared/scripts/generic.ts'
  import { average } from '@/modules/calculators/scripts/formulas'
  import Button from '@/modules/shared/components/Button.svelte'
  import Input from '@/modules/shared/components/Input.svelte'

  interface Props {
    supCatastralCons: number
    resultIdealista: number
  }

  let { supCatastralCons, resultIdealista = $bindable() }: Props = $props()

  let minPrice: number = $state(0)
  let maxPrice: number = $state(0)
  let recomended: number = $derived(average([minPrice, maxPrice]))
  let eurM2: number = $derived(Math.round(recomended / supCatastralCons))

  $effect(() => {
    resultIdealista = recomended
  })
</script>

<style lang="scss">
  .price-by-idealista {
    padding: 20px;
    grid-column: span 2;

    .grid {
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: 1fr 1fr;

      a {
        grid-row: span 2;
      }

      .idealista-valorador {
        height: 100%;

        :global(button) {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
      }
    }
  }
</style>

<div class="price-by-idealista g-box g-calc">
  <h2>PRECIO DE VENTA SEGÚN IDEALISTA</h2>

  <div class="grid">
    <a class="idealista-valorador" href="https://www.idealista.com/valoracion-de-inmuebles/" target="_blank">
      <Button>
        <img src="/assets/idealista-logo.png" width="30px" height="30px" style="border-radius: 5px;" alt="" />
        Valorador online
      </Button>
    </a>
    <h5 class="text-center">€/m² Zona</h5>
    <h5 class="text-center">Mínimo</h5>
    <h5 class="text-center">Máximo</h5>
    <h5 class="text-center">Recomendado</h5>

    <div class="text-center">{formatPrice(eurM2)} €</div>
    <Input bind:nValue={minPrice} type="currency" sufix="€" />
    <Input bind:nValue={maxPrice} type="currency" sufix="€" />
    <div class="result text-center">{formatPrice(recomended)} €</div>
  </div>
</div>
