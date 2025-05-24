<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'

  interface Props {
    contact: IContact
  }

  let { contact }: Props = $props()
  let params = `${contact.id}_${contact.name}`
</script>

<style lang="scss">
  .card-contact {
    position: relative;
    overflow: hidden;
    padding: 20px;

    .acc-activated {
      position: absolute;
      left: 20px;
      top: 20px;
      border-radius: 100%;
      opacity: 0.4;
    }

    .contact-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .buyer-seller {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 20px;
        right: 20px;
      }

      .avatar {
        border-radius: 100%;
        width: 100px;
        height: 100%;
        border: 1px solid var(--colorBorder);
        overflow: hidden;
        margin-bottom: 10px;

        img {
          display: block;
          filter: grayscale(1) opacity(0.8);
          background-color: lightblue;
        }
      }

      .name {
        font-weight: bold;
        color: var(--colorPrimary);
        font-size: 20px;
        padding: 20px 0;
      }
    }

    .send-messages {
      button {
        transform: translateY(1px);
      }

      .email,
      .phone,
      a {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 16px;
        line-height: 2;
        color: var(--colorText2);
      }
    }
  }
</style>

<div class="card-contact g-box">
  <a href="/contactos/{params}">
    <div class="contact-data">
      {#if contact.accountActivated}
        <div class="acc-activated" title="Área personal activada">
          <Svg name="logo" fill="var(--colorPrimary)" />
        </div>
      {/if}

      <div class="buyer-seller">
        {#if contact.buyer}
          <div class="buyer" title="Comprador">
            <Svg name="key" fill="var(--colorPrimary)" />
          </div>
        {/if}

        {#if contact.seller}
          <div class="seller" title="Vendedor">
            <Svg name="sell" fill="var(--colorPrimary)" />
          </div>
        {/if}
      </div>

      <div class="avatar">
        <img src="https://api.dicebear.com/9.x/bottts/svg?seed={contact.avatar}" alt="avatar" />
      </div>

      <div class="name">{contact.name}</div>
    </div>
  </a>

  <div class="send-messages">
    <div class="email">
      <a href="mailto:{contact.email}" title="Enviar Correo">
        <Svg name="email" fill="var(--colorText2)" width="20" />
      </a>

      <button onclick={() => navigator.clipboard.writeText(contact.email)}>
        {contact.email}
      </button>
    </div>

    <div class="phone">
      <a target="_blank" href="https://wa.me/{contact.phone}" title="Enviar mensaje por Whatsapp">
        <Svg name="whatsapp" fill="var(--colorText2)" width="20" />
      </a>

      <button onclick={() => navigator.clipboard.writeText(contact.phone)}>
        {contact.phone}
      </button>
    </div>
  </div>
</div>
