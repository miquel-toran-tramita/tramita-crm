<script lang="ts">
  import { onMount } from 'svelte'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import type { ILabelValue } from '@/modules/shared/interfaces/ILabelValue'

  interface Props {
    value?: string | number
    options?: ILabelValue[] | string[]
    icon?: string
    id?: string
    minWidth?: string
    placeholder?: string
    hideDelete?: boolean
  }

  let {
    value = $bindable(''),
    options = [],
    icon = '',
    id = '',
    minWidth = 'fit-content',
    placeholder = 'Selecciona una opción',
    hideDelete = false,
  }: Props = $props()

  let HTMLSelect: HTMLElement = $state()
  let HTMLDropdown: HTMLElement = $state()

  const mapOptionsSimple = (): ILabelValue[] => {
    if (!options.length) return []

    if (typeof options[0] === 'string') {
      return options.map((str) => {
        return {
          label: str,
          value: str,
        }
      })
    }

    return options as ILabelValue[]
  }

  let isOpen: boolean = $state(false)
  let optionsSimpleMapped: ILabelValue[] = mapOptionsSimple()

  const clean = () => {
    value = ''
    isOpen = false
  }

  const calculateMaxDropdownHeight = () => {
    const top = HTMLDropdown.getBoundingClientRect().top
    const availableHeight = window.innerHeight - top - 70 //offsetBorrarTodo
    const HTMLOptions: HTMLElement = HTMLDropdown.children[0] as HTMLElement

    HTMLOptions.style.maxHeight = `${availableHeight}px`
  }

  const selectOption = (newValue: string | number) => {
    value = newValue
    isOpen = false
  }

  const closeOutside = (ev) => HTMLSelect?.contains(ev.target) || (isOpen = false)
  onMount(() => calculateMaxDropdownHeight())

  let currentLabel = $derived(optionsSimpleMapped.find((opt: ILabelValue) => opt.value === value)?.label || '')
</script>

<style lang="scss">
  @use '/src/sass/mixins.scss' as *;
  .select-simple {
    position: relative;
    width: 100%;
    z-index: 6;

    .selected {
      //transition: 0.3s ease;
      border: 1px solid var(--colorBorder);
      background-color: var(--colorSecondary);
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 10px;
      width: 100%;
      cursor: pointer;

      .selected-option {
        display: flex;
        flex-direction: column;
        text-align: left;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .placeholder {
        color: var(--colorText2);
        font-size: 14px;
        white-space: nowrap;
        text-align: left;
      }

      .selected-option,
      .placeholder {
        width: 100%;
      }

      :global(svg) {
        flex-shrink: 0;
      }
    }

    .dropdown {
      position: absolute;
      margin-top: 10px;
      width: 100%;
      border: 1px solid var(--colorBorder);
      border-radius: var(--radius);
      background-color: var(--colorSecondary);
      overflow: hidden;
      z-index: 2;
      visibility: hidden;

      &.isOpen {
        visibility: visible;
      }

      .options {
        overflow-y: auto;
        display: flex;
        flex-direction: column;

        .option {
          padding: 10px;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-shrink: 0;

          &:hover {
            background-color: var(--colorNeutral);
          }

          &.clean {
            border-top: 1px solid var(--colorBorder);
            color: var(--colorText2);
            font-size: 14px;
          }
        }

        @include notDesktop {
          max-height: 300px;
        }
      }
    }
  }
</style>

<div class="select-simple" bind:this={HTMLSelect} style="min-width: {minWidth}px" {id}>
  <button class="selected" onclick={() => (isOpen = !isOpen)}>
    {#if icon}
      <Svg name={icon} className="selected-svg" fill="var(--colorPrimary)" />
    {/if}

    {#if currentLabel}
      <div class="selected-option">
        <span class="g-bold"> {currentLabel} </span>
      </div>
    {:else}
      <span class="placeholder">{placeholder}</span>
    {/if}

    <Svg name="arrow" />
  </button>

  <div class="dropdown" class:isOpen bind:this={HTMLDropdown}>
    <div class="options" data-lenis-prevent>
      {#each optionsSimpleMapped as option}
        <button class="option" onclick={() => selectOption(option.value)}>{option.label}</button>
      {/each}
      {#if !hideDelete}
        <button class="option clean" onclick={clean}> Borrar selección </button>
      {/if}
    </div>
  </div>
</div>

<svelte:window onclick={closeOutside} onresize={calculateMaxDropdownHeight} />
