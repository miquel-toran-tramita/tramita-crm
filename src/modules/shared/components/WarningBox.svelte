<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'
  interface Props {
    type?: 'warning' | 'error' | 'info' | 'help' | 'tick';
    children?: import('svelte').Snippet;
  }

  let { type = 'info', children }: Props = $props();
</script>

<style lang="scss">
  .warning-box {
    border-radius: var(--radius);
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.1);

    &.warning {
      background-color: rgba(255, 255, 0, 1);
    }

    &.error {
      background-color: rgba(255, 0, 0, 1);
    }

    &.tick {
      background-color: rgba(0, 255, 0, 1);
    }

    &.info,
    &.help {
      background-color: rgba(68, 161, 156, 1);
    }

    p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.7);
    }
  }
</style>

<div class="warning-box {type}">
  <Svg name={type} width="40" height="40" fill="rgba(0, 0, 0, 0.5)" />
  <p>
    {@render children?.()}
  </p>
</div>
