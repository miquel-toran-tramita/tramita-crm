<script lang="ts">
  import Input from '@/modules/shared/components/Input.svelte'
  import Button from '@/modules/shared/components/Button.svelte'

  let { agent } = $props()

  let data = $state({
    username: agent.username,
    email: agent.email,
    phone: agent.phone,
    avatar: agent.avatar,
  })

  const onchange = (ev) => {
    const file = ev.target.files[0] // Obtener el archivo seleccionado
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        // Asignar la imagen leída al estado de avatar
        data.avatar = reader.result as string
      }

      // Leer la imagen como una URL de datos
      reader.readAsDataURL(file)
    }
  }
</script>

<style lang="scss">
  .profile-form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .avatar {
      width: 200px;
      height: 200px;
      border-radius: 100%;
      border: 1px solid var(--colorBorder);
      background-color: var(--colorNeutral);
      background-position: center;
      background-size: cover;
      margin: auto;
      margin-bottom: 30px;
    }
  }
</style>

<div class="profile-form">
  <div class="avatar" style=" background-image: url('{data.avatar}')"></div>

  <Input bind:value={data.username} label="Nombre de usuario" />
  <Input type="email" bind:value={data.email} label="Email" />
  <Input type="tel" bind:value={data.phone} label="Teléfono" />
  <Input type="file" {onchange} label="Nuevo avatar" accept="image/*" />

  <Button>Guardar cambios</Button>
</div>
