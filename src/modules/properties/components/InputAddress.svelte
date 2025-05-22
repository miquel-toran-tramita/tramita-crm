<script lang="ts">
  import { onMount } from 'svelte'
  let query = ''
  let resultados: any[] = []
  let direccionSeleccionada: any = null

  let timeout: number

  const buscar = async () => {
    if (query.length < 3) return

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&countrycodes=es`
    const res = await fetch(url)
    resultados = await res.json()
  }

  const seleccionar = (item: any) => {
    direccionSeleccionada = item
    query = item.display_name
    resultados = []
    // Aquí puedes usar item.address.road, item.address.city, item.address.house_number...
  }
</script>

<div class="relative max-w-md mx-auto">
  <input
    type="text"
    bind:value={query}
    placeholder="Busca una dirección..."
    on:input={() => {
      clearTimeout(timeout)
      timeout = setTimeout(buscar, 300)
    }}
    class="w-full p-3 border rounded-lg shadow"
  />

  {#if resultados.length > 0}
    <ul class="absolute z-10 w-full bg-white border rounded-lg shadow max-h-60 overflow-y-auto mt-1">
      {#each resultados as item}
        <li on:click={() => seleccionar(item)} class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          {item.display_name}
        </li>
      {/each}
    </ul>
  {/if}

  {#if direccionSeleccionada}
    <div class="mt-4 text-sm text-gray-600">
      <strong>Lat:</strong>
      {direccionSeleccionada.lat}<br />
      <strong>Lon:</strong>
      {direccionSeleccionada.lon}<br />
      <strong>Ciudad:</strong>
      {direccionSeleccionada.address?.city || direccionSeleccionada.address?.town || ''}<br />
      <strong>Calle:</strong>
      {direccionSeleccionada.address?.road || ''}<br />
      <strong>Número:</strong>
      {direccionSeleccionada.address?.house_number || ''}
    </div>
  {/if}
</div>
