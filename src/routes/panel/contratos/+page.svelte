<script lang="ts">
  import Button from '@/modules/shared/components/Button.svelte'

  import Card from '@/modules/shared/components/Card.svelte'
  import type { ICard } from '@/modules/shared/interfaces/ICard.ts'

  const contratos: ICard[] = [
    {
      title: 'Recibe comprador',
      href: '/panel/contratos/recibe-comprador',
      icon: 'sell',
    },
  ]
</script>

<style lang="scss">
  .buttons {
    display: flex;
    gap: 10px;
    padding-bottom: 20px;
    justify-content: flex-end;
  }

  h1 {
    font-size: 30px;
  }
</style>

<div class="buttons">
  <a href="/panel/contratos/pactos">
    <Button icon="deal">Creador de pactos</Button>
  </a>
</div>

<div class="g-cards-container">
  {#each contratos as card}
    <Card {card}></Card>
  {/each}
</div>

<hr />

<h1>Contratos recientes</h1>
