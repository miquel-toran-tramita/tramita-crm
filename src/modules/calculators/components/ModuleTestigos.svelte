<script lang="ts">
  import Button from '@/modules/shared/components/Button.svelte'
  import { formatPrice } from '@/modules/shared/scripts/generic.ts'
  import Input from '@/modules/shared/components/Input.svelte'
  import { toNumber } from '@/modules/shared/scripts/generic'
  import { api } from '@/sync/scripts/api.ts'
  import { average, calculateEstimatedValue } from '@/modules/calculators/scripts/formulas.ts'
  import { PUBLIC_TRAMITA_NODE } from '$env/static/public'

  interface Props {
    supRegistralCons: number
    supComprobadaCons: number
    supCatastralCons: number
    resultACM: number
  }

  interface ITestigo {
    title: string
    sup: string
    price: string
    url: string
  }

  let testigos: ITestigo[] = $state([])
  for (let x = 0; x < 5; x++) {
    testigos.push({
      title: '',
      sup: '',
      price: '',
      url: '',
    })
  }

  let { supRegistralCons, supComprobadaCons, supCatastralCons, resultACM = $bindable() }: Props = $props()
  let loading: boolean = $state(false)

  const scrapPortals = async () => {
    loading = true

    const requests = testigos.map(async (testigo: ITestigo) => {
      if (testigo.url) {
        const response = await api.post('/api/get-portal-property-data', { url: testigo.url }, {}, PUBLIC_TRAMITA_NODE)

        testigo.title = response.data.title
        testigo.price = formatPrice(response.data.price)
        testigo.sup = formatPrice(response.data.sup)
      }
    })

    await Promise.all(requests)

    loading = false
  }

  let mediaSuperficie: number = $derived(average(testigos.map((x) => toNumber(x.sup))))
  let mediaPrecio: number = $derived(average(testigos.map((x) => toNumber(x.price))))
  let mediaPrecioM2: number = $derived(average(testigos.map((x) => Math.round(toNumber(x.price) / toNumber(x.sup)))))

  let testigosPricesM2: number[] = $derived(testigos.map((t) => toNumber(t.price) / toNumber(t.sup)))

  let valorMinComprobada: number = $derived(calculateEstimatedValue(testigosPricesM2, supComprobadaCons, 'min'))
  let valorMinRegistral: number = $derived(calculateEstimatedValue(testigosPricesM2, supRegistralCons, 'min'))
  let valorMinCatastral: number = $derived(calculateEstimatedValue(testigosPricesM2, supCatastralCons, 'min'))

  let valorMedioComprobada: number = $derived(calculateEstimatedValue([mediaPrecioM2], supComprobadaCons))
  let valorMedioRegistral: number = $derived(calculateEstimatedValue([mediaPrecioM2], supRegistralCons))
  let valorMedioCatastral: number = $derived(calculateEstimatedValue([mediaPrecioM2], supCatastralCons))

  let valorMaxComprobada: number = $derived(calculateEstimatedValue(testigosPricesM2, supComprobadaCons, 'max'))
  let valorMaxRegistral: number = $derived(calculateEstimatedValue(testigosPricesM2, supRegistralCons, 'max'))
  let valorMaxCatastral: number = $derived(calculateEstimatedValue(testigosPricesM2, supCatastralCons, 'max'))

  $effect(() => {
    resultACM = valorMedioComprobada
  })
</script>

<style lang="scss">
  .acm {
    padding: 20px;
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .acm-grid {
      grid-template-columns: repeat(5, 1fr);

      .result {
        grid-row: span 3;
        text-align: center;
      }

      .micro-input {
        :global(input) {
          font-size: 12px;
          height: 35px;
        }
      }
    }
  }
</style>

<div class="g-box acm g-calc">
  <h2>ANÁLISIS COMPARATIVO DE MERCADO (ACM)</h2>

  <div class="grid acm-grid">
    <h5 class="text-center">TESTIGOS</h5>
    <h5 class="text-center">SUPERFÍCIE</h5>
    <h5 class="text-center">PRECIO</h5>
    <h5 class="text-center">PRECIO M²</h5>
    <h5 class="text-center">ENLACE</h5>

    {#each testigos as testigo}
      <div class="micro-input">
        <Input bind:value={testigo.title} />
      </div>
      <Input bind:value={testigo.sup} type="currency" sufix="m²" />
      <Input bind:value={testigo.price} type="currency" sufix="€" />
      <div class="text-right">{formatPrice(Math.floor(toNumber(testigo.price) / toNumber(testigo.sup) || 0))} €/m²</div>

      <div class="micro-input">
        <Input bind:value={testigo.url} />
      </div>
    {/each}

    <h5 class="text-center">Media testigos</h5>
    <span>{mediaSuperficie} m²</span>
    <span>{formatPrice(mediaPrecio)} €</span>
    <span>{formatPrice(mediaPrecioM2)} €/m²</span>

    <Button icon="robot" {loading} click={scrapPortals}></Button>
  </div>

  <hr />

  <div class="g-calc-grid grid acm-grid">
    <h4>SEGÚN SUPERFICIE</h4>
    <h5 class="text-center">Comprobada</h5>
    <h5 class="text-center">Registral</h5>
    <h5 class="text-center">Catastral</h5>
    <h5 class="text-center">Recomendado</h5>

    <h5>Valor mínimo</h5>
    <div class="text-center">{formatPrice(valorMinComprobada)} €</div>
    <div class="text-center">{formatPrice(valorMinRegistral)} €</div>
    <div class="text-center">{formatPrice(valorMinCatastral)} €</div>
    <div class="result">{formatPrice(valorMedioComprobada)} €</div>

    <h5>Valor medio</h5>
    <div class="text-center">{formatPrice(valorMedioComprobada)} €</div>
    <div class="text-center">{formatPrice(valorMedioRegistral)} €</div>
    <div class="text-center">{formatPrice(valorMedioCatastral)} €</div>

    <h5>Valor máximo</h5>
    <div class="text-center">{formatPrice(valorMaxComprobada)} €</div>
    <div class="text-center">{formatPrice(valorMaxRegistral)} €</div>
    <div class="text-center">{formatPrice(valorMaxCatastral)} €</div>
  </div>
</div>
