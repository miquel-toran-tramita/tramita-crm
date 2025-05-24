<script lang="ts">
  import Svg from '@/modules/shared/components/Svg.svelte'

  import ActivateAccount from '@/modules/contacts/components/ActivateAccount.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import Input from '@/modules/shared/components/Input.svelte'
  import type { SvgStore } from '@/modules/shared/interfaces/ISvgStore'
  import { api } from '@/modules/shared/scripts/api'
  import { uncompressContactPreference, uncompressTimePreference } from '@/sync/scripts/compressPreferences'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'

  interface Props {
    contact: IContact
    isAccountActivated?: boolean
    slim?: boolean
    removeCard?: Function
  }

  let { contact, isAccountActivated, slim, removeCard }: Props = $props()
  let modeEditor: boolean = $state(false)
  let loading: boolean = $state(false)

  const editAndSave = async () => {
    if (modeEditor && contact) {
      loading = true
      await api.put('/api/private/contacts', contact)
      loading = false

      modeEditor = false

      return
    }

    modeEditor = true
  }

  let editCopy: string = $derived(loading ? 'Guardando...' : modeEditor ? 'Guardar cambios' : 'Editar contacto')
  let editIcon: keyof SvgStore = $derived(modeEditor ? 'tick' : 'edit')

  let timePreference = $derived(uncompressTimePreference(contact?.timePreference))
  let contactPreference = $derived(uncompressContactPreference(contact?.contactPreference))
</script>

<style lang="scss">
  .contact-personal-data {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 500px 1fr;
    gap: 50px;

    .labels {
      display: flex;
      justify-content: space-between;
      width: 100%;
      gap: 10px;
      padding: 5px;
      position: absolute;
    }

    .left-block {
      display: flex;
      gap: 20px;
      height: 150px;

      .avatar {
        position: relative;
        img {
          aspect-ratio: 1;
          height: 100%;
          border-radius: var(--radius);
          object-fit: cover;
          margin-bottom: 20px;
          border: 1px solid var(--colorBorder);
          background-color: var(--colorNeutral);
        }
      }

      .important-data {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
        width: 100%;

        .name {
          color: var(--colorPrimary);
          font-size: 26px;
        }

        .flex-col {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .email,
        .phone,
        a {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
        }
      }
    }

    .items {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      max-width: 800px;
      align-content: space-between;
      gap: 20px;
    }

    :global(input) {
      font-size: 14px;
    }

    :global(.remove-card) {
      position: absolute;
      top: 0px;
      right: 0px;
      padding: 10px;
    }

    .buttons {
      display: flex;
      gap: 10px;
      grid-column: span 2;
    }
  }
</style>

{#if contact}
  <div class="contact-personal-data">
    <div class="left-block">
      <div class="avatar">
        <div class="labels">
          {#if contact.seller}
            <Svg name="sell" fill="var(--colorText2)" width="25" height="25" />
          {/if}

          {#if contact.buyer}
            <Svg name="key" fill="var(--colorText2)" width="25" height="25" />
          {/if}
        </div>
        <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${contact.avatar}`} alt="avatar" />
      </div>

      <div class="important-data">
        {#if modeEditor}
          <Input bind:value={contact.name}></Input>
        {:else}
          <div class="name" copy-to-clipboard={contact.name}>
            {contact.name}
          </div>
        {/if}

        <div class="flex-col">
          <div class="email">
            <a href="mailto:{contact.email}" title="Enviar Correo">
              <Svg name="email" fill="var(--colorText2)" width="25" />
            </a>

            {#if modeEditor}
              <Input bind:value={contact.email}></Input>
            {:else}
              <button copy-to-clipboard={contact.email}>
                {contact.email}
              </button>
            {/if}
          </div>

          <a class="phone" target="_blank" href={`https://wa.me/${contact.phone}`} title="Enviar mensaje por Whatsapp">
            <Svg name="whatsapp" fill="var(--colorText2)" width="25" />

            {#if modeEditor}
              <Input bind:value={contact.phone}></Input>
            {:else}
              <button copy-to-clipboard={contact.phone}>
                {contact.phone}
              </button>
            {/if}
          </a>
        </div>
      </div>
    </div>

    <div class="items">
      <div class="g-item">
        <h4>Documento de identidad:</h4>

        {#if modeEditor}
          <Input bind:value={contact.dni}></Input>
        {:else}
          <button copy-to-clipboard={contact.dni}>
            {contact.dni}
          </button>
        {/if}
      </div>

      <div class="g-item">
        <h4>Nacionalidad:</h4>

        {#if modeEditor}
          <Input bind:value={contact.nation}></Input>
        {:else}
          <button copy-to-clipboard={contact.nation}>
            {contact.nation}
          </button>
        {/if}
      </div>

      <div class="g-item">
        <h4>Fecha de nacimiento:</h4>

        {#if modeEditor}
          <Input bind:value={contact.birth}></Input>
        {:else}
          <button copy-to-clipboard={contact.birth}>
            {contact.birth}
          </button>
        {/if}
      </div>

      <div class="g-item">
        <h4>Profesión:</h4>

        {#if modeEditor}
          <Input bind:value={contact.profesion}></Input>
        {:else}
          <button copy-to-clipboard={contact.profesion}>
            {contact.profesion}
          </button>
        {/if}
      </div>

      <div class="g-item">
        <h4>Preferencias de contacto:</h4>

        {#if modeEditor}
          <Input bind:value={contact.contactPreference}></Input>
        {:else}
          <span>
            {contactPreference || '-'}
          </span>
        {/if}
      </div>

      <div class="g-item">
        <h4>Preferencias horario:</h4>

        {#if modeEditor}
          <Input bind:value={contact.timePreference}></Input>
        {:else}
          <span>
            {timePreference || '-'}
          </span>
        {/if}
      </div>

      <div class="g-item">
        <h4>Gestionado por:</h4>

        {#if modeEditor}
          <Input bind:value={contact.agent}></Input>
        {:else}
          <button copy-to-clipboard={contact.agent}>
            {contact.agent || '-'}
          </button>
        {/if}
      </div>

      <div class="g-item">
        <h4>Notas:</h4>

        {#if modeEditor}
          <Input bind:value={contact.importantInfo}></Input>
        {:else}
          <button copy-to-clipboard={contact.importantInfo}>
            {contact.importantInfo}
          </button>
        {/if}
      </div>
    </div>

    {#if removeCard}
      <Button customClass="remove-card" type="secondary" click={() => removeCard(contact)} icon="trash" />
    {/if}

    {#if !slim}
      <div class="buttons">
        <Button icon={editIcon} {loading} click={editAndSave}>{editCopy}</Button>
        <ActivateAccount {contact} {isAccountActivated} />
      </div>
    {/if}
  </div>
{/if}
