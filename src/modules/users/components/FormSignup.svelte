<script lang="ts">
  import Input from '@/modules/shared/components/Input.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import Checkbox from '@/modules/shared/components/Checkbox.svelte'

  interface Props {
    admin?: boolean
  }

  let { admin = false }: Props = $props()
  let buyer: boolean = true
  let seller: boolean = false

  const data = $state({
    username: {
      value: '',
      validate: null,
      error: false,
    },
    email: {
      value: '',
      validate: null,
      error: false,
    },
    role: {
      value: '',
      validate: null,
      error: false,
    },
    password: {
      value: '',
      validate: null,
      error: false,
    },
  })

  $effect(() => {
    data.role.value = buyer ? 'Comprador' : 'Vendedor'
  })

  let loading = $state(false)
  let responseMessage: string = $state('')
  const login = async () => {
    data.email.error = !data.email.value
    data.username.error = !data.username.value
    data.password.error = !data.password.value
    data.role.error = !data.role.value

    data.email.error = data.email.validate('La dirección de email no es válida')

    const errors = Object.values(data).map((field) => field.error)

    if (!errors.includes(true)) {
      loading = true

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username.value,
          email: data.email.value,
          password: data.password.value,
          roles: data.role.value,
        }),
      })

      loading = false

      if (response.status === 200) {
        data.username.value = ''
        data.email.value = ''
        data.password.value = ''

        window.location.href = '/'
      } else {
        responseMessage = await response.text()
      }
    }
  }
</script>

<style lang="scss">
  .login-form {
    padding: 40px;
    width: 100%;
    max-width: 420px;
    border-radius: var(--radius);
    backdrop-filter: blur(15px);
    box-shadow: 0 0 30px 0px rgba(0, 0, 0, 0.1);

    &.admin {
      max-width: 100%;
      box-shadow: unset;
      backdrop-filter: unset;
      border-radius: unset;
      padding: 20px;

      .inputs {
        padding-top: 0;
      }

      .brand {
        display: none;
      }
    }

    .brand {
      display: flex;
      gap: 20px;
      justify-content: center;

      .titles {
        h1 {
          font-size: 34px;
          font-weight: 100;
        }

        h2 {
          color: var(--colorText2);
        }
      }
    }

    .inputs {
      padding-top: 50px;
      padding-bottom: 30px;

      :global(input) {
        background-color: var(--colorSecondary);
      }
    }
    .response {
      font-size: 14px;
      text-align: center;
    }
  }
</style>

<div class="login-form" class:admin>
  <div class="brand">
    <Svg name="logo" width="70" height="70" />

    <div class="titles">
      <h1>Tramita</h1>
      <h2>Área de clientes</h2>
    </div>
  </div>
  <div class="inputs">
    <Input
      id="name"
      sufix="person"
      error={data.username.error}
      bind:value={data.username.value}
      placeholder="Nombre completo"
      autocomplete="name"
    />

    <Input
      id="email"
      sufix="email"
      error={data.email.error}
      bind:value={data.email.value}
      bind:externalValidate={data.email.validate}
      placeholder="Correo electrónico"
      autocomplete="email"
      type="email"
    />

    <Input
      id="password"
      error={data.password.error}
      bind:value={data.password.value}
      placeholder="Contraseña"
      autocomplete="passowrd"
      type="password"
    />
  </div>

  <Button width="100%" click={login}>
    {#if loading}
      <Svg name="loading" />
    {:else}
      {admin ? 'Crear nuevo usuario' : 'Unirse a la familia'}
    {/if}
  </Button>

  <div class="response">{responseMessage}</div>
</div>
