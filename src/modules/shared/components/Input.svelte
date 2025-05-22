<script lang="ts">
  import { formatPrice, toNumber } from '@/modules/shared/scripts/generic'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { svgList } from '@/modules/shared/constants/svgStore'
  import { onMount } from 'svelte'

  interface Props {
    id?: string
    autocomplete?: AutoFill
    label?: string
    placeholder?: string
    maxlength?: number
    error?: boolean
    prefix?: string
    sufix?: string
    type?: 'textarea' | 'text' | 'number' | 'currency' | 'email' | 'password' | 'tel' | 'datetime-local' | 'date' | 'file'
    step?: string
    min?: string | undefined
    max?: string | undefined
    accept?: string

    errorMessage?: string
    validateEmail?: boolean
    value?: any
    nValue?: number
    dateValue?: Date
    onchange?: any
    onStopTyping?: Function
  }

  let {
    id = '1',
    autocomplete = '',
    label = '',
    placeholder = '',
    maxlength = 300,
    error = false,
    prefix = '',
    sufix = '',
    type = 'text',
    step = '1',
    min = undefined,
    max = undefined,

    errorMessage = type === 'email' ? 'Dirección de email no válida' : 'Completa este campo',
    validateEmail = $bindable(),
    value = $bindable(),
    nValue = $bindable(),
    dateValue = $bindable(),
    accept = '',
    onchange = () => {},
    onStopTyping = () => {},
  }: Props = $props()

  let focused: boolean = $state(false)
  let isError = $derived(error)

  if (type === 'password') sufix = 'eyeClosed'

  const typeAction = (node: HTMLInputElement) => {
    const validTypes = new Set(['email', 'number', 'tel', 'password', 'date', 'datetime-local', 'file'])

    node.type = validTypes.has(type) ? type : 'text'
  }

  const inputValidate = (event) => {
    if (type === 'tel') {
      const firstChar = event.target.value[0] === '+' ? '+' : ''
      value = firstChar + event.target.value.replace(/[^0-9\s]/g, '')
    }

    if (type === 'currency') {
      value = formatPrice(event.target.value, true) || '0'
    }

    if (type === 'number') {
      if (max && value > max) event.target.value = max
      if (min && value < min) event.target.value = min

      value = parseFloat(event.target.value.toString().slice(0, maxlength))
    }

    nValue = typeof value === 'string' ? toNumber(value) : value

    dateValue = type === 'date' ? new Date(value) : new Date()
  }

  const sufixClick = () => {
    if (sufix === 'eye' || sufix === 'eyeClosed') {
      type = type === 'password' ? 'text' : 'password'
      sufix = type === 'password' ? 'eyeClosed' : 'eye'
    }
  }

  let filled = $derived(value || value === 0 || type === 'date' || type === 'file' || type === 'datetime-local')
  let isTextarea = $derived(type === 'textarea')
  let isFile = $derived(type === 'file')

  $effect(() => {
    if (type === 'email') {
      const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      validateEmail = emailRegEx.test(value.toString())
    }
  })

  let timeout = null
  $effect(() => {
    if (!value) return

    clearTimeout(timeout)
    timeout = setTimeout(() => onStopTyping(value), 500) // 500 ms sin escribir = dejó de escribir
  })

  let sufixPaddingRight: number = $state(10)
  onMount(() => {
    if (sufix.length) sufixPaddingRight = 15 + 8 * sufix.length
  })
</script>

