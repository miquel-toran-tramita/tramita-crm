<script lang="ts">
  import Filters from '@/modules/properties/components/Filters.svelte'
  import PropertyCard from '@/modules/properties/components/PropertyCard.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import type { IProperty } from '@/modules/properties/interfaces/IProperty'
  import { properties } from '@/store'

  let isLoading = $state(true)
  let propertiesFiltered: IProperty[] = $derived($properties.filter((property) => !property.hide))
</script>

<style lang="scss">
  .properties {
    .properties-container {
      display: grid;
      gap: var(--margin);
      align-items: stretch;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      font-size: 1.2em;
      color: var(--colorNeutralDark);
    }
  }
</style>

<div class="properties">
  <Filters />

  {#if isLoading}
    <div class="loading">Cargando propiedades...</div>
  {:else}
    <div class="properties-container">
      {#each propertiesFiltered as property (property.ref)}
        <a href="/propiedades/{property.ref}">
          <PropertyCard {property} />
        </a>
      {/each}
    </div>
  {/if}

  <div class="g-new-btn-container">
    <a href="/propiedades/nueva" title="Crear nueva propiedad">
      <Button icon="homeAdd" type="circle"></Button>
    </a>
  </div>
</div>
