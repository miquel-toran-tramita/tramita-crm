<script lang="ts">
  import SectionsViewer from '@/modules/shared/components/SectionsViewer.svelte'
  import type { ISectionViewer } from '@/modules/shared/interfaces/ISectionViewer'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'
  import PersonalData from '@/modules/contacts/components/PersonalData.svelte'
  import ProcessFollowUp from './ProcessFollowUp.svelte'

  interface Props {
    isAccountActivated: boolean
    contact: IContact
  }

  let { contact, isAccountActivated }: Props = $props()

  let activeSection: number = $state(0)
  const sections: ISectionViewer[] = [
    {
      title: 'Seguimiento',
      icon: 'eye',
    },
    {
      title: 'Información',
      icon: 'person',
    },
    {
      title: 'Proceso',
      icon: 'checklist',
    },
    {
      title: 'Documentos',
      icon: 'blog',
    },
  ]
</script>

<SectionsViewer {sections} bind:activeSection>
  {#if activeSection === 1}
    <PersonalData {contact} {isAccountActivated} />
  {/if}

  {#if activeSection === 2}
    <ProcessFollowUp {contact} />
  {/if}
</SectionsViewer>