<style lang="scss">
  $errorColor: rgb(138, 18, 18);
  .input-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
    padding: 15px 0;

    &:after {
      transition: width 0.5s ease;
      content: '';
      position: absolute;
      border-bottom: 1px solid var(--colorPrimary);
      width: 0;
      z-index: 1;
    }

    &.focused {
      &:after {
        width: 100%;
      }
    }

    &.withLabel {
      padding-top: 20px;
    }

    &:not(.withLabel) {
      padding: 0px !important;
      input,
      textarea {
        border: 1px solid var(--colorBorder);
        border-radius: var(--radius);
        padding: 5px;

        &:focus {
          border: 1px solid var(--colorPrimary);
        }
      }

      &:after {
        display: none;
      }
    }

    &.withPrefix {
      label {
        padding-left: 30px;
        &.filled {
          padding-left: 0;
        }
      }
    }

    &.isTextarea {
      label {
        top: 22px;
        bottom: unset;

        &.filled {
          transform: translateY(-20px);
        }
      }
    }

    &.isFile {
      &:after,
      input {
        border-bottom: unset;
      }
    }

    label {
      position: absolute;
      bottom: 18px;
      left: 2px;
      transition: 0.3s ease;
      transform-origin: left;
      color: var(--colorText2);

      &.filled {
        transition: 0.3s ease;
        transform: translateY(-25px);
        color: var(--colorPrimary);
        font-size: 12px;
      }
    }

    input {
      position: relative;
      padding: 2px;
      border: 0;
      border-bottom: 1px solid var(--colorBorder);
      background-color: transparent;
      font-size: 16px;
      width: 100%;
      outline: none;
      z-index: 1;
      color: var(--colorText);

      &:-webkit-autofill {
        padding-left: 5px !important;
      }

      &.isError {
        border-bottom: 1px solid $errorColor;
      }
    }

    textarea {
      padding: 2px;
      border: 0;
      border-bottom: 1px solid var(--colorBorder);
      background-color: transparent;
      color: var(--colorText);
      resize: vertical;
      width: 100%;
      outline: none;
      font-size: 16px;
      z-index: 1;
    }

    position: relative;

    :global(svg) {
      width: 20px !important;
      height: 20px !important;
    }

    .prefix,
    .sufix {
      top: 0;
      display: flex;
      align-items: center;
      position: absolute;
      height: 100%;
      min-width: fit-content;
    }

    .prefix {
      left: 5px;
      ~ input {
        padding-left: 30px;
      }
    }

    .sufix {
      cursor: pointer;
      right: 0px;
      z-index: 2;
      font-size: 14px;
      padding-right: 10px;
      color: var(--colorText2);

      ~ input {
        padding-right: 30px;
      }
    }

    .error {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 5px;
      color: $errorColor;
      font-size: 12px;
      bottom: -8px;
      opacity: 0.8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      :global(svg) {
        fill: $errorColor;
      }
    }
  }
</style>

<div class="input-wrapper" class:withLabel={label} class:withPrefix={prefix} class:focused class:isTextarea class:isFile>
  {#if label}
    <label class:filled for="input-{id}">{label}</label>
  {/if}

  {#if type != 'textarea'}
    {#if prefix}
      <div class="prefix">
        {#if svgList.includes(prefix)}
          <Svg name={prefix} fill="var(--colorPrimary)" />
        {:else}
          {prefix}
        {/if}
      </div>
    {/if}

    {#if sufix}
      <button class="sufix" onclick={sufixClick}>
        {#if svgList.includes(sufix)}
          <Svg name={sufix} fill="var(--colorPrimary)" />
        {:else}
          {sufix}
        {/if}
      </button>
    {/if}

    {#if type === 'number'}
      <input
        type="number"
        {step}
        id="input-{id}"
        {min}
        {max}
        name="input-{id}"
        {autocomplete}
        {placeholder}
        class:isError
        use:typeAction
        oninput={inputValidate}
        onfocus={() => (focused = true)}
        onblur={() => (focused = false)}
        style={`padding-right: ${sufixPaddingRight}px`}
        bind:value
        {maxlength}
      />
    {:else if type === 'password'}
      <input
        type="password"
        id="input-{id}"
        name="input-{id}"
        {autocomplete}
        {placeholder}
        class:isError
        use:typeAction
        oninput={inputValidate}
        onfocus={() => (focused = true)}
        onblur={() => (focused = false)}
        style={`padding-right: ${sufixPaddingRight}px`}
        bind:value
        {maxlength}
      />
    {:else if type === 'file'}
      <input
        type="file"
        id="input-{id}"
        name="input-{id}"
        class:isError
        use:typeAction
        {onchange}
        onfocus={() => (focused = true)}
        onblur={() => (focused = false)}
        bind:value
        {maxlength}
      />
    {:else}
      <input
        {type}
        id="input-{id}"
        name="input-{id}"
        {autocomplete}
        {placeholder}
        class:isError
        use:typeAction
        oninput={inputValidate}
        {onchange}
        onfocus={() => (focused = true)}
        onblur={() => (focused = false)}
        style={`padding-right: ${sufixPaddingRight}px`}
        bind:value
        {maxlength}
      />
    {/if}
  {:else}
    <textarea id="textarea-{id}" name="textarea-{id}" {placeholder} {maxlength} bind:value cols="30" rows="3"></textarea>
  {/if}

  {#if isError}
    <span class="error">
      <Svg name="error" width="18" />
      {errorMessage}
    </span>
  {/if}
</div>
