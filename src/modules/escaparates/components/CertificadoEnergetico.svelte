<script lang="ts">
  interface Props {
    energiaLetra: any
    energiaValor: any
    emisionesLetra: any
    emisionesValor: any
    type: any
    arrowWidth?: number
    slim?: boolean
  }

  interface IEtiqueta {
    letra: string
    color: string
  }

  let { energiaLetra, energiaValor, emisionesLetra, emisionesValor, type, arrowWidth = 50, slim = false }: Props = $props()

  let message: string = $derived(type === 'Parking' ? 'EXENTO' : !energiaLetra || !energiaValor ? 'EN TRAMITE' : '')
  let casillas = $state([])

  const etiquetas: IEtiqueta[] = [
    { letra: 'A', color: '#249650' },
    { letra: 'B', color: '#30B34D' },
    { letra: 'C', color: '#96CA42' },
    { letra: 'D', color: '#E9E933' },
    { letra: 'E', color: '#EEB22E' },
    { letra: 'F', color: '#DB742D' },
    { letra: 'G', color: '#DC2E2F' },
  ]

  $effect(() => {
    let newCasillas = []

    etiquetas.map((etq: IEtiqueta) => {
      newCasillas = [
        ...newCasillas,
        etq,
        { number: energiaLetra === etq.letra && energiaValor ? energiaValor + (slim ? '¹' : '') : '' },
        { number: emisionesLetra === etq.letra && emisionesValor ? emisionesValor + (slim ? '²' : '') : '' },
      ]
    })

    casillas = newCasillas
  })
</script>

<style lang="scss">
  .certificado-energetico {
    position: relative;
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;

    &.slim {
      margin-top: 0;

      .flecha {
        font-size: 12px;
        padding-left: 5px !important;
      }

      .numero {
        font-size: 12px;
      }

      .ce-text {
        padding-top: 10px;
        font-size: 8px;
      }
    }

    .head {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      align-items: end;
      gap: 5px;
      margin-bottom: 10px;

      * {
        font-size: 9px;
        text-align: center;
        text-wrap: balance;
      }

      .escala {
        font-weight: bold;
        font-size: 11px;
        text-align: left;
      }
    }

    .tabla {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 5px;

      .casilla {
        border-radius: 5px;
        background-color: #f7f7f7;
        height: 100%;
        max-height: 30px;
        overflow: hidden;

        .numero {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
        }

        .flecha {
          height: 100%;
          position: relative;
          color: white;
          font-weight: bold;
          display: flex;
          padding-left: 10px;
          align-items: center;

          border-radius: 2.5px;

          .punta {
            content: '';

            position: absolute;
            height: 100%;
            width: 10px;
            right: -9px;
            clip-path: polygon(0 0, 100% 50%, 0 100%);
            background-color: inherit;
          }
        }
      }
    }

    .message {
      position: absolute;
      left: 0;
      right: 0;
      top: 30%;
      margin: auto;
      width: max-content;
      z-index: 1;
      font-size: 20px;
      color: #19312c;
      font-weight: bold;
      transform: rotate(-45deg);
    }
  }
</style>

<div class="certificado-energetico" class:slim>
  <div class="message">{message}</div>

  {#if !slim}
    <div class="head">
      <div class="escala">Escala de la cualificación energética</div>
      <div class="consumo-energia">Consumo energia kWh/m² año</div>
      <div class="emisiones">Emisiones kgCO₂/m² año</div>
    </div>
  {/if}

  <div class="tabla">
    {#each casillas as valor, index}
      <div class="casilla">
        {#if valor.letra}
          <div class="flecha" style="width: calc({index * 2}% + {arrowWidth}px); background-color: {valor.color};">
            <span> {valor.letra}</span>
            <span class="punta"></span>
          </div>
        {/if}
        {#if valor?.number}
          <div class="numero">{valor.number}</div>
        {/if}
      </div>
    {/each}
  </div>

  {#if slim}
    <div class="ce-text">
      1&nbsp; Consumo energia kWh/m² año <br />
      2 Emisiones kgCO₂/m² año
    </div>
  {/if}
</div>
