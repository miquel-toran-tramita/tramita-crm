<script lang="ts">
  import Button from '@/modules/shared/components/Button.svelte'
  import { downloadBlob, generatePDFbyHTML } from '@/modules/shared/scripts/pdf'
  import { onMount, tick } from 'svelte'
  import { blobToBase64, debounce } from '@/modules/shared/scripts/generic'
  import { api } from '@/sync/scripts/api'

  interface Props {
    header?: any
    children?: import('svelte').Snippet
    pdfName: string
    onePage?: boolean
    horizontal?: boolean
    justForPreview?: boolean
    folderId?: string
  }

  let { children, header, pdfName, horizontal = $bindable(), onePage = false, justForPreview = $bindable(true), folderId }: Props = $props()

  let HTMLPDFPreview: HTMLElement
  let HTMLSlot: HTMLElement
  let HTMLHeaderSlot: HTMLElement
  let loading: boolean = $state(false)
  let loadingDrive: boolean = $state(false)
  let scale: number = $state(1)
  let pageContents: HTMLElement[][] = $state([])

  const padding: number = 50
  const pageHeight: number = $derived(horizontal ? 794 - padding : 1123 - padding)

  const resolveCssVariables = (value: string, computed: CSSStyleDeclaration): string => {
    return value.replace(/var\((--[^)]+)\)/g, (_, varName: string) => {
      return computed.getPropertyValue(varName).trim() || getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || ''
    })
  }

  const applyStylesInline = (original: Element, clone: Element) => {
    const computed = getComputedStyle(original)
    const cloneStyle = (clone as HTMLElement).style

    for (const prop of computed) {
      let value = computed.getPropertyValue(prop).trim()
      if (value.includes('var(')) {
        value = resolveCssVariables(value, computed)
      }
      cloneStyle.setProperty(prop, value)
    }
  }

  const applyStylesRecursively = (original: Element, clone: Element) => {
    applyStylesInline(original, clone)

    const originalChildren = original.children
    const cloneChildren = clone.children

    for (let i = 0; i < originalChildren.length; i++) {
      applyStylesRecursively(originalChildren[i], cloneChildren[i])
    }
  }

  const exportDivWithInlineStyles = (): string => {
    const clone = HTMLPDFPreview.cloneNode(true) as HTMLElement
    applyStylesRecursively(HTMLPDFPreview, clone)

    const wrapper = document.createElement('div')
    wrapper.appendChild(clone)

    return wrapper.innerHTML
  }

  const toggleBoldSelection = () => {
    let selection = window.getSelection()
    if (!selection.rangeCount) return

    let range = selection.getRangeAt(0)
    let parentNode: any = range.commonAncestorContainer.parentNode

    // Si el texto seleccionado ya está en <b> o <strong>, lo quitamos
    if (parentNode.tagName === 'B' || parentNode.tagName === 'STRONG') {
      let fragment = document.createDocumentFragment()
      while (parentNode.firstChild) {
        fragment.appendChild(parentNode.firstChild)
      }
      parentNode.replaceWith(fragment)
    } else {
      // Si no es negrita, lo envolvemos en <b>
      let bold = document.createElement('b')
      bold.appendChild(range.extractContents())
      range.insertNode(bold)
    }
  }

  const toggleColorSelection = () => {
    let selection = window.getSelection()
    if (!selection.rangeCount) return

    let range = selection.getRangeAt(0)
    let parentNode: any = range.commonAncestorContainer.parentNode

    // Si el texto seleccionado ya está en un <span class="g-color">, lo quitamos
    if (parentNode.classList?.contains('color')) {
      let fragment = document.createDocumentFragment()
      while (parentNode.firstChild) {
        fragment.appendChild(parentNode.firstChild)
      }
      parentNode.replaceWith(fragment)
    } else {
      // Si no tiene color, lo envolvemos en <span class="g-color">
      let span = document.createElement('span')
      span.classList.add('g-color')
      span.appendChild(range.extractContents())
      range.insertNode(span)
    }
  }

  const toggleUnderlineSelection = () => {
    let selection = window.getSelection()
    if (!selection.rangeCount) return

    let range = selection.getRangeAt(0)
    let parentNode: any = range.commonAncestorContainer.parentNode

    if (parentNode.tagName === 'U') {
      let fragment = document.createDocumentFragment()
      while (parentNode.firstChild) {
        fragment.appendChild(parentNode.firstChild)
      }
      parentNode.replaceWith(fragment)
    } else {
      let bold = document.createElement('u')
      bold.appendChild(range.extractContents())
      range.insertNode(bold)
    }
  }

  const generatePDF = async () => {
    loading = true
    justForPreview = false
    await tick()

    const html = exportDivWithInlineStyles()

    try {
      const blob = await generatePDFbyHTML(html, horizontal)

      downloadBlob(blob, pdfName)
    } catch (err) {
      alert('Ha ocurrido un error.')
      loading = false
    }

    loading = false
    justForPreview = true
  }

  const saveToGoogleDrive = async () => {
    loadingDrive = true
    justForPreview = false
    await tick()

    const html = exportDivWithInlineStyles()
    const blob = await generatePDFbyHTML(html, horizontal)
    const base64Content = await blobToBase64(blob)

    await api.post('/api/private/google/drive', {
      folderId,
      fileName: pdfName,
      fileContent: base64Content,
    })

    loadingDrive = false
    justForPreview = true
  }

  const zoomOut = () => (scale = scale - 0.1)
  const zoomIn = () => (scale = scale + 0.1)
  const rotate = () => {
    horizontal = !horizontal

    setTimeout(() => recalculatePages(), 500) //esperar animación
  }

  const recalculatePages = async (firstLoad: boolean = false) => {
    const headers = HTMLPDFPreview.querySelectorAll('.header-container')
    headers.forEach((header) => header.remove())

    const pageNodes = HTMLPDFPreview.querySelectorAll('.pdf-page > *')
    const childs: Element[] = firstLoad ? [...HTMLSlot.children] : [...pageNodes]
    const newPageContents: HTMLElement[][] = []

    const headerHeight: number = HTMLHeaderSlot?.offsetHeight || 0

    let totalHeight: number = headerHeight
    let currentNodes: HTMLElement[] = []

    childs.forEach((el: HTMLElement) => {
      if (totalHeight + el.offsetHeight > pageHeight) {
        // Añadimos todos los nodos acumulados
        newPageContents.push([...currentNodes])

        // Reset de la lista de nodos temporal y height
        currentNodes = []
        totalHeight = headerHeight
      }

      currentNodes.push(el)
      totalHeight += el.offsetHeight
    })

    if (currentNodes.length > 0) {
      newPageContents.push([...currentNodes])
    }

    pageContents = []

    await tick()

    pageContents = newPageContents
  }

  const renderNodes = (nodes: HTMLElement[] = []) => {
    let html = ''

    for (let node of nodes) {
      html += node.outerHTML
    }

    return html
  }

  let debounceRecalculatePages = debounce(recalculatePages, 3000)

  onMount(() => {
    recalculatePages(true)

    const observer = new MutationObserver(() => {
      recalculatePages(true)
    })

    if (HTMLSlot) {
      observer.observe(HTMLSlot, {
        childList: true,
        subtree: true,
        characterData: true,
      })
    }
  })
