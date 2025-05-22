<script lang="ts">
  import Checkbox from '@/modules/shared/components/Checkbox.svelte'
  import { api } from '@/sync/scripts/api'
  import { SELLER_STEPS } from '@/sync/constants/progressSteps'

  let { contact = $bindable() } = $props()

  const updateStep = async (step) => {
    const i = contact.process.findIndex((x) => x.id === step.id)

    contact.process[i].done = !contact.process[i].done

    await api.put('/api/private/contacts', { id: contact.id, process: contact.process })
  }
</script>

<style lang="scss">
  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    h3 {
      font-weight: bold;
      padding-top: 30px;
    }

    :global(label) {
      font-size: 14px;
    }
  }
</style>

<div class="steps-list">
  {#if contact.process}
    {#each SELLER_STEPS as category}
      <h3>
        {category.title}
      </h3>

      {#each category.process as step}
        <Checkbox label={step.title} input={() => updateStep(step)} value={contact.process.find((x) => x.id === step.id).done} />
      {/each}
    {/each}
  {/if}
</div>
