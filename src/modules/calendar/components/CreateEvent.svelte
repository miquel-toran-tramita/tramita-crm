<script lang="ts">
  import type { IContact } from '@/modules/contacts/interfaces/IContact'
  import type { IAgent } from '@/modules/users/interfaces/IAgent'
  import type { IEvent } from '@/modules/calendar/interfaces/IEvent'

  import ModalEvent from '@/modules/calendar/components/ModalEvent.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import type { ILabelValue } from '@/modules/shared/interfaces/ILabelValue'

  interface Props {
    contacts?: IContact[]
    agentsOptions?: ILabelValue[]
    creator: IAgent
    events: IEvent[]
  }

  let { contacts = [], agentsOptions = [], creator, events = $bindable() }: Props = $props()

  let closed: boolean = $state(true)
</script>

<Button icon="calendarAdd" type="circle" click={() => (closed = false)}></Button>

<ModalEvent bind:events bind:closed {contacts} {creator} {agentsOptions} />
