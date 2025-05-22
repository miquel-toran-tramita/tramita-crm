<script lang="ts">
  import SliderSlim from '@/modules/shared/components/SliderSlim.svelte'
  import type { IProperty } from '@/sync/interfaces/IProperty'
  import Checkbox from '@/modules/shared/components/Checkbox.svelte'
  import CertificadoEnergetico from '@/modules/escaparates/components/CertificadoEnergetico.svelte'
  import { formatPrice } from '@/modules/shared/scripts/generic'
  import Button from '@/modules/shared/components/Button.svelte'
  import Input from '@/modules/shared/components/Input.svelte'
  import SelectSimple from '@/modules/shared/components/SelectSimple.svelte'
  import { ACCION, TIPO_OFERS, ESTADOS_CONSERVACION, ORIENTACIONES } from '@/modules/properties/constants/propertyRelated'
  import DataSection from '@/modules/shared/components/DataSection.svelte'
  import { api } from '@/sync/scripts/api'
  import type { SvgStore } from '@/modules/shared/interfaces/ISvgStore'

  interface Props {
    property: IProperty
    modeEditor?: boolean
  }

  let { property = {}, modeEditor }: Props = $props()
  let loading: boolean = $state(false)

  const price = property?.precioCompra ? formatPrice(property?.precioCompra) : formatPrice(property?.precioAlquiler)

  const editAndSave = async () => {
    if (modeEditor && property) {
      loading = true
      await api.put('/api/private/properties', property)
      loading = false

      modeEditor = false

      return
    }

    modeEditor = true
  }

  const updateIdealista = async () => {
    await api.post('/api/private/portals/idealista/property', property)
  }

  let editCopy: string = $derived(loading ? 'Guardando...' : modeEditor ? 'Guardar cambios' : 'Editar propiedad')
  let editIcon: keyof SvgStore = $derived(modeEditor ? 'tick' : 'edit')
</script>

<style lang="scss">
  .section-property {
    :global(.certificado-energetico) {
      max-width: 500px;
    }

    .first-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding-bottom: 20px;

      .title {
        grid-column: span 2;

        h1 {
          font-size: 40px;
          padding: 20px 0;
          text-align: center;
          color: var(--colorPrimary);
        }
      }

      .photos-container {
        min-width: 300px;
        max-height: 500px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .utils-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .price {
          font-size: 30px;
          font-weight: bold;
        }

        .buttons {
          display: flex;
          gap: 10px;
        }
      }
    }

    .data-sections {
      width: 100%;
      display: grid;
      gap: 0 60px;
      grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
    }
  }
</style>

