<script lang="ts">
  import Input from '@/modules/shared/components/Input.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import DataSection from '@/modules/shared/components/DataSection.svelte'
  import SelectSimple from '@/modules/shared/components/SelectSimple.svelte'
  import Checkbox from '@/modules/shared/components/Checkbox.svelte'
  import { onMount } from 'svelte'

  import type { IContact } from '@/modules/contacts/interfaces/IContact'
  import type { ILabelValue } from '@/modules/shared/interfaces/ILabelValue'
  import { api } from '@/modules/shared/scripts/api'
  import { generateRandomString } from '@/modules/shared/scripts/avatar'

  let options: ILabelValue[] = $state([])

  onMount(async () => {
    const response = await api.get('/api/private/agents')

    options = response.data.map((agent) => {
      return {
        label: agent.username,
        value: agent.id,
      }
    })
  })

  const formData: IContact = $state({
    name: 'Miquel Toran',
    avatar: generateRandomString(),
    email: 'miquel97bdn@gmail.com',
    phone: '672 21 23 89',
    dni: '5435353X',
    nation: 'España',
    birth: '17/11/2000',
    profesion: 'Futbolista',
    comments: 'Esto es un comentario',
    importantInfo: 'Esto es una alerta',
    agent: '', // Requerido, referencia a User.id
    capturedBy: '', // Requerido, referencia a User.id
    password: '',
    buyer: false,
    seller: false,
    accountActivated: false,
  })

  const createContact = async () => {
    try {
      await api.post('/api/private/contacts', {
        ...formData,
        agent: formData.agent.value,
        capturedBy: formData.capturedBy.value,
      })

      window.location.href = `/contactos`
    } catch (err) {
      alert('Ha ocurrido un error')
    }
  }
</script>

<style lang="scss">
  .form-contact {
    display: grid;
    padding: 20px;
    grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
    gap: 0 60px;

    .checkboxes {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>

<div class="form-contact g-box">
  <DataSection title="Información personal" icon="person">
    <div class="item">
      <h4>Nombre y apellidos:</h4>
      <Input bind:value={formData.name} />
    </div>

    <div class="item">
      <h4>Email:</h4>
      <Input bind:value={formData.email} type="email" />
    </div>

    <div class="item">
      <h4>Teléfono:</h4>
      <Input bind:value={formData.phone} type="tel" />
    </div>

    <div class="item">
      <h4>Documento de identidad:</h4>
      <Input bind:value={formData.dni} />
    </div>

    <div class="item">
      <h4>Nacionalidad:</h4>
      <Input bind:value={formData.nation} />
    </div>

    <div class="item">
      <h4>Profesión:</h4>
      <Input bind:value={formData.profesion} />
    </div>

    <div class="item">
      <h4>Fecha de nacimiento:</h4>
      <Input bind:value={formData.birth} type="date" />
    </div>
  </DataSection>

  <DataSection title="Información adicional" icon="blog">
    <div class="item">
      <h4>Captado por:</h4>
      <SelectSimple bind:value={formData.capturedBy} placeholder="Captado por" {options} />
    </div>

    <div class="item">
      <h4>Gestionado por:</h4>
      <SelectSimple bind:value={formData.agent} placeholder="Gestionado por" {options} />
    </div>

    <div class="item checkboxes">
      <h4>Tipo:</h4>
      <Checkbox bind:value={formData.buyer} label="Comprador" />
      <Checkbox bind:value={formData.seller} label="Vendedor" />
    </div>

    <div class="item">
      <div class="item">
        <h4>Aviso importante:</h4>
        <Input bind:value={formData.importantInfo} />
      </div>
      <br />
      <h4>Observaciones:</h4>
      <Input bind:value={formData.comments} type="textarea" />
    </div>
  </DataSection>

  <Button click={createContact}>Crear contacto</Button>
</div>
