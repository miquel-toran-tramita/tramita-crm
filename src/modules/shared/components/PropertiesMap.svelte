<script lang="ts">
  import leafletImage from 'leaflet-image'
  import type { IProperty } from '@/sync/interfaces/IProperty'
  import 'leaflet/dist/leaflet.css'
  import { onMount } from 'svelte'

  interface Props {
    properties: IProperty[]
  }

  let { properties }: Props = $props()

  const buildMarkers = (L, markerGroup) => {
    for (let property of properties) {
      const icon = L.divIcon({
        className: '', // opcional: quita clases por defecto de Leaflet
        html: `
          <svg height="100" width="100">
            <circle r="45" cx="50" cy="50" stroke="#990000" stroke-width="3" fill="transparent" opacity="1" />
            <circle r="45" cx="50" cy="50" stroke-width="3" fill="#990000" opacity="0.3" />
          </svg> 
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      })

      const marker = L.marker([property.latitud, property.altitud], { icon })
      marker.addTo(markerGroup) // Añadir el marcador al grupo de capas
    }
  }

  let map

  const createMap = async (property) => {
    const L = (await import('leaflet')).default

    if (map) map.remove()

    map = L.map('properties-map').setView([property.latitud, property.altitud], 15)

    L.tileLayer(`https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}?api_key=${import.meta.env.PUBLIC_MAP_TOKEN}`, {
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
    }).addTo(map)

    const markerGroup = L.layerGroup().addTo(map)
    buildMarkers(L, markerGroup)
  }

  onMount(async () => {
    document.addEventListener('generate-map-img', (ev: CustomEvent) => {
      leafletImage(map, function (err, canvas) {
        var img = ev.detail
        var dimensions = map.getSize()
        img.width = dimensions.x
        img.height = dimensions.y
        img.src = canvas.toDataURL()
      })
    })
  })

  $effect(() => {
    if (properties) {
      createMap(properties[0])
    }
  })
</script>

<style lang="scss">
  #properties-map {
    width: 100%;
    height: 100%;
    border-radius: var(--radius);
    z-index: 1;
  }
</style>

<div id="properties-map"></div>
