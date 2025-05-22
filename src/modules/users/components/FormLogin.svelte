<script lang="ts">
  import Input from '@/modules/shared/components/Input.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { goto } from '$app/navigation'

  const data = $state({
    email: {
      value: '',
      validate: false,
      error: false,
    },
    password: {
      value: '',
      validate: null,
      error: false,
    },
  })

  let loading = $state(false)
  let responseMessage: string = $state('')

  const login = async () => {
    data.email.error = !data.email.value
    data.password.error = !data.password.value

    data.email.error = !data.email.validate

    const errors = Object.values(data).map((field) => field.error)

    if (!errors.includes(true)) {
      loading = true

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email.value,
          password: data.password.value,
        }),
      })

      data.email.value = ''
      data.password.value = ''

      loading = false

      if (response.status === 200) {
        goto('/panel')
      } else {
        responseMessage = await response.text()
      }
    }
  }
</script>

<style lang="scss">
  .login-form {
    padding: 30px;
    width: 100%;
    max-width: 400px;
    background-color: var(--colorSecondary);

    .brand {
      display: flex;
      gap: 20px;
      justify-content: center;

      .titles {
        h1 {
          font-size: 34px;
        }

        h2 {
          margin-top: -5px;
          margin-left: 5px;
          color: var(--colorText2);
        }
      }
    }

    .inputs {
      padding-top: 40px;
      padding-bottom: 30px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .response {
      margin-bottom: 5px;
      font-size: 14px;
      text-align: center;
    }
  }
</style>

<div class="login-form g-box">
  <div class="brand">
    <Svg name="logo" width="70" height="70" />

    <div class="titles">
      <h1>TRAMITA</h1>
      <h2>Panel de administración</h2>
    </div>
  </div>
  <div class="inputs">
    <Input
      id="email"
      sufix="email"
      error={data.email.error}
      bind:value={data.email.value}
      bind:validateEmail={data.email.validate}
      autocomplete="email"
      type="email"
      label="Email"
    />

    <Input id="password" label="Contraseña" error={data.password.error} bind:value={data.password.value} type="password" />
  </div>

  <Button width="100%" click={login} customClass="submit-login">
    {#if loading}
      <Svg name="loading" width="20" height="20" />
    {:else}
      Entrar en casa
    {/if}
  </Button>

  <div class="response">{responseMessage}</div>
</div>
