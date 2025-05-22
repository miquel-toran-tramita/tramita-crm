<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'

  interface Props {
    multiple?: boolean
    files?: FileList
  }

  let { multiple = false, files = $bindable() }: Props = $props()

  let isDragging: boolean = $state(false)

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    isDragging = true
  }

  const handleDragLeave = () => {
    isDragging = false
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    isDragging = false

    const droppedFiles = event.dataTransfer?.files
    if (droppedFiles && droppedFiles.length > 0) {
      files = droppedFiles
    }
  }

  const handleFileInput = (event: Event) => {
    const inputFiles = (event.target as HTMLInputElement).files

    if (inputFiles && inputFiles.length > 0) {
      files = inputFiles
    }
  }

  const formatSize = (bytes: number): string => {
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  let fileCopy: string = $derived(files ? files[0].name : '')
  let copy: string = $derived(fileCopy ? fileCopy : isDragging ? '¡Déjalo caer!' : 'Haz click o suelta tu documento aquí')
  let size: string = $derived(files ? formatSize(files[0].size) : '')
</script>

<style lang="scss">
  .upload-document {
    position: relative;
    transition: 0.3s ease;
    border: 2px dashed var(--colorBorder);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    border-radius: var(--radius);

    .copy {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &.uploaded {
        p {
          font-weight: bold;
          color: var(--colorPrimary);
        }
      }

      p {
        color: var(--colorText2);
      }

      .size {
        font-size: 12px;
      }
    }

    input {
      cursor: pointer;
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    .remove {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 5;
    }

    &:hover {
      border-color: var(--colorPrimary);

      :global(svg) {
        fill: var(--colorPrimary);
      }

      p {
        color: var(--colorPrimary);
      }
    }
  }
</style>

<div
  class="upload-document"
  class:isDragging
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  role="button"
  tabindex="0"
>
  {#if fileCopy}
    <button class="remove" onclick={() => (files = undefined)}>
      <Svg name="trash" fill="var(--colorBorder)"></Svg>
    </button>
  {/if}

  <input type="file" {multiple} onchange={handleFileInput} />

  <div class="copy" class:uploaded={files}>
    <Svg name={files ? 'cloudDone' : 'cloud'} fill="var(--colorText2)"></Svg>
    <p>{copy}</p>
    <span class="size">{size}</span>
  </div>
</div>
