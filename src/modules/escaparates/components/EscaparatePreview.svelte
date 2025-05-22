<script lang="ts">
  import CertificadoEnergetico from '@/modules/escaparates/components/CertificadoEnergetico.svelte'
  import PropertiesMap from '@/modules/shared/components/PropertiesMap.svelte'
  import SliderSlim from '@/modules/shared/components/SliderSlim.svelte'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { formatPrice } from '@/modules/shared/scripts/generic'
  import type { IProperty } from '@/sync/interfaces/IProperty'

  interface Props {
    property: IProperty
    currentPhoto?: number
    reserved?: boolean
    marked?: boolean
    sold?: boolean
    horizontal?: boolean
    justForPreview?: boolean
    tagMessage?: string
  }

  let { property, currentPhoto = 0, horizontal = false, justForPreview, tagMessage }: Props = $props()

  let HTMLQr: HTMLElement = $state()

  const generateQR = async () => {
    if (typeof window !== 'undefined' && HTMLQr) {
      const { default: QRCodeStyling } = await import('qr-code-styling')

      HTMLQr.textContent = ''

      const qrCode = new QRCodeStyling({
        width: 100,
        height: 100,
        type: 'svg',
        data: `https://tramita.info/propiedades-tramita/?accion=F&id=${property?.id || ''}`,
        image: 'https://admin.tramita.info/assets/logored.png',
        cornersDotOptions: {
          type: 'dot',
          color: '#990000',
        },
        dotsOptions: {
          type: 'dots',
          color: 'gray',
        },
        cornersSquareOptions: {
          type: 'extra-rounded',
          color: '#990000',
        },
        backgroundOptions: {
          color: 'transparent',
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 2,
        },
      })

      qrCode.append(HTMLQr)
    }
  }

  $effect(() => {
    if (property) setTimeout(generateQR, 100)
  })
</script>

