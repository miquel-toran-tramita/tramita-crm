<script lang="ts">
  import { onMount } from 'svelte'
  import Chart from 'chart.js/auto'
  import { formatPrice, currencyToNumber, addQueryParam } from '@/modules/shared/scripts/generic'
  import Input from '@/modules/shared/components/Input.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import { createChart1, createChart2 } from '@/modules/calculators/scripts/chartSimuladorHipoteca'
  import { generatePDFbyURL } from '@/modules/shared/scripts/pdf'
  import { PUBLIC_BASE_URL } from '$env/static/public'

  let price: string = $state('150.000')
  let savings: string = $state('0')
  let interest: number = $state(1)
  let years: number = $state(30)
  let loading: boolean = $state(false)
  let title: string = $state('')

  let totalMonths = $derived(years * 12)
  let monthlyInterest = $derived(interest / 12 / 100)
  let priceNum = $derived(currencyToNumber(price))
  let savingsNum = $derived(currencyToNumber(savings))
  let taxes = $derived(Math.floor(priceNum * 0.11))
  let loan = $derived(Math.max(priceNum + taxes - savingsNum, 0))
  let cuota = $derived(
    monthlyInterest > 0
      ? Math.round((loan * monthlyInterest * Math.pow(1 + monthlyInterest, totalMonths)) / (Math.pow(1 + monthlyInterest, totalMonths) - 1))
      : loan / totalMonths
  )

  let totalHipotecaPagada = $derived(cuota * totalMonths)
  let totalInterest = $derived(totalHipotecaPagada - loan)
  let totalCompra = $derived(priceNum + taxes)
  let costeTotal = $derived(totalHipotecaPagada + savingsNum + taxes)

  let canvas1: HTMLCanvasElement
  let canvas2: HTMLCanvasElement
  let chart1: Chart
  let chart2: Chart

  let data1 = $derived([priceNum, taxes])
  let data2 = $derived([savingsNum, loan, totalInterest])

  const generatePDF = async () => {
    loading = true

    await generatePDFbyURL(`${PUBLIC_BASE_URL}/calculadoras/templates/simulador-hipotecas${window.location.search}`)

    loading = false
  }

  onMount(() => {
    chart1 = createChart1(canvas1, data1)
    chart2 = createChart2(canvas2, data2)
  })

  $effect(() => {
    chart1.data.datasets[0].data = data1
    chart2.data.datasets[0].data = data2
    chart1.update()
    chart2.update()
  })

  $effect(() => {
    addQueryParam('totalCompra', totalCompra)
    addQueryParam('priceNum', priceNum)
    addQueryParam('taxes', taxes)
    addQueryParam('costeTotal', costeTotal)
    addQueryParam('loan', loan)
    addQueryParam('savingsNum', savingsNum)
    addQueryParam('totalInterest', totalInterest)
    addQueryParam('title', title)
  })
</script>

<style lang="scss">
  .calculator-hipoteca-container {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    gap: 20px;
    max-width: fit-content;
    margin-bottom: 20px;

    .input-container {
      width: 300px;
    }

    .title {
      grid-column: span 2;
    }

    .charts {
      display: flex;
      flex-direction: column;
      gap: 25px;

      .chart-container {
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: right;
        gap: 25px;

        .total {
          font-size: 25px;
          margin-bottom: 10px;

          span {
            font-family: var(--fontPrimary);
          }

          span:nth-child(2) {
            padding-left: 5px;
            font-weight: bold;
          }
        }

        .item {
          color: var(--colorText2);
          display: flex;
          align-items: center;
          gap: 8px;

          .result-text {
            width: 100%;
            display: flex;
            justify-content: space-between;

            span {
              color: var(--colorText2);
            }
          }

          .color {
            height: 15px;
            width: 15px;
            border-radius: 3px;

            &.primary {
              background-color: var(--colorPrimary);
            }
            &.light {
              background-color: var(--colorAccent);
            }
            &.color1 {
              background-color: #1a8cba;
            }
            &.color2 {
              background-color: #9fcedd;
            }
            &.color3 {
              background-color: #0e4a81;
            }
          }
        }
      }
    }
  }

  .cuota-grande {
    font-size: 20px;
    color: var(--colorPrimary);
    margin-top: 10px;
    font-family: var(--fontPrimary);
  }
</style>

<div class="calculator-hipoteca-container g-box">
  <div class="title">
    <Input label="Título" bind:value={title}></Input>
  </div>

  <div class="input-container">
    <Input type="currency" bind:value={price} label="Precio del inmueble" sufix="€" />
    <Input type="currency" bind:value={savings} label="Ahorro aportado" sufix="€" />
    <Input type="number" bind:value={interest} label="Tipo de interés" sufix="%" step="0.1" />
    <Input type="number" bind:value={years} label="Años de hipoteca" />
  </div>

  <div class="charts">
    <div class="chart-container">
      <canvas bind:this={canvas1}></canvas>

      <div class="components">
        <div class="total result-text">
          <span>Coste total de la compra:</span>
          <span>{formatPrice(totalCompra)}€</span>
        </div>

        <div class="item">
          <div class="color light"></div>
          <div class="result-text">
            <span>Precio inmueble:</span>
            <span>{formatPrice(priceNum)}€</span>
          </div>
        </div>

        <div class="item">
          <div class="color primary"></div>
          <div class="result-text">
            <span>Impuestos y gastos:</span>
            <span>{formatPrice(taxes)}€</span>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-container">
      <canvas bind:this={canvas2}></canvas>

      <div class="components">
        <div class="total result-text">
          <span>Coste total con hipoteca:</span>
          <span>{formatPrice(costeTotal)}€</span>
        </div>

        <div class="item">
          <div class="color color2"></div>
          <div class="result-text">
            <span>Importe hipotecado:</span>
            <span>{formatPrice(loan)}€</span>
          </div>
        </div>

        <div class="item">
          <div class="color color1"></div>
          <div class="result-text">
            <span>Ahorro aportado:</span>
            <span>{formatPrice(savingsNum)}€</span>
          </div>
        </div>

        <div class="item">
          <div class="color color3"></div>
          <div class="result-text">
            <span>Intereses pagados:</span>
            <span>{formatPrice(totalInterest)}€</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="cuota-grande" style="grid-column: span 2;">
    Pagarás: {formatPrice(cuota)}€ al mes durante {years} años
  </div>
</div>

<Button click={generatePDF}>{loading ? 'Generando informe...' : 'Generar informe PDF'}</Button>
