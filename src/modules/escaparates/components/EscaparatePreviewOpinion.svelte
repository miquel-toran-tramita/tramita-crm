<script lang="ts">
  interface Props {
    horizontal: boolean;
  }

  let { horizontal }: Props = $props();
</script>

<div class="pdf-preview">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Gudea:wght@400;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    .pdf-preview *,
    .pdf-preview *::before,
    .pdf-preview *::after {
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
    }

    .pdf-preview {
      height: 100%;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      font-family: 'Gudea';
    }

    .horizontalContainer {
      height: 710px !important;
    }

    .color {
      color: #0e816c;
    }

    b {
      color: inherit;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 70px;
      padding: 80px;
    }

    .name {
      font-size: 30px;
      color: #839693;
      font-family: 'Gudea';
    }

    .opinion {
      position: relative;
    }

    .text {
      position: relative;
      text-align: center;
      text-wrap: balance;
      font-size: 35px;
      z-index: 2;
      color: black;
    }

    .stars {
      display: flex;
      gap: 10px;
    }

    .rating {
      position: relative;
      width: 60px;
      height: 60px;
    }

    .blob {
      fill: #0e816c;
    }

    .rating svg {
      position: absolute;
      stroke: #fff;
    }

    .quote {
      position: absolute;
      fill: #d3d3d3;
      with: 110px;
      height: 110px;
      opacity: 0.5;
    }

    .R-quote {
      right: 20px;
      bottom: -40px;
      transform: rotate(180deg);
    }

    .L-quote {
      left: 20px;
      top: -40px;
    }

    .star {
      z-index: 2;
    }
  </style>

  <div class="container" class:horizontalContainer={horizontal}>
    <h4 class="name" contenteditable>Miquel Torán</h4>

    <div class="opinion">
      <div class="L-quote quote">
        <svg xmlns="http://www.w3.org/2000/svg" class="quote" viewBox="0 0 1664 1408"
          ><path
            d="M768 832v384q0 80-56 136t-136 56H192q-80 0-136-56T0 1216V512q0-104 40.5-198.5T150 150T313.5 40.5T512 0h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136m896 0v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136V512q0-104 40.5-198.5T1046 150t163.5-109.5T1408 0h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136"
          ></path></svg
        >
      </div>

      <div class="text" contenteditable>
        La mafia quería partirme las piernas, pero gracias a Tramita he podido vender mi piso en tiempo récord!<br /><br /> Gracias a
        vosotros ahora mis hijos pueden ir al colegio sin escolta.
        <br /><br />
        Les recomiendo 100% la mejor inmobiliaria de la ciudad.
      </div>

      <div class="R-quote quote">
        <svg xmlns="http://www.w3.org/2000/svg" class="quote" viewBox="0 0 1664 1408"
          ><path
            d="M768 832v384q0 80-56 136t-136 56H192q-80 0-136-56T0 1216V512q0-104 40.5-198.5T150 150T313.5 40.5T512 0h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136m896 0v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136V512q0-104 40.5-198.5T1046 150t163.5-109.5T1408 0h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136"
          ></path></svg
        >
      </div>
    </div>

    <div class="stars">
      <div class="rating">
        <svg xmlns="http://www.w3.org/2000/svg" class="star" viewBox="0 0 24 24"
          ><path
            fill="none"
            stroke="inherit"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.3"
            d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
          ></path></svg
        >
        <svg xmlns="http://www.w3.org/2000/svg" class="blob" viewBox="0 0 102 95"
          ><path
            d="M55.2,-18.3C60.4,-1.9,45.9,20.6,26.6,34C7.3,47.4,-16.8,51.8,-30.2,42C-43.6,32.1,-46.3,8.1,-39.5,-10.5C-32.7,-29,-16.4,-42.1,4.3,-43.5C25,-45,50,-34.7,55.2,-18.3Z"
            transform="translate(45 45)"
          ></path></svg
        >
      </div>
      <div class="rating">
        <svg xmlns="http://www.w3.org/2000/svg" class="star" viewBox="0 0 24 24"
          ><path
            fill="none"
            stroke="inherit"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.3"
            d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
          ></path></svg
        >
        <svg xmlns="http://www.w3.org/2000/svg" class="blob" viewBox="0 0 102 95"
          ><path
            d="M55.2,-18.3C60.4,-1.9,45.9,20.6,26.6,34C7.3,47.4,-16.8,51.8,-30.2,42C-43.6,32.1,-46.3,8.1,-39.5,-10.5C-32.7,-29,-16.4,-42.1,4.3,-43.5C25,-45,50,-34.7,55.2,-18.3Z"
            transform="translate(45 45)"
          ></path></svg
        >
      </div>
      <div class="rating">
        <svg xmlns="http://www.w3.org/2000/svg" class="star" viewBox="0 0 24 24"
          ><path
            fill="none"
            stroke="inherit"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.3"
            d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
          ></path></svg
        >
        <svg xmlns="http://www.w3.org/2000/svg" class="blob" viewBox="0 0 102 95"
          ><path
            d="M55.2,-18.3C60.4,-1.9,45.9,20.6,26.6,34C7.3,47.4,-16.8,51.8,-30.2,42C-43.6,32.1,-46.3,8.1,-39.5,-10.5C-32.7,-29,-16.4,-42.1,4.3,-43.5C25,-45,50,-34.7,55.2,-18.3Z"
            transform="translate(45 45)"
          ></path></svg
        >
      </div>
      <div class="rating">
        <svg xmlns="http://www.w3.org/2000/svg" class="star" viewBox="0 0 24 24"
          ><path
            fill="none"
            stroke="inherit"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.3"
            d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
          ></path></svg
        >
        <svg xmlns="http://www.w3.org/2000/svg" class="blob" viewBox="0 0 102 95"
          ><path
            d="M55.2,-18.3C60.4,-1.9,45.9,20.6,26.6,34C7.3,47.4,-16.8,51.8,-30.2,42C-43.6,32.1,-46.3,8.1,-39.5,-10.5C-32.7,-29,-16.4,-42.1,4.3,-43.5C25,-45,50,-34.7,55.2,-18.3Z"
            transform="translate(45 45)"
          ></path></svg
        >
      </div>
      <div class="rating">
        <svg xmlns="http://www.w3.org/2000/svg" class="star" viewBox="0 0 24 24"
          ><path
            fill="none"
            stroke="inherit"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.3"
            d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
          ></path></svg
        >
        <svg xmlns="http://www.w3.org/2000/svg" class="blob" viewBox="0 0 102 95"
          ><path
            d="M55.2,-18.3C60.4,-1.9,45.9,20.6,26.6,34C7.3,47.4,-16.8,51.8,-30.2,42C-43.6,32.1,-46.3,8.1,-39.5,-10.5C-32.7,-29,-16.4,-42.1,4.3,-43.5C25,-45,50,-34.7,55.2,-18.3Z"
            transform="translate(45 45)"
          ></path></svg
        >
      </div>
      <!--]-->
    </div>
  </div>
</div>
