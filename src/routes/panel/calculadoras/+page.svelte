<script lang="ts">
  import Card from '@/modules/shared/components/Card.svelte'
  import type { ICard } from '@/modules/shared/interfaces/ICard.ts'

  const calculators: ICard[] = [
    {
      title: 'Simulador de hipotecas',
      href: '/panel/calculadoras/simulador-hipotecas',
      icon: 'bank',
    },
    /*{
      title: 'Análisis de rentabilidad',
      href: '/calculadoras/analisis-rentabilidad',
      icon: 'stats',
    }, */
    {
      title: 'ACM',
      href: '/panel/calculadoras/acm',
      icon: 'graphic',
    },
  ]
</script>

<div class="g-cards-container">
  {#each calculators as card}
    <Card {card} />
  {/each}
</div>
