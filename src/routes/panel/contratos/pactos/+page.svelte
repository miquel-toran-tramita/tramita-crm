<script lang="ts">
  import type { IPacto } from '@/modules/contracts/interfaces/IPacto'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import Checkbox from '@/modules/shared/components/Checkbox.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import Input from '@/modules/shared/components/Input.svelte'
  import { CONTRACTS } from '@/modules/contracts/constants/contracts'
  import { api } from '@/modules/shared/scripts/api'

  interface Props {
    pactos: IPacto[]
  }

  let { pactos = [] }: Props = $props()

  let editMode: boolean = $state(false)
  let loading: boolean = $state(false)
  let formPacto: IPacto = $state({
    id: '',
    title: '',
    content: '',
    contracts: [],
  })

  const toggleContract = (contract: string) => {
    if (formPacto.contracts.includes(contract)) {
      formPacto.contracts = formPacto.contracts.filter((ctr: string) => ctr != contract)
      return
    }

    formPacto.contracts.push(contract)
  }

  const createPacto = async () => {
    loading = true

    if (editMode) {
      await api.put('/api/private/pactos', { data: formPacto })
    } else {
      await api.post('/api/private/pactos', { data: formPacto })
    }

    const response = await api.get('/api/private/pactos')
    pactos = response.data

    loading = false
  }

  const desactivateEditorMode = () => {
    editMode = false

    formPacto.id = ''
    formPacto.title = ''
    formPacto.content = ''
    formPacto.contracts = []
  }

  const removePacto = async () => {
    if (editMode && formPacto.id) {
      loading = true

      await api.delete('/api/private/pactos', {
        data: {
          id: formPacto.id,
        },
      })

      const response = await api.get('/api/private/pactos')
      pactos = response.data

      loading = false
    }

    desactivateEditorMode()
  }

  const activeEditorMode = (pacto: IPacto) => {
    editMode = true

    formPacto.id = pacto.id
    formPacto.title = pacto.title
    formPacto.content = pacto.content
    formPacto.contracts = pacto.contracts
  }
</script>

<style lang="scss">
  .pactos {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));

    h2 {
      font-size: 20px;
      text-align: center;
    }

    .mini-btn {
      position: absolute;
      right: 20px;
      top: 20px;

      &:hover {
        :global(svg) {
          fill: var(--colorPrimary);
        }
      }
    }

    .pacto {
      position: relative;
      padding: 20px;

      &__content {
        font-size: 14px;
        padding-bottom: 40px;
        padding-top: 20px;
        text-align: justify;
      }

      &__contracts {
        display: flex;
        gap: 20px;
        position: absolute;
        bottom: 20px;
        font-size: 12px;
        right: 20px;
        left: 20px;
        color: var(--colorText2);
        font-style: italic;
      }
    }
    .pacto-form {
      position: relative;
      padding: 20px;
      grid-row: span 2;

      :global(input),
      :global(textarea),
      p {
        font-size: 14px !important;
        text-align: justify;
      }

      h2 {
        font-weight: bold;
      }

      .inputs {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        gap: 20px;

        :global(textarea) {
          min-height: 250px;
        }
      }

      .contracts {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        .item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }

      .buttons {
        display: flex;
        gap: 10px;
        padding-top: 20px;

        :global(button) {
          width: 100%;
        }

        :global(.trash-btn) {
          width: fit-content;
        }
      }
    }
  }
</style>

<div class="pactos">
  <div class="g-box pacto-form">
    <h2>{editMode ? 'Editar pacto' : 'Crear pacto'}</h2>

    {#if editMode}
      <button class="mini-btn" onclick={desactivateEditorMode}>
        <Svg name="close" fill="var(--colorText2)"></Svg>
      </button>
    {/if}

    <div class="inputs">
      <Input placeholder="Título" bind:value={formPacto.title}></Input>
      <Input placeholder="Contenido" bind:value={formPacto.content} type="textarea" maxlength={99999}></Input>
    </div>

    <div class="contracts">
      {#each CONTRACTS as contract}
        <div class="item">
          <Checkbox value={formPacto.contracts.includes(contract)} input={() => toggleContract(contract)}></Checkbox>
          <p>{contract}</p>
        </div>
      {/each}
    </div>

    <div class="buttons">
      <Button {loading} icon={editMode ? 'edit' : 'addBox'} click={createPacto}>{editMode ? 'Actualizar pacto' : 'Crear pacto'}</Button>
      <Button customClass="trash-btn" icon="trash" type="secondary" click={removePacto}></Button>
    </div>
  </div>

  {#each pactos as pacto}
    <div class="g-box pacto">
      <h2 class="pacto__title">{pacto.title}</h2>

      <button class="mini-btn" onclick={() => activeEditorMode(pacto)}>
        <Svg name="edit" fill="var(--colorText2)"></Svg>
      </button>

      <p class="pacto__content">
        {pacto.content}
      </p>

      <div class="pacto__contracts">
        {#each pacto.contracts as contract}
          <span> {contract} </span>
        {/each}
      </div>
    </div>
  {/each}
</div>
