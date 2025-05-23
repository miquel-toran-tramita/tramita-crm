<script lang="ts">
  import type { IFilters } from '@/modules/properties/interfaces/IFilters'
  import { ORDER_BY_OPTIONS, PRICES, SIZES, ROOMS_BATHS, DEFAULT_FILTERS } from '@/modules/properties/constants/filters'
  import { OFER_SVGS } from '@/modules/properties/constants/propertyRelated'
  import { slugify, formatPrice, capitalize, toNumber, getQueryParams } from '@/modules/shared/scripts/generic'
  import { filterProperties, getFilters } from '@/modules/properties/scripts/propertiesFunctions'
  import Checkbox from '@/modules/shared/components/Checkbox.svelte'
  import SelectSimple from '@/modules/shared/components/SelectSimple.svelte'
  import SelectSub from '@/modules/shared/components/SelectSub.svelte'
  import Modal from '@/modules/shared/components/Modal.svelte'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { onMount } from 'svelte'
  import { BREAKPOINT } from '@/modules/shared/constants/globalVariables'
  import { properties } from '@/store'
  import type { IProperty } from '@/modules/properties/interfaces/IProperty'

  let isMobile: boolean = $state(false)
  let classBordered: boolean = $state(false)
  let filtersClosed = $state(true)
  let initialProperties: IProperty[] = $state([])
  let filterOptions = $state<FilterOptions>({ ofers: [], locations: [] })

  // Añadir tipos para filterOptions
  interface FilterOptions {
    ofers: string[]
    locations: {
      label: string
      subOptions: string[]
    }[]
  }

  let filters: IFilters = $state(Object.assign({}, DEFAULT_FILTERS))

  const updateQueryParams = () => {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)

    const paramsMap = {
      city: slugify(filters.city),
      zone: slugify(filters.zone),
      orderBy: slugify(filters.orderBy),
      priceMin: toNumber(filters.priceMin),
      priceMax: toNumber(filters.priceMax),
      sizeMin: toNumber(filters.sizeMin),
      sizeMax: toNumber(filters.sizeMax),
      rooms: slugify(filters.rooms?.toString()),
      baths: slugify(filters.baths?.toString()),
      terraza: slugify(filters.terraza ? 'true' : ''),
      ascensor: slugify(filters.ascensor ? 'true' : ''),
      nosell: slugify(filters.nosell ? '' : 'true'),
      norent: slugify(filters.norent ? '' : 'true'),
      notransfer: slugify(filters.notransfer ? '' : 'true'),
      tipoOfer: slugify(Array.from(filters.tipoOfer).join('-')),
    }

    Object.entries(paramsMap).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value.toString())
      } else {
        url.searchParams.delete(key) // Limpia parámetros vacíos
      }
    })

    window.history.pushState({}, '', url)
  }

  const updateOfers = (ofer: string) => {
    let newArr = []

    if (filters.tipoOfer.includes(ofer)) {
      newArr = filters.tipoOfer.filter((item) => item !== ofer)
    } else {
      newArr = [...filters.tipoOfer, ofer]
    }

    filters = { ...filters, tipoOfer: newArr }
  }

  const updateRooms = (newRooms: string) => (filters.rooms = newRooms === filters.rooms ? '' : newRooms)
  const updateBaths = (newBaths: string) => (filters.baths = newBaths === filters.baths ? '' : newBaths)

  let filtersCounter: number = $derived(
    [
      filters.priceMin,
      filters.priceMax,
      filters.sizeMin,
      filters.sizeMax,
      filters.rooms,
      filters.baths,
      filters.terraza,
      filters.ascensor,
      !filters.nosell,
      !filters.norent,
      !filters.notransfer,
      isMobile ? filters.city : null,
      isMobile ? filters.orderBy : null,
      isMobile ? filters.tipoOfer.length : null,
    ].filter((x) => x).length
  )

  let onMounted: boolean = $state(false)
  let filteredProperties: IProperty[] = $state([])

  /*$effect(() => {
    if (!onMounted) return

    if ($properties) {
      if (initialProperties.length === 0) {
        initialProperties = [...$properties]
        const filters = getFilters(initialProperties)
        filterOptions = {
          ofers: filters.ofers.filter((ofer): ofer is string => ofer !== null && ofer !== undefined),
          locations: filters.locations,
        }
      }

      filteredProperties = filterProperties(initialProperties, filters)
      properties.set(filteredProperties)
    }

    updateQueryParams()
  })*/

  onMount(() => {
    const params: any = getQueryParams(window.location.href)

    isMobile = window.innerWidth < BREAKPOINT

    if (params.tipoOfer) {
      const newOfers = params.tipoOfer.split('-')

      newOfers.map((newOfer: string) => filters.tipoOfer.push(capitalize(newOfer)))

      filters.tipoOfer = [...filters.tipoOfer] // Forzar la reactividad
    }

    if (params.city) {
      const locationIndex = filterOptions.locations.findIndex((location: any) => slugify(location.label) === params.city)

      if (locationIndex !== -1) {
        const currentZones = filterOptions.locations[locationIndex]?.subOptions || []

        filters.city = filterOptions.locations[locationIndex]?.label
        filters.zone = currentZones.find((zone: string) => slugify(zone) === params.zone) || ''
      }
    }

    if (params.orderBy) {
      filters.orderBy = ORDER_BY_OPTIONS.find((x: string) => slugify(x) === params.orderBy) || ''
    }

    if (params.priceMin) {
      filters.priceMin = PRICES.find((x: string) => x === formatPrice(params.priceMin)) || ''
    }

    if (params.priceMax) {
      filters.priceMax = PRICES.find((x: string) => x === formatPrice(params.priceMax)) || ''
    }

    if (params.sizeMin) {
      filters.sizeMin = SIZES.find((x: string) => x === `${params.sizeMin} m²`) || ''
    }

    if (params.sizeMax) {
      filters.sizeMax = SIZES.find((x: string) => x === `${params.sizeMax} m²`) || ''
    }

    if (params.rooms) filters.rooms = `${params.rooms}+`
    if (params.baths) filters.baths = `${params.baths}+`
    if (params.ascensor) filters.ascensor = true
    if (params.terraza) filters.terraza = true
    if (params.nosell) filters.nosell = false
    if (params.notransfer) filters.notransfer = false
    if (params.norent) filters.norent = false

    onMounted = true
  })
