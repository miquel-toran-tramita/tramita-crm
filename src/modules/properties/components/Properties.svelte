<script lang="ts">
  import Filters from '@/modules/properties/components/Filters.svelte'
  import PropertyCard from '@/modules/properties/components/PropertyCard.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import { orderTipoOfers } from '@/modules/properties/scripts/propertiesFunctions'
  import { onMount } from 'svelte'
  import { api } from '@/sync/scripts/api'
  import type { IProperty } from '@/sync/interfaces/IProperty'

  let properties: IProperty[] = $state([])
  let propertiesFiltered = $derived(properties.filter((property: IProperty) => !property.hide))

  onMount(async () => {
    const response = await api.post('/api/private/properties')

    properties = response.data.sort((a, b) => orderTipoOfers(a.tipo_ofer) - orderTipoOfers(b.tipo_ofer))
  })
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
  <Filters bind:properties />

  <div class="properties-container">
    {#each propertiesFiltered as property (property.ref)}
      <a href="/propiedades/{property.ref}">
        <PropertyCard {property} />
      </a>
    {/each}
  </div>

  <div class="g-new-btn-container">
    <a href="/propiedades/nueva" title="Crear nueva propiedad">
      <Button icon="homeAdd" type="circle"></Button>
    </a>
  </div>
</div>
