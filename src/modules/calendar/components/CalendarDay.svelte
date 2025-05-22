<script lang="ts">
  import type { IEvent } from '@/modules/calendar/interfaces/IEvent'
  import type { IAgent } from '@/modules/users/interfaces/IAgent'
  import Event from '@/modules/calendar/components/Event.svelte'

  interface Props {
    events?: IEvent[]
    agents?: IAgent[]
    globalDate?: Date
  }

  let { events = [], agents = [], globalDate = $bindable() }: Props = $props()
</script>

<style lang="scss">
  .calendar-day-container {
  }
</style>

<div class="calendar-day-container">day</div>
