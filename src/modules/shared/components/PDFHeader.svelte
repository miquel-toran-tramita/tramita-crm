<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'

  interface Props {
    title?: string
    subtitle?: string
  }

  let { title, subtitle }: Props = $props()
</script>

<style lang="scss">
  .pdf-header {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;

    .title-container {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 20px;
      }

      .subtitle {
        color: var(--colorText2);
        font-size: 14px;
      }
    }

    .logo-container {
      display: flex;
      align-items: end;
      gap: 5px;

      .TRAMITA {
        font-size: 20px;
        letter-spacing: 2px;
      }
    }
  }
</style>

<div class="pdf-header">
  <div class="title-container">
    <h2 class="title">
      {title}
    </h2>

    {#if subtitle}
      <h3 class="subtitle">{subtitle}</h3>
    {/if}
  </div>

  <div class="logo-container">
    <Svg name="logo" width="40" height="40"></Svg>
    <div class="TRAMITA">TRAMITA</div>
  </div>
</div>
