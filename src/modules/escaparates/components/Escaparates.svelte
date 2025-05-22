<script lang="ts">
  import type { IProperty } from '@/sync/interfaces/IProperty'
  import PDFPreview from '@/modules/shared/components/PDFPreview.svelte'
  import EscaparatePreview from '@/modules/escaparates/components/EscaparatePreview.svelte'
  import EscaparatePreviewOpinion from '@/modules/escaparates/components/EscaparatePreviewOpinion.svelte'
  import SliderVertical from '@/modules/shared/components/SliderVertical.svelte'
  import PropertyCard from '@/modules/properties/components/PropertyCard.svelte'
  import Button from '@/modules/shared/components/Button.svelte'

  interface Props {
    properties?: IProperty[]
  }

  let { properties = [] }: Props = $props()
  let selectedProperty: IProperty = $state()
  let horizontal: boolean = $state(false)
  let justForPreview: boolean = $state(true)
  let pdfType: 'rate' | 'property' = $state('property')
  let tagMessage: string = $state('')

  const swapPdfType = () => {
    pdfType = pdfType === 'property' ? 'rate' : 'property'
  }

  const selectProperty = (newProperty: IProperty) => {
    pdfType = 'property'
    selectedProperty = newProperty
  }

  const swapTagMessage = (type: string) => {
    tagMessage = tagMessage === type ? '' : type
  }
</script>

<style lang="scss">
  .escaparate-container {
    display: flex;
    gap: 40px;

    .flex {
      display: flex;
      gap: 10px;
    }

    .property-card-wrapper {
      transition: 0.3s ease;
      padding: 20px 20px;
      width: 100%;
      cursor: pointer;

      &:hover {
        background-color: var(--colorBrandLighter);
      }
    }
  }
</style>

<div class="escaparate-container">
  <SliderVertical sticky height="calc(100dvh - 100px)">
    {#each properties as property}
      <button class="property-card-wrapper" onclick={() => selectProperty(property)}>
        <PropertyCard {property} />
      </button>
    {/each}
  </SliderVertical>

  <div>
    <div class="flex">
      <Button type="secondary" active={tagMessage === 'reserved'} click={() => swapTagMessage('reserved')}>RESERVADO</Button>
      <Button type="secondary" active={tagMessage === 'marked'} click={() => swapTagMessage('marked')}>SEÑALIZADO</Button>
      <Button type="secondary" active={tagMessage === 'sold'} click={() => swapTagMessage('sold')}>VENDIDO</Button>
    </div>

    {#if pdfType === 'property'}
      <PDFPreview pdfName={`flyer-ref${selectedProperty?.ref}`} onePage bind:horizontal bind:justForPreview>
        <EscaparatePreview property={selectedProperty} {horizontal} {justForPreview} {tagMessage} />
      </PDFPreview>
    {:else}
      <PDFPreview pdfName={`google-review`} onePage bind:horizontal>
        <EscaparatePreviewOpinion {horizontal} />
      </PDFPreview>
    {/if}
  </div>

  <div class="g-new-btn-container">
    <Button type="circle" click={swapPdfType} icon={pdfType === 'property' ? 'review' : 'apartment'}></Button>
  </div>
</div>
