<script lang="ts">
  import Filters from '@/modules/properties/components/Filters.svelte'
  import PropertyCard from '@/modules/properties/components/PropertyCard.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import type { IProperty } from '@/modules/properties/interfaces/IProperty'

  let propertiesClone: IProperty[] = $state([])
</script>

<style lang="scss">
  .properties {
    .properties-container {
      display: grid;
      gap: var(--margin);
      align-items: stretch;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }
</style>

<div class="properties">
  <Filters bind:propertiesClone />

  <div class="properties-container">
    {#each propertiesClone as property (property.ref)}
      <a href="/panel/propiedades/{property.ref}">
        <PropertyCard {property} />
      </a>
    {/each}
  </div>

  <div class="g-new-btn-container">
    <a href="/panel/propiedades/nueva" title="Crear nueva propiedad">
      <Button icon="homeAdd" type="circle"></Button>
    </a>
  </div>
</div>
