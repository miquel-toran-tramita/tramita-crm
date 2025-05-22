<script lang="ts">
  import PropertySectionProperty from '@/modules/properties/components/PropertySectionProperty.svelte'
  import PropertySectionDocuments from '@/modules/properties/components/PropertySectionDocuments.svelte'
  import PropertySectionFollowUp from '@/modules/properties/components/PropertySectionFollowUp.svelte'
  import PropertySectionContacts from '@/modules/properties/components/PropertySectionContacts.svelte'
  import SectionsViewer from '@/modules/shared/components/SectionsViewer.svelte'
  import type { ISectionViewer } from '@/modules/shared/interfaces/ISectionViewer.ts'
  import type { IPropertyJoin } from '@/modules/properties/interfaces/IPropertyJoin'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'

  interface Props {
    propertyJoin: IPropertyJoin
    contacts: IContact[]
  }

  let { propertyJoin, contacts }: Props = $props()

  let activeSection: number = $state(0)
  const sections: ISectionViewer[] = [
    {
      title: 'Seguimiento',
      icon: 'eye',
    },
    {
      title: 'Propiedad',
      icon: 'home',
    },
    {
      title: 'Propietario',
      icon: 'sell',
    },
    {
      title: 'Compradores',
      icon: 'groups',
    },
    {
      title: 'Documentos',
      icon: 'blog',
    },
  ]

  const property = $state(propertyJoin[0].Property)
</script>

<SectionsViewer {sections} bind:activeSection>
  {#if sections[activeSection].title === sections[0].title}
    <PropertySectionFollowUp ref={property?.ref} titulo={property?.titulo} />
  {/if}

  {#if sections[activeSection].title === sections[1].title}
    <PropertySectionProperty {property} />
  {/if}

  {#if sections[activeSection].title === sections[2].title}
    <PropertySectionContacts propertyId={property?.id} {contacts} owner />
  {/if}

  {#if sections[activeSection].title === sections[3].title}
    <PropertySectionContacts propertyId={property?.id} {contacts} buyer />
  {/if}

  {#if sections[activeSection].title === sections[4].title}
    <PropertySectionDocuments />
  {/if}
</SectionsViewer>
