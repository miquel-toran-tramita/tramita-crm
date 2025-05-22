<script lang="ts">
  import { svgStore } from '@/modules/shared/constants/svgStore.ts'
  import type { SvgStore } from '@/modules/shared/interfaces/ISvgStore'

  interface Props {
    name?: keyof SvgStore | ''
    fill?: string
    width?: string
    height?: string
    className?: string
  }

  let { name = '', fill = 'var(--colorText)', width = '25', height = '25', className = $bindable('') }: Props = $props()

  className = className ? `class="${className}"` : ''

  let SVG = $derived(
    svgStore[name]
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="${fill}" width="${width}px" height="${height}px" ${className} ${
          svgStore[name].split('<svg')[1]
        }`
      : ''
  )
</script>

{#if SVG}
  {@html SVG}
{/if}
