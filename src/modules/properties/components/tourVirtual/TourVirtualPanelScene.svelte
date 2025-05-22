<script lang="ts">
  import type { ITourScene } from '@/sync/interfaces/ITourScene.ts'
  import { TourVirtual } from '@/modules/properties/scripts/TourVirtual'
  import Button from '@/modules/shared/components/Button.svelte'
  import Input from '@/modules/shared/components/Input.svelte'
  import { api } from '@/sync/scripts/api'

  interface Props {
    tourScenes: ITourScene[]
    currentSceneI: number
    ref: string
    tour: TourVirtual
  }

  let { tourScenes = $bindable(), currentSceneI, ref, tour }: Props = $props()

  const onStopTyping = async (newValue: string) => {
    if (!tourScenes[currentSceneI]) return

    tourScenes[currentSceneI].text = newValue
    await api.put('/api/private/properties', { ref, tourScenes })
  }

  const removeScene = async () => {
    const scene = tourScenes[currentSceneI]

    await api.delete('/api/private/blobs', { path: scene.image })

    tourScenes = tourScenes.filter((_, i: number) => i != currentSceneI)

    if (tourScenes?.length) tour.updateRoom(tourScenes[0])

    await api.put('/api/private/properties', { ref, tourScenes })

    currentSceneI = 0
  }

  let sceneTitleValue = $derived(tourScenes ? tourScenes[currentSceneI]?.text : '')
</script>

<style lang="scss">
  .type-scene {
    transform-origin: top right;
    top: 20px;
    right: 20px;

    .g-box {
      padding: 20px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>

<div class="panel type-scene">
  <div class="g-box">
    <h4>Escena {currentSceneI + 1} / {tourScenes?.length || 0}</h4>

    <span>
      Elementos: {tourScenes ? tourScenes[currentSceneI]?.bridges?.length : 0}
    </span>

    <Input label="Título" value={sceneTitleValue} {onStopTyping}></Input>

    <Button customClass="g-mini-radius" type="danger" click={removeScene}>Borrar escena</Button>
  </div>
</div>
