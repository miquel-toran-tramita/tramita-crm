<script lang="ts">
  import { formatPrice } from '@/modules/shared/scripts/generic'
  import type { IProperty } from '@/sync/interfaces/IProperty'

  interface Props {
    property: IProperty
  }

  let { property = $bindable() }: Props = $props()

  const loadPhotos = () => (property.photosLoaded = true)
</script>

<style lang="scss">
  .card {
    position: relative;
    width: 100%;
    min-width: 200px;
    max-width: 400px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    .photos {
      position: relative;
      width: 100%;
      aspect-ratio: 10 / 8;
      border-radius: var(--radius);
      border: 1px solid var(--colorBorder);
      overflow: hidden;
      flex-shrink: 0;

      .photo {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        left: 0;
      }

      .label {
        position: absolute;
        top: 0;
        z-index: 2;
        margin: 10px;
        background-color: var(--colorSecondary);
        padding: 3px 10px;
        border-radius: 7px;
        font-size: 14px;
        border: 1px solid var(--colorBorder);
      }
    }

    .details {
      position: relative;
      padding: 4px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      .title {
        margin-top: 5px;
        font-weight: bold;
        font-size: 14px;
        text-align: left;
      }

      .extra-data {
        display: flex;
        padding-top: 5px;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        .price {
          font-weight: 900;
          font-size: 22px;
          color: var(--colorPrimary);
          width: fit-content;
        }

        .ref {
          color: var(--colorText2);
          font-style: oblique;
        }
      }
    }
  }
</style>

<div class="card">
  <div class="photos" onmouseover={loadPhotos} onfocus={loadPhotos} role="button" tabindex="0">
    <div class="label">{property.tipo_ofer}</div>

    {#if property.photosLoaded}
      {#each property.fotos.slice(1, 5).reverse() as foto}
        <img src={foto} alt="foto" class="photo" loading="lazy" width="360" height="285" />
      {/each}
    {/if}
    <img src={property.fotos[0]} alt="foto" class="photo" loading="lazy" width="360" height="285" />
  </div>
  <div class="details">
    <h2 class="title">{property.titulo}</h2>

    <div class="extra-data">
      {#if property.accion === 'Vender'}
        <div class="price">{formatPrice(property.precioCompra)} €</div>
      {:else}
        <div class="price">{formatPrice(property.precioAlquiler)} €</div>
      {/if}
      <div class="ref">#{property.ref}</div>
    </div>
  </div>
</div>