</script>

<style lang="scss">
  @use '@/sass/mixins.scss' as *;

  :global(.menu) {
    background-color: var(--colorNeutral);
  }

  :global(.bordered) {
    box-shadow: 0 0 0 0 rgba(0, 0, 0);
  }

  :global(.classBordered) {
    transition: 0.3s ease;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid var(--colorBorder);
  }

  .filters-container {
    position: sticky;
    top: 0;
    z-index: 5;
    background-color: var(--colorNeutral);
    padding: 20px 0;

    .filters {
      display: flex;
      gap: 20px;
      justify-content: space-between;

      @include notDesktop {
        padding: 0 20px !important;
      }

      .g-btn {
        padding: 0 15px;
      }

      .right {
        display: flex;
        gap: 10px;
        height: 65px;

        .more-filters {
          position: relative;
          white-space: nowrap;
          font-size: 15px;
          gap: 5px;
          .filters-counter {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--colorPrimary);
            color: var(--colorText3);
            border-radius: 100%;
            position: absolute;
            font-size: 14px;
            line-height: 2;
            width: 25px;
            height: 25px;
            font-weight: bold;
            top: -10px;
            right: 0;
            box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.3);
          }
        }

        :global(.selected) {
          height: 65px;
        }

        @include notDesktop {
          width: 100%;
          justify-content: flex-end;
        }
      }
    }
  }

  .modal-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .modal-content {
    padding: 20px;
    padding-top: 0;

    button {
      border-radius: var(--radius);
      min-width: 60px;
    }

    .clear-filters {
      display: flex;
      gap: 5px;
      align-items: center;
      font-size: 12px;
      margin-top: 30px;
      width: 100%;
      color: var(--colorText2);
    }

    .modal-filter {
      flex: 1;
      :global(.options) {
        max-height: 200px !important;
      }

      .content {
        display: flex;
        align-items: center;
        gap: 10px;

        button {
          box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0);
          width: 100%;
          padding: 15px;
          &.active {
            background-color: var(--colorSecondary);
            border: 1px solid var(--colorPrimary);
          }
        }
      }
    }

    .flex-vertical {
      display: flex;
      gap: 5px;
      width: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 10px 0;
      font-size: 14px;
    }

    .order-by-mobile {
      padding-top: 10px;
      padding-bottom: 20px;
    }
  }

  .ofers-container {
    display: flex;
    max-width: 700px;
    width: 100%;
  }
  .ofers {
    display: grid;
    justify-items: center;
    align-content: center;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    gap: 10px;
    width: 100%;

    @include notDesktop {
      padding: 20px 0;
      width: 100%;
    }

    .ofer {
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      width: 50px;
      text-align: center;
      opacity: 0.6;
      transition: 0.3s ease;

      &.active {
        opacity: 1;

        :global(svg) {
          fill: var(--colorPrimary);
        }

        span {
          color: var(--colorPrimary);
        }
      }

      span {
        font-size: 12px;
        color: var(--colorText2);
      }
    }
  }

  h3 {
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 7px;
  }

  .flex {
    display: flex;
    gap: 20px;
  }
</style>

