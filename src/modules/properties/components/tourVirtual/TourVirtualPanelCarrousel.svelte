<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'
  import SliderHorizontal from '@/modules/shared/components/SliderHorizontal.svelte'

  import { upload } from '@vercel/blob/client'
  import { CLICK_MODES } from '@/modules/properties/constants/tourVirtual'
  import { TourVirtual } from '@/modules/properties/scripts/TourVirtual'
  import type { ClickModeType, ITourScene } from '@/sync/interfaces/ITourScene'

  import imageCompression from 'browser-image-compression'
  import { generateId } from 'lucia'
  import { api } from '@/sync/scripts/api'
  import { base64ToFile } from '@/modules/properties/scripts/tourVirtualHelpers'

  interface Props {
    clickMode?: ClickModeType
    currentSceneI?: number
    tour: TourVirtual
    tourScenes: ITourScene[]
    newDestiny?: string
    ref?: string
  }

  let {
    clickMode = $bindable(),
    newDestiny = $bindable(),
    currentSceneI = $bindable(),
    tourScenes = $bindable([]),
    tour,
    ref,
  }: Props = $props()

  let loadingImages: boolean = $state(false)
  let nFiles: number = $state(0)
  let nUploads: number = $state(0)
  let activedByBtn: boolean = $state(false)

  const handleCarrouselClick = (i: number) => {
    if (clickMode != CLICK_MODES.DESTINY) {
      currentSceneI = i
      tour.updateRoom(tourScenes[currentSceneI])

      return
    }

    newDestiny = tourScenes[i].id
    clickMode = CLICK_MODES.ADDER
  }

  const handleUploadImages = async (ev: Event) => {
    if (window.location.pathname.includes('preview')) return //Extra security

    const target = ev.target as HTMLInputElement
    const files = target.files

    loadingImages = true

    try {
      for (let file of files) {
        nFiles = files.length
        const id: string = generateId(5)
        const newScene: ITourScene = {
          id,
          image: '',
          cover: '',
          text: '',
          bridges: [],
        }

        const options = {
          //maxSizeMB: 1,
          //maxWidthOrHeight: 4000,
          useWebWorker: true,
          alwaysKeepResolution: true,
          fileType: 'image/webp',
        }

        const imgCompressed: Blob = await imageCompression(file, options)

        const responseImage = await upload(`properties/${ref}/tour360/${id}`, imgCompressed, {
          access: 'public',
          handleUploadUrl: '/api/private/tour360/uploadImages',
          contentType: 'image/webp',
          clientPayload: JSON.stringify({ ref, sceneId: id }),
        })

        newScene.image = responseImage.url

        const coverBlob = base64ToFile(await tour.updateRoom(newScene, true), 'cover.webp')
        const cover = await imageCompression(coverBlob, options)

        const responseCover = await upload(`properties/${ref}/tour360/${id}-cover`, cover, {
          access: 'public',
          handleUploadUrl: '/api/private/tour360/uploadImages',
          contentType: 'image/webp',
          clientPayload: JSON.stringify({ ref, sceneId: id }),
        })

        newScene.cover = responseCover.url

        tourScenes.push(newScene)
        nUploads = nUploads + 1
      }

      await api.put('/api/private/properties', { ref, tourScenes })

      loadingImages = false
    } catch (error) {
      loadingImages = false
      console.error(error)
    }
  }

  let uploadingCopy = $derived(`(${nUploads}/${nFiles}) Subiendo...`)
</script>

<style lang="scss">
  .type-carrousel-img {
    transform-origin: bottom center;
    top: unset;
    bottom: -131px;
    left: 20px;
    right: 20px;
    z-index: 10;
    overflow-x: auto;

    &:hover {
      bottom: -120px;
    }

    &.active {
      bottom: 20px;

      .toggle-hide {
        :global(svg) {
          transform: rotate(0deg);
        }
      }
    }

    .toggle-hide {
      padding: 10px;
      padding-bottom: 20px;
      width: 100%;
      z-index: 2;
      transform: translateY(30px);

      :global(svg) {
        transition: 0.3s ease;
        transform-origin: center;
        transform: rotate(180deg);
      }
    }

    .item-wrapper {
      padding: 20px;
      height: 150px;

      &.is-image {
        padding-left: 0;
      }

      .upload-images {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 180px;
        overflow: hidden;
        border-radius: 8px;

        input[type='file'] {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
          cursor: pointer;
          opacity: 0;
        }
      }

      .image-scene {
        position: relative;
        height: 100%;
        width: 180px !important;
        background-position: center;
        background-size: cover;
        border-radius: 8px;

        .title {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          bottom: 0;
          width: 100%;
          height: 30px;
          background-color: var(--colorBlur);
          color: var(--colorPrimary);
          left: 0;
          font-size: 14px;
        }

        .tour-btn {
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 60px;
          animation: bounceIt 1s ease 0s infinite alternate;
        }
      }
    }
  }

  @keyframes bounceIt {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-10px);
    }
  }
</style>

<div class="panel type-carrousel-img" class:active={clickMode === CLICK_MODES.DESTINY || activedByBtn}>
  <button class="toggle-hide" onclick={() => (activedByBtn = !activedByBtn)}>
    <Svg name="arrow" fill="white"></Svg>
  </button>
  <SliderHorizontal>
    {#if ref}
      <div class="item-wrapper">
        <button class="upload-images g-box hover" onchange={handleUploadImages}>
          <input type="file" accept="image/*" multiple />

          <Svg name={loadingImages ? 'loading' : 'addBox'} width="50" height="50" fill="var(--colorBorder)" />
          <span>{loadingImages ? uploadingCopy : 'Subir imágenes'}</span>
        </button>
      </div>
    {/if}

    {#each tourScenes as scene, i (scene.id)}
      <div class="item-wrapper is-image">
        <button class="image-scene g-box hover" style="background-image: url('{scene.cover}')" onclick={() => handleCarrouselClick(i)}>
          {#if clickMode === CLICK_MODES.DESTINY}
            <img class="tour-btn" src="/assets/tour/Flecha.png" alt="" />
          {/if}

          <span class="title">
            {scene.text}
          </span>
        </button>
      </div>
    {/each}
  </SliderHorizontal>
</div>
