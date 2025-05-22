<script lang="ts">
  import Input from '@/modules/shared/components/Input.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import { formatPrice, currencyToNumber, toNumber, prettyResult } from '@/modules/shared/scripts/generic'
  import { getPropertyDataFromCatastro } from '@/modules/properties/scripts/catastro'
  import Svg from '@/modules/shared/components/Svg.svelte'

  interface Props {
    supComprobada: number
    supComprobadaCons: number
    supRegistral: number
    supRegistralCons: number
    supCatastralCons: number
    alquilerAnual: number
  }

  let {
    supComprobada = $bindable(),
    supComprobadaCons = $bindable(),
    supRegistral = $bindable(),
    supRegistralCons = $bindable(),
    supCatastralCons = $bindable(),
    alquilerAnual = $bindable(),
  }: Props = $props()

  let catastroValue: string = $state('')
  let year: number = $state()
  let address: string = $state('Título')

  let valorReferencia: number = $state(0)
  let alquilerMensual: number = $state(0)

  const updatePropertyData = async () => {
    const data = await getPropertyDataFromCatastro(catastroValue)

    address = data.calle ? `${data.calle} ${data.numero}, ${data.piso} - ${data.puerta} Esc ${data.escalera}` : 'Título'
    year = data.construccion
    supCatastralCons = data.metrosCons + data.metrosComunes
  }

  let supCatastral: number = $derived(supCatastralCons / 1.12)
  let eurMetroRef: number = $derived(valorReferencia / supCatastralCons)

  $effect(() => {
    supComprobadaCons = supComprobada * 1.12
  })

  $effect(() => {
    supRegistralCons = supRegistral * 1.12
  })

  $effect(() => {
    alquilerAnual = alquilerMensual * 12
  })
</script>

<style lang="scss">
  .main-data {
    padding: 20px;

    .ref-catastral {
      :global(input) {
        text-align: left !important;
      }
    }

    .grid-valor-referencia,
    .grid-alquiler {
      grid-template-columns: 50px 1fr 1fr;

      .icon {
        grid-row: span 2;
      }
    }

    .grid-superficies {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>

<div class="g-box main-data g-calc">
  <h2>{address}</h2>

  <div class="flex ref-catastral">
    <Input placeholder="Referencia Catastral" bind:value={catastroValue} onStopTyping={updatePropertyData}></Input>
    <a href="https://www1.sedecatastro.gob.es/Cartografia/mapa.aspx?buscar=S" target="_blank">
      <Button>Sede Catastro</Button>
    </a>
  </div>

  <div class="grid grid-superficies">
    <h4>SUPERFICIE</h4>
    <h5 class="text-center">Útil</h5>
    <h5 class="text-center">Construida</h5>

    <h5>Comprobada</h5>
    <Input bind:nValue={supComprobada} type="currency" sufix="m²"></Input>
    <span>{formatPrice(supComprobadaCons, true)} m²</span>

    <h5>Registral</h5>
    <Input bind:nValue={supRegistral} type="currency" sufix="m²"></Input>
    <span>{formatPrice(supRegistralCons, true)} m²</span>

    <h5>Catastral</h5>
    <span>{formatPrice(supCatastral, true)} m²</span>
    <Input bind:nValue={supCatastralCons} value={formatPrice(supCatastralCons)} type="currency" sufix="m²"></Input>
  </div>

  <hr />

  <div class="grid grid-valor-referencia">
    <div class="icon">
      <Svg name="size" width="40" height="40" fill="var(--colorPrimary)"></Svg>
    </div>

    <a href="https://www.sedecatastro.gob.es/Accesos/SECAccDNI.aspx?Dest=3&ejercicio=2024" target="_blank">
      <h5>VALOR DE REFERENCIA</h5>
    </a>
    <Input bind:nValue={valorReferencia} type="currency" sufix="€"></Input>

    <h4>€ / M² SEGÚN V. REF.</h4>
    <span>{formatPrice(eurMetroRef, true)} €/m²</span>
  </div>

  <hr />

  <div class="grid grid-alquiler">
    <div class="icon">
      <Svg name="money" width="40" height="40" fill="var(--colorPrimary)"></Svg>
    </div>

    <a href="https://www.sedecatastro.gob.es/Accesos/SECAccDNI.aspx?Dest=3&ejercicio=2024" target="_blank">
      <h5>ALQUILER MENSUAL</h5>
    </a>

    <Input bind:nValue={alquilerMensual} type="currency" sufix="€"></Input>

    <h4>ALQUILER ANUAL</h4>
    <span>{formatPrice(alquilerAnual)} €</span>
  </div>
</div>
