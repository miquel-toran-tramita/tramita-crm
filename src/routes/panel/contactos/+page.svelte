<script lang="ts">
  import { contacts } from '@/store'
  import CardContact from '@/modules/contacts/components/CardContact.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
</script>

<div class="g-grid">
  {#each $contacts as contact}
    <CardContact {contact} />
  {/each}
</div>

<a href="/contactos/nuevo">
  <div class="g-new-btn-container">
    <Button type="circle" icon="addPerson" />
  </div>
</a>
