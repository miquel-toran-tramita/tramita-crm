<script lang="ts">
  import type { ILead } from '@/modules/leads/interfaces/ILead'
  import CardLead from '@/modules/leads/components/CardLead.svelte'

  interface PageData {
    leads: ILead[]
  }

  let { data } = $props<{ data: PageData }>()
</script>

<style lang="scss">
  @use '@/sass/mixins.scss' as *;

  .leads {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include notDesktop {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }
</style>

<div class="leads">
  {#each data?.leads as lead}
    <CardLead {lead} />
  {/each}
</div>