<style lang="scss">
  .escaparate-preview {
    .grid {
      max-height: 500px;
      display: grid;
      gap: 20px;
      grid-template-columns: 3fr 4fr 170px;

      &.horizontal {
        grid-template-columns: 1fr 260px 240px;

        h1 {
          height: 50px;
        }
        .foto {
          grid-column: span 2;
          width: 760px;
          height: 350px;

          img {
            width: 758px;
            height: 500px;
          }
        }

        .features {
          grid-row: span 1;
        }

        .price,
        .contact {
          grid-column: span 1;
        }

        .map,
        .ce {
          grid-row: span 2;
        }
      }

      &:not(.justForPreview) {
        :global(.slide-it),
        :global(.leaflet-control-container) {
          display: none;
        }
      }

      h1 {
        font-size: 28px;
        text-wrap: balance;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 90px;
        width: 100%;
        grid-column: span 3;
      }

      .foto {
        position: relative;
        width: 700px;
        height: 400px;
        background-size: cover;
        background-position: center;
        border-radius: var(--radius);
        border: 1px solid var(--colorBorder);
        cursor: pointer;
        grid-column: span 3;
        user-select: none;

        img {
          width: 698px;
          height: 100%;
        }

        .tag-message {
          position: absolute;
          font-size: 70px;
          font-weight: bold;
          top: 40%;
          left: 0;
          right: 0;
          margin: auto;
          width: fit-content;
          text-align: center;
          transform: rotate(-20deg);
          color: #75191c;
          font-family: var(--fontPrimary);
          border-radius: var(--radius);
          background-color: rgba(255, 255, 255, 1);
          padding: 10px 70px;
          border: 1px solid var(--colorBorder);
        }
      }

      .price {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        font-weight: bold;
        grid-column: span 2;
        line-height: 1;
        width: 100%;
      }

      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        grid-row: span 2;
        gap: 20px;

        .feature {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      }

      .map {
        position: relative;
        width: 100%;
        padding: 0 !important;
        overflow: hidden;

        .zone {
          position: absolute;
          bottom: 0;
          display: block;
          width: 100%;
          height: 50px;
          background-color: rgba(255, 255, 255, 0.7);
          display: flex;
          justify-content: center;
          text-align: center;
          font-weight: bold;
          align-items: center;
          z-index: 10;
        }
      }

      .qr {
        display: flex;
        align-items: center;
        margin-right: -15px;
      }

      .contact {
        grid-column: span 3;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    .shadow-box {
      padding: 20px;
      border: 1px solid var(--colorBorder);
      border-radius: var(--radius);
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .texto-legal {
      margin-top: -10px;
      font-size: 10px;
      grid-column: span 2;
      color: gray;
    }
  }
</style>

<div class="escaparate-preview" contenteditable>
  {#if property}
    <div class="grid" class:horizontal class:justForPreview>
      <h1>
        {property?.titulo || 'Título de ejemplo'}
      </h1>

      <div class="foto">
        <SliderSlim length={property.fotos.length} bind:index={currentPhoto}>
          {#each property.fotos as src}
            <img class="slide-slim" {src} alt="" />
          {/each}
        </SliderSlim>

        {#if tagMessage === 'reserved'}
          <div class="tag-message" style="left: 50px">RESERVADO</div>
        {/if}

        {#if tagMessage === 'marked'}
          <div class="tag-message" style="left: 30px">SEÑALIZADO</div>
        {/if}

        {#if tagMessage === 'sold'}
          <div class="tag-message">VENDIDO</div>
        {/if}
      </div>

      <div class="features shadow-box">
        {#if property.metrosCons}
          <div class="feature">
            <Svg name="size"></Svg>
            {property.metrosCons} m²
          </div>
        {/if}

        {#if property.habitaciones}
          <div class="feature">
            <Svg name="bed"></Svg>
            {property.habitaciones} Habs
          </div>
        {/if}

        {#if property.planta === '0' || property.planta}
          <div class="feature">
            <Svg name="apartment"></Svg>
            {property.planta === '0' ? 'Planta baja' : property.planta + 'ª Planta'}
          </div>
        {/if}

        {#if property.banyos}
          <div class="feature">
            <Svg name="bath"></Svg>
            <div>
              {property.banyos}
              {property.banyos === 1 ? 'Baño' : 'Baños'}
            </div>
          </div>
        {/if}

        {#if property.aseos}
          <div class="feature">
            <Svg name="wc"></Svg>
            <div>
              {property.aseos}
              {property.aseos === 1 ? 'Aseo' : 'Aseos'}
            </div>
          </div>
        {/if}

        {#if property.ascensor}
          <div class="feature">
            <Svg name="elevator"></Svg>
            <div>Ascensor</div>
          </div>
        {/if}

        {#if !property.ascensor && property.tipo_ofer != 'Parking'}
          <div class="feature">
            <Svg name="elevator"></Svg>
            <div>Sin ascensor</div>
          </div>
        {/if}

        <!-- {#if property.orientacion}
            <div class="feature" >
<Svg name=""></Svg>compass}
              <div>
                {property.orientacion}
              </div>
            </div>
          {/if} -->

        {#if property.conservacion && property.tipo_ofer === 'Parking' && property.conservacion != 'Ninguno'}
          <div class="feature">
            <Svg name="conservation"></Svg>

            <div>
              {property.conservacion}
            </div>
          </div>
        {/if}

        {#if Number(property.antiguedad)}
          <div class="feature">
            <Svg name="calendar"></Svg>

            <div>
              {property.antiguedad}
            </div>
          </div>
        {/if}
      </div>

      <div class="price shadow-box">
        {formatPrice(property?.precioCompra || property?.precioAlquiler)} €
      </div>

      <div class="map shadow-box" contenteditable="false">
        <PropertiesMap properties={[property]} />
        <span class="zone" contenteditable>{property.zona}</span>
      </div>

      <div class="ce shadow-box">
        <CertificadoEnergetico
          slim
          arrowWidth={20}
          energiaLetra={property.energiaLetra}
          energiaValor={property.energiaValor}
          emisionesLetra={property.emisionesLetra}
          emisionesValor={property.emisionesValor}
          type={property.tipo_ofer}
        />
      </div>

      <div class="contact shadow-box">
        <div style="display: flex; gap: 20px; align-items: center;">
          <svg class="logo" data-name="Grupo 7" viewBox="0 0 500 500" width="60px" height="60px"
            ><path
              d="M13.533 461.68H477.1c-186.168 52.854-293.864 49.761-463.567 0Z"
              data-name="Forma 3 copia"
              style="fill-rule:evenodd;fill: #990000; filter: brightness(0.5)"
            /><path
              d="M250.427 0 10.977 120.1l236.894-86.028V452.31h86.918l.852-277.689 153.385 49.405V121.809Z"
              data-name="Forma 1 copia"
              style="fill-rule:evenodd; fill: #990000;"
            /><path
              d="m13.533 218.063 147.42-40.035.852 271.727H13.533"
              data-name="Forma 2 copia"
              style="fill: #990000; filter: brightness(0.8); fill-rule:evenodd"
            /></svg
          >

          <div>
            <div class="phone">625 65 84 07</div>
            <div class="email">comercial@tramita.info</div>
            <div class="web">www.tramita.info</div>
          </div>
        </div>

        <div class="qr" bind:this={HTMLQr}></div>
      </div>

      <div class="texto-legal" contenteditable>El precio NO incluye los impuestos y gastos inherentes a la adquisición.</div>
    </div>
  {/if}
</div>
