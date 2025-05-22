<script lang="ts">
  let agent = {}
</script>

<style lang="scss">
  .home {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 50px;

    h1 {
      font-weight: bold;
      font-size: 100px;
      color: var(--colorPrimary);
    }

    h2 {
      font-size: 70px;
      color: var(--colorText2);
    }

    img {
      transition: 0.3s ease;
      width: 200px;

      &:hover {
        transform: rotateZ(-10deg);
      }
    }
  }
</style>

<div class="home">
  <img class="g-box" src={agent.avatar} alt="" />

  <div>
    <h1>¡Buenos días</h1>
    <h2>{agent.username}!</h2>
  </div>
</div>
