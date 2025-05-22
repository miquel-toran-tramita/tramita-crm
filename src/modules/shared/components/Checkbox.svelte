<script lang="ts">
  interface Props {
    //https://yoksel.github.io/url-encoder/ <-- Convert SVG to DataURL
    value?: boolean
    toggle?: boolean
    error?: boolean
    disabled?: boolean
    label?: string
    input?: any
  }

  let { value = $bindable(false), toggle = false, error = false, disabled = false, label = '', input = () => {} }: Props = $props()

  const handleToggle = () => {
    if (disabled) return
    value = !value
  }
</script>

<style lang="scss">
  $errorColor: rgb(138, 18, 18);
  $size: 20px;

  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 10px;

    label.error {
      color: $errorColor;
    }

    .checkbox-custom {
      cursor: pointer;
      position: relative;
      appearance: none;
      background: transparent;
      margin: 0;
      width: 25px;
      height: 25px;
      border-radius: 8px;
      box-shadow: var(--shadowInset);
      border: 1px solid var(--colorBorder);
      flex-shrink: 0;

      &.error {
        border: 1px solid $errorColor;
      }

      &:checked {
        background-color: var(--colorPrimary) !important;
        animation: beat 0.3s ease;
        box-shadow: var(--shadow);
        border: 1px solid var(--colorPrimary);

        &:after {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          width: 15px;
          height: 15px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 26 26'%3E%3Cpath d='m22.567 4.73l-1.795-1.219a1.09 1.09 0 0 0-1.507.287l-8.787 12.959l-4.039-4.039a1.09 1.09 0 0 0-1.533 0l-1.533 1.536a1.084 1.084 0 0 0 0 1.534L9.582 22c.349.347.895.615 1.387.615s.988-.31 1.307-.774l10.58-15.606a1.085 1.085 0 0 0-.289-1.505z'/%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
        }
      }

      @keyframes beat {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(0.9);
        }
      }
    }
  }
  .toggle {
    position: relative;
    height: calc($size + 10px);
    width: calc($size * 2 + 10px);

    transition: 0.3s ease;
    border-radius: $size;
    box-shadow: inset 0 0 0 1px var(--colorPrimary);

    &.on {
      background-color: var(--colorPrimary);
      transition: 0.3s ease;
    }

    input {
      border-radius: $size;

      height: calc($size + 10px);
      width: calc($size * 2 + 10px);
    }

    .slider {
      width: $size;
      height: $size;

      position: absolute;
      top: 0;
      bottom: 0;
      left: 5px;
      margin: auto;

      background-color: var(--colorPrimary);
      border-radius: $size;
      transition: 0.3s ease;

      &.on {
        background-color: white;
        transform: translateX($size);
        transition: 0.3s ease;
      }
    }
  }
</style>

{#if toggle}
  <button class="toggle" onclick={handleToggle} class:on={value} aria-label="toggle">
    <input type="checkbox" checked={value} {disabled} oninput={input} />
    <div class="slider" class:on={value}></div>
  </button>
{:else}
  <div class="checkbox-container">
    <input
      type="checkbox"
      class="checkbox-custom"
      class:error
      checked={value}
      oninput={input}
      onclick={handleToggle}
      aria-label="checkbox"
      {disabled}
    />

    {#if label}
      <label class:error for="">{@html label}</label>
    {/if}
  </div>
{/if}

<!--Radio?-->