{#if property}
  <div class="section-property">
    <div class="first-section">
      <div class="title">
        {#if modeEditor}
          <Input bind:value={property.titulo}></Input>
        {:else}
          <h1>{property.titulo}</h1>
        {/if}
      </div>

      <div class="photos-container">
        <SliderSlim length={property.fotos?.length || 0}>
          {#each property.fotos || [] as foto, index}
            <img src={foto} alt={`Image ${index}`} />
          {/each}
        </SliderSlim>
      </div>

      <div class="utils-container">
        <div class="price">{price} €</div>

        <div class="buttons">
          <Button icon={editIcon} {loading} click={editAndSave}>{editCopy}</Button>
          <Button type="secondary">Leer descripción</Button>

          <a href="/propiedades/tour-virtual/{property.ref}" target="_blank">
            <Button type="secondary">Tour Virtual</Button>
          </a>
        </div>
      </div>
    </div>

    <div class="data-sections">
      <DataSection title="Datos principales" icon="home">
        <div class="g-item">
          <h4>Accion:</h4>

          {#if modeEditor}
            <SelectSimple options={Object.values(ACCION)} bind:value={property.accion}></SelectSimple>
          {:else}
            <span>{property.accion}</span>
          {/if}
        </div>

        <div class="g-item">
          <h4>Tipo de oferta:</h4>

          {#if modeEditor}
            <SelectSimple options={Object.values(TIPO_OFERS)} bind:value={property.tipo_ofer}></SelectSimple>
          {:else}
            <span>{property.tipo_ofer}</span>
          {/if}
        </div>

        <div class="g-item">
          <h4>Conservación:</h4>

          {#if modeEditor}
            <SelectSimple options={Object.values(ESTADOS_CONSERVACION)} bind:value={property.conservacion}></SelectSimple>
          {:else}
            <span>{property.conservacion}</span>
          {/if}
        </div>

        <div class="g-item">
          <h4>Orientación:</h4>

          {#if modeEditor}
            <SelectSimple options={Object.values(ORIENTACIONES)} bind:value={property.orientacion}></SelectSimple>
          {:else}
            <span>{property.orientacion}</span>
          {/if}
        </div>
      </DataSection>

      <DataSection title="Localización" icon="map">
        <div class="g-item">
          <h4>Ciudad:</h4>

          {#if modeEditor}
            <Input bind:value={property.ciudad}></Input>
          {:else}
            <span>{property.ciudad}</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Provincia:</h4>

          {#if modeEditor}
            <Input bind:value={property.provincia}></Input>
          {:else}
            <span>{property.provincia}</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Zona:</h4>

          {#if modeEditor}
            <Input bind:value={property.zona}></Input>
          {:else}
            <span>{property.zona}</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Dirección:</h4>

          {#if modeEditor}
            <Input bind:value={property.direccion}></Input>
          {:else}
            <span>{property.direccion}</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Código postal:</h4>

          {#if modeEditor}
            <Input bind:value={property.cp}></Input>
          {:else}
            <span>{property.cp}</span>
          {/if}
        </div>
      </DataSection>

      <DataSection title="Distribución" icon="bed">
        <div class="g-item">
          <h4>Habitaciones dobles:</h4>

          {#if modeEditor}
            <Input bind:value={property.habdobles} type="number"></Input>
          {:else}
            <span>{property.habdobles}</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Habitaciones totales:</h4>

          {#if modeEditor}
            <Input bind:value={property.habitaciones} type="number"></Input>
          {:else}
            <span>{property.habitaciones}</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Baños:</h4>

          {#if modeEditor}
            <Input bind:value={property.banyos} type="number"></Input>
          {:else}
            <span>{property.banyos}</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Aseos:</h4>

          {#if modeEditor}
            <Input bind:value={property.aseos} type="number"></Input>
          {:else}
            <span>{property.aseos}</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Número de planta:</h4>

          {#if modeEditor}
            <Input bind:value={property.numplanta} type="number"></Input>
          {:else}
            <span>{property.numplanta}</span>
          {/if}
        </div>
      </DataSection>

      <DataSection title="Superficies" icon="size">
        <div class="g-item">
          <h4>Metros construidos:</h4>

          {#if modeEditor}
            <Input bind:value={property.metrosCons} sufix="m²"></Input>
          {:else}
            <span>{property.metrosCons} m²</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Metros útiles:</h4>

          {#if modeEditor}
            <Input bind:value={property.metrosUtiles} sufix="m²"></Input>
          {:else}
            <span>{property.metrosUtiles} m²</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Metros de parcela:</h4>

          {#if modeEditor}
            <Input bind:value={property.metrosParcela} sufix="m²"></Input>
          {:else}
            <span>{property.metrosParcela} m²</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Metros de cocina:</h4>

          {#if modeEditor}
            <Input bind:value={property.metrosCocina} sufix="m²"></Input>
          {:else}
            <span>{property.metrosCocina} m²</span>
          {/if}
        </div>
        <div class="g-item">
          <h4>Metros de comedor:</h4>

          {#if modeEditor}
            <Input bind:value={property.metrosComedor} sufix="m²"></Input>
          {:else}
            <span>{property.metrosComedor} m²</span>
          {/if}
        </div>
      </DataSection>

      <DataSection title="Calidades" icon="tick">
        <Checkbox label="Ascensor" value={!!property.ascensor} disabled={!modeEditor} />
        <Checkbox label="Jardín" value={!!property.jardin} disabled={!modeEditor} />
        <Checkbox label="Piscina comunitaria" value={!!property.piscina_com} disabled={!modeEditor} />
        <Checkbox label="Aire acondicionado central" value={!!property.airecentral} disabled={!modeEditor} />
        <Checkbox label="Gimnasio" value={!!property.gimnasio} disabled={!modeEditor} />
      </DataSection>

      <DataSection title="Entornos" icon="tree">
        <Checkbox label="Colegios" value={!!property.colegios} disabled={!modeEditor} />
        <Checkbox label="Centros comerciales" value={!!property.centros_comerciales} disabled={!modeEditor} />
      </DataSection>

      <DataSection title="Certificado energético" icon="energy">
        <CertificadoEnergetico
          energiaLetra={property.energiaLetra}
          energiaValor={property.energiaValor}
          emisionesLetra={property.emisionesLetra}
          emisionesValor={property.emisionesValor}
          type={property.tipo_ofer}
        />
      </DataSection>

      <DataSection title="Portales" icon="link">
        <Button icon="home" click={updateIdealista}>Actualizar en Idealista</Button>
      </DataSection>
    </div>
  </div>
{:else}
  <div class="section-property">
    <p>No hay propiedad para mostrar</p>
  </div>
{/if}
