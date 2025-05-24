<script lang="ts">
  import Button from '@/modules/shared/components/Button.svelte'
  import Input from '@/modules/shared/components/Input.svelte'
  import QRCodeStyling from 'qr-code-styling'
  import { api } from '@/modules/shared/scripts/api'
  import { blobToBase64 } from '@/modules/shared/scripts/generic'
  import { generateId } from 'lucia'

  interface Props {
    closed: boolean
    onNewQR: Function | null
  }

  let { closed = $bindable(), onNewQR }: Props = $props()

  const formData = $state({
    title: {
      value: '',
      error: false,
    },
    destiny: {
      value: '',
      error: false,
    },
  })

  let loading: boolean = $state(false)

  const createQRUrl = async () => {
    try {
      formData.title.error = !formData.title.value
      formData.destiny.error = !formData.destiny.value

      const anyError = Object.values(formData).some((item) => item.error)

      if (anyError) return

      loading = true

      const code = `qr${generateId(8)}`
      const qrImage = new QRCodeStyling({
        data: `https://admin.tramita.info/qr/${code}`,
        image: 'https://admin.tramita.info/assets/logo.png',
        cornersDotOptions: {
          type: 'dot',
          color: '#0e816c',
        },
        dotsOptions: {
          type: 'dots',
          color: 'gray',
        },
        cornersSquareOptions: {
          type: 'extra-rounded',
          color: '#0e816c',
        },
        backgroundOptions: {
          color: 'transparent',
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 2,
        },
      })

      const qrBlob = await qrImage.getRawData('png')

      const response = await api.post('/api/private/qr-redirect', {
        code,
        title: formData.title.value,
        destiny: formData.destiny.value,
        qrBase64: await blobToBase64(qrBlob),
      })

      loading = false

      if (response.ok) {
        closed = true
        onNewQR()
      } else {
        throw new Error()
      }
    } catch (err) {
      alert('Ha ocurrido un error')
      console.log(err)
    }
  }
</script>

<style lang="scss">
  .new-qr-url {
    display: grid;
    padding: 20px;
    gap: 20px;

    :global(button) {
      margin-top: 50px;
    }
  }
</style>

<div class="new-qr-url">
  <Input label="Título" bind:value={formData.title.value} error={formData.title.error} />
  <Input label="URL Destino" bind:value={formData.destiny.value} error={formData.destiny.error} />
  <Button icon="qrAdd" {loading} click={createQRUrl}>Crear nueva URL con QR</Button>
</div>
