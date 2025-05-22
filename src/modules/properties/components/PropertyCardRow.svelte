<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'
  import type { IFeature } from '@/modules/properties/interfaces/IFeature'
  import type { IProperty } from '@/sync/interfaces/IProperty'
  import { formatPrice } from '@/modules/shared/scripts/generic'

  interface Props {
    property: IProperty;
    slim?: boolean;
  }

  let { property, slim = false }: Props = $props();

  const features: IFeature[] = [
    {
      icon: 'apartment',
      text: property.planta === '0' ? 'Planta baja' : property.planta + 'ª Planta',
      value: property.planta === '0' || property.planta,
    },
    {
      icon: 'size',
      text: `${property.metrosCons} m² / ${property.metrosUtiles} m²`,
      value: property.metrosCons,
    },
    {
      icon: 'bed',
      text: `${property.habitaciones}`,
      value: property.habitaciones,
    },
    {
      icon: 'bath',
      text: `${property.banyos}`,
      value: property.banyos,
    },
    {
      icon: 'elevator',
      text: 'Ascensor',
      value: property.ascensor,
    },
    {
      icon: 'trastero',
      text: 'Trastero',
      value: property.trastero,
    },
    {
      icon: 'balcony',
      text: 'Terraza',
      value: property.terraza,
    },
    {
      icon: 'compass',
      text: `${property.orientacion}`,
      value: property.orientacion,
    },
    {
      icon: 'calendar',
      text: `${property.antiguedad}`,
      value: property.antiguedad,
    },
  ]

  let price: string = formatPrice(property.precioCompra) + '€'
</script>

<style lang="scss">
  .property-card {
    transition: 0.3s ease;
    height: 70px;
    display: flex;
    align-items: center;
    backdrop-filter: blur(10px);
    gap: 15px;

    &.slim {
      height: 60px;

      .photo {
        width: 60px;
      }

      &:hover {
        transform: scale(0.9);
        border: 1px solid var(--colorBorder);
      }
    }

    &:hover {
      transform: translateX(20px);
      border: 1px solid var(--colorPrimary);
    }

    .photo {
      height: 100%;
      width: 150px;
      overflow: hidden;
      border-radius: var(--radius) 0 0 var(--radius);
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;

      height: 100%;
      max-width: 250px;
      padding: 10px 0;
      .price {
        font-weight: bolder;
        font-size: 20px;
        color: var(--colorPrimary);
      }

      .ref {
        font-size: 14px;
        color: var(--colorText);
      }
    }

    .title {
      font-size: 13px;
      text-align: left;

      color: var(--colorText2);
    }
  }
</style>

<div class="property-card g-box" class:slim>
  <div class="photo">
    <img src={property.fotos[0]} alt="" />
  </div>

  <div class="info">
    <div class="price">{price}</div>
    <div class="ref">#{property.ref}</div>
  </div>
  <div class="title">{property.titulo}</div>
</div>