</script>

<style lang="scss">
  $width: 794px;
  $padding: 50px; // restarlo a const pageHeight

  .pdf-buttons {
    position: sticky;
    top: 0px;
    z-index: 5;
    background-color: var(--colorNeutral);
    display: flex;
    gap: 10px;
    width: $width;
    padding: 10px 0;

    .generate-btn-container {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }

  [contenteditable] {
    outline: 0px solid transparent;
  }

  .pdf-container {
    transition: 0.3s ease;
    transform-origin: top left;
    padding-bottom: 20px;
    overflow: hidden;

    --colorText: #222222;

    .pdf-preview {
      transition: 0.3s ease;
      width: $width;
      min-height: 1123px;

      &.horizontal {
        width: 1123px;
        min-height: $width;

        .pdf-page {
          height: $width;
        }
      }

      &.justForPreview {
        display: flex;
        flex-direction: column;
        gap: 50px;

        .pdf-page {
          border: 1px solid var(--colorBorder);

          &:hover {
            border: 1px solid var(--colorPrimary);
          }
        }
      }

      .pdf-page {
        height: 1123px;
        padding: $padding;
        background-color: white;
        border: 1px solid transparent;
      }
    }
  }

  .height-checker {
    position: absolute;
    visibility: hidden;
    width: $width;
    padding: $padding;
    top: 0;
    z-index: -1;
  }
</style>

<div class="pdf-preview-component">
  <div class="pdf-buttons">
    <Button type="secondary" icon="zoomOut" click={zoomOut}></Button>
    <Button type="secondary" icon="zoomIn" click={zoomIn}></Button>
    <Button icon="sync" type="secondary" click={rotate}></Button>
    <Button icon="bold" type="secondary" click={toggleBoldSelection}></Button>
    <Button icon="underline" type="secondary" click={toggleUnderlineSelection}></Button>
    <Button icon="color" type="secondary" click={toggleColorSelection}></Button>

    {#if folderId}
      <div class="generate-btn-container">
        <Button icon="googleDrive" click={saveToGoogleDrive} loading={loadingDrive}>{loadingDrive ? 'Guardando...' : 'Guardar PDF'}</Button>
      </div>
    {/if}
    <div class="generate-btn-container">
      <Button icon="blog" click={generatePDF} {loading}>{loading ? 'Generando...' : 'Generar PDF'}</Button>
    </div>
  </div>

  <div class="pdf-container" style={`transform: scale(${scale})`}>
    <div
      class="pdf-preview"
      class:justForPreview
      class:horizontal
      bind:this={HTMLPDFPreview}
      onkeyup={debounceRecalculatePages}
      onpaste={debounceRecalculatePages}
      contenteditable
      role="button"
      tabindex="0"
    >
      {#if onePage}
        <div class="pdf-page">
          {@render children?.()}
        </div>
      {:else}
        {#each pageContents as content}
          <div class="pdf-page">
            <div class="header-container">
              {@render header?.()}
            </div>

            {@html renderNodes(content)}
          </div>
        {/each}
      {/if}
    </div>
  </div>

  <div class="height-checker pdf-preview" bind:this={HTMLHeaderSlot}>
    {@render header?.()}
  </div>

  <div class="height-checker pdf-preview" bind:this={HTMLSlot}>
    {@render children?.()}
  </div>
</div>
