<script lang="ts">
  import Button from '@/modules/shared/components/Button.svelte'
  import { api } from '@/sync/scripts/api'

  interface Props {
    ref: string
    titulo: string
  }

  let { ref, titulo }: Props = $props()
  let loading: boolean = $state(false)

  const folderName = `${ref} - ${titulo}`
  const createFolderStructure = async () => {
    loading = true
    const res = await api.post('/api/private/google/drive/createFolderStructure', { name: folderName })

    if (res.status === 200) {
      await api.put('/api/private/properties', { ref, googleDriveFolders: res.data })
    }

    loading = false
  }
</script>

<style lang="scss">
  .section-follow-up {
  }
</style>

<div class="section-follow-up">
  <Button icon="googleDrive" click={createFolderStructure} {loading}>Crear estructura de carpetas</Button>
</div>
