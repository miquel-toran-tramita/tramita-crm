<script>
  import FormLogin from '@/modules/users/components/FormLogin.svelte'
</script>

<style lang="scss">
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--colorNeutral);
    height: 100vh;
    width: 100%;
  }
</style>

<div class="login-container">
  <FormLogin />
</div>