<div class="filters-container" class:classBordered>
  <div class="filters">
    {#if !isMobile}
      <div class="flex">
        <SelectSub
          options={filterOptions.locations}
          icon="mapMarker2"
          bind:value={filters.city}
          bind:subValue={filters.zone}
          placeholder="Ciudad"
          minWidth="300"
        />
      </div>

      <div class="ofers-container">
        <div class="ofers">
          {#each filterOptions.ofers as ofer}
            <button class="ofer" class:active={filters.tipoOfer.includes(ofer)} onclick={() => updateOfers(ofer)}>
              <Svg name={OFER_SVGS[ofer as keyof typeof OFER_SVGS] ?? 'apartment'} fill="var(--colorText2)" />
              <span> {ofer === 'Local comercial' ? 'Local' : ofer} </span>
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <div class="right">
      {#if !isMobile}
        <SelectSimple options={ORDER_BY_OPTIONS} placeholder="Ordenar por" icon="swap" bind:value={filters.orderBy} minWidth="195" />
      {/if}

      <button class="g-btn radius20 more-filters" onclick={() => (filtersClosed = false)}>
        {#if filtersCounter}
          <div class="filters-counter">{filtersCounter}</div>
        {/if}
        <Svg name="filters" fill="var(--colorPrimary)" />
        Filtros
      </button>
    </div>
  </div>
</div>

<Modal id="modal-filters" bind:closed={filtersClosed} maxWidth={430}>
  {#snippet modalHeader()}
    <div class="modal-header" slot="modal-header">
      <Svg name="filters" />
      Filtros
    </div>
  {/snippet}

  {#snippet modalContent()}
    <div class="modal-content" slot="modal-content">
      <div class="modal-filter">
        <div class="flex">
          <div class="flex-vertical">
            <Checkbox bind:value={filters.nosell} />
            <span>En venta</span>
          </div>

          <div class="flex-vertical">
            <Checkbox bind:value={filters.norent} />
            <span>En alquiler</span>
          </div>

          <div class="flex-vertical">
            <Checkbox bind:value={filters.notransfer} />
            <span>Traspasos</span>
          </div>
        </div>
      </div>

      {#if isMobile}
        <div class="ofers">
          {#each filterOptions.ofers as ofer}
            <button class="ofer" class:active={filters.tipoOfer.includes(ofer)} onclick={() => updateOfers(ofer)}>
              <Svg name={OFER_SVGS[ofer as keyof typeof OFER_SVGS] ?? 'apartment'} />
              <span> {ofer} </span>
            </button>
          {/each}
        </div>

        <SelectSub
          options={filterOptions.locations}
          icon="mapMarker2"
          bind:value={filters.city}
          bind:subValue={filters.zone}
          placeholder="Ciudad"
        />

        <div class="order-by-mobile">
          <SelectSimple options={ORDER_BY_OPTIONS} placeholder="Ordenar por" icon="swap" bind:value={filters.orderBy} />
        </div>
      {/if}

      <div class="flex">
        <div class="modal-filter">
          <h3>Precio mínimo</h3>
          <SelectSimple options={PRICES} bind:value={filters.priceMin} placeholder="Min" />
        </div>

        <div class="modal-filter">
          <h3>Precio máximo</h3>
          <SelectSimple options={PRICES} bind:value={filters.priceMax} placeholder="Max" />
        </div>
      </div>

      <div class="flex">
        <div class="modal-filter">
          <h3>Tamaño mínimo</h3>
          <SelectSimple options={SIZES} bind:value={filters.sizeMin} placeholder="Min" />
        </div>

        <div class="modal-filter">
          <h3>Tamaño máximo</h3>
          <SelectSimple options={SIZES} bind:value={filters.sizeMax} placeholder="Max" />
        </div>
      </div>

      <div class="modal-filter">
        <h3>Habitaciones</h3>
        <div class="content">
          {#each ROOMS_BATHS as value}
            <button class="g-btn" class:active={filters.rooms === value} onclick={() => updateRooms(value)}>{value}</button>
          {/each}
        </div>
      </div>

      <div class="modal-filter">
        <h3>Baños</h3>
        <div class="content">
          {#each ROOMS_BATHS as value}
            <button class="g-btn" class:active={filters.baths === value} onclick={() => updateBaths(value)}>{value}</button>
          {/each}
        </div>
      </div>

      <div class="modal-filter">
        <h3>Características</h3>
        <div class="flex">
          <div class="content">
            <Checkbox bind:value={filters.ascensor} />
            <span> Ascensor</span>
          </div>
          <div class="content">
            <Checkbox bind:value={filters.terraza} />
            <span> Terraza</span>
          </div>
        </div>
      </div>

      <button
        class="clear-filters"
        onclick={() => {
          filters = { ...DEFAULT_FILTERS }
          filtersClosed = true
        }}
      >
        <Svg name="trash" fill="var(--colorText2)" /> Limpiar todos los filtros</button
      >
    </div>
  {/snippet}
</Modal>

<svelte:window onscroll={() => (classBordered = window.scrollY > 120)} />
