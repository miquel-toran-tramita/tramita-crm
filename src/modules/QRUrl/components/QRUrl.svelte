<script lang="ts">
  import type { IQRUrlItem } from '@/modules/QRUrl/interfaces/IQRUrlItem'
  import Button from '@/modules/shared/components/Button.svelte'
  import Input from '@/modules/shared/components/Input.svelte'
  import { api } from '@/sync/scripts/api'

  interface Props {
    QRUrlItem: IQRUrlItem
  }

  let { QRUrlItem }: Props = $props()

  const mainItem = QRUrlItem[0]?.QRUrl || {}

  let destiny: string = $state(mainItem?.destiny || '')
  let title: string = $state(mainItem?.title || '')

  const removeQR = async () => {
    const response = await api.delete(`/api/private/qr-redirect/${mainItem.code}`)

    if (response.ok) window.location.href = '/espacio-qr'
  }
</script>

<style lang="scss">
  .image {
    display: flex;
    max-width: 300px;
    flex-direction: column;
    gap: 20px;

    :global(button) {
      width: 100%;
    }
  }

  .buttons {
    padding: 20px 0;
    display: flex;
    gap: 20px;
  }
</style>

<div class="qr-url">
  <h1><Input bind:value={title} /></h1>

  <Input bind:value={destiny} />

  <div class="image">
    <img src={mainItem.qrImageURL} alt="qr" />

    <a href="{mainItem.qrImageURL}?download=1" download="{mainItem.title}.png">
      <Button>Descargar Imagen QR</Button>
    </a>
  </div>

  <div class="buttons">
    <Button>Guardar cambios</Button>
    <Button type="secondary" click={removeQR}>Eliminar</Button>
  </div>
</div>
