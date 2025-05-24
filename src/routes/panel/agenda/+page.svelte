<script lang="ts">
  import type { ILabelValue } from '@/modules/shared/interfaces/ILabelValue'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'
  import type { IAgent } from '@/modules/users/interfaces/IAgent'
  import type { IEvent } from '@/modules/calendar/interfaces/IEvent'

  import CalendarComparative from '@/modules/calendar/components/CalendarComparative.svelte'
  import CalendarMonth from '@/modules/calendar/components/CalendarMonth.svelte'
  import CalendarWeek from '@/modules/calendar/components/CalendarWeek.svelte'
  import CalendarDay from '@/modules/calendar/components/CalendarDay.svelte'
  import CreateEvent from '@/modules/calendar/components/CreateEvent.svelte'
  import SelectCheckbox from '@/modules/shared/components/SelectCheckbox.svelte'
  import SelectSimple from '@/modules/shared/components/SelectSimple.svelte'
  import Input from '@/modules/shared/components/Input.svelte'

  import { formatToInputDate } from '@/modules/shared/scripts/generic'
  import { organizeByOptions } from '@/modules/calendar/constants/calendar'
  import { contacts, agents, events } from '@/store'

  let globalDate: Date = $state(new Date())
  let inputDate: string = $state(formatToInputDate(new Date()))

  let agentsOptions: ILabelValue[] = $state(
    $agents.map((agent: IAgent) => {
      return {
        label: agent.username,
        value: agent.id,
        checked: false,
      }
    })
  )

  const timeFramesOptions: ILabelValue[] = [
    /*{
      label: 'Diario',
      value: 'day',
    }, */
    {
      label: 'Semanal',
      value: 'week',
    },
    {
      label: 'Semana de 5',
      value: 'week5',
    },
    {
      label: 'Mensual',
      value: 'month',
    },
    /*{
      label: 'Comparativa',
      value: 'comparativeAgents',
    },*/
  ]

  let timeFrame: string = $state(timeFramesOptions[1].value.toString())
  let organizeBy: string = $state('')

  const updateInputDate = () => {
    inputDate = formatToInputDate(globalDate)
  }

  $effect(() => {
    $events = $events.sort((a: IEvent, b: IEvent) => {
      if (a[organizeBy] < b[organizeBy]) return -1
      if (a[organizeBy] > b[organizeBy]) return 1
      return 0
    })
  })
</script>

<style lang="scss">
  .filters {
    background-color: var(--colorNeutral);
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding-top: 20px;
    padding-bottom: 20px;

    .left {
      display: flex;
      gap: 20px;
    }

    :global(#agents-involved-select) {
      max-width: 200px;
    }

    :global(.special-item) {
      display: flex;
      gap: 5px;
      align-items: center;
    }

    :global(.special-item span) {
      border-radius: 100%;
      background-size: cover;
      background-position: center;
      width: 30px;
      height: 30px;
    }

    :global(.special-item p) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :global(#time-frames-select) {
      min-width: 150px;
    }

    :global(#input-date) {
      width: 200px;
    }
  }

  .timeframe-container {
    position: relative;
    padding-bottom: 140px;
  }
</style>

<div class="filters">
  <div class="left">
    <SelectSimple
      id="time-frames-select"
      options={timeFramesOptions}
      bind:value={timeFrame}
      placeholder="Formato"
      minWidth="200"
      hideDelete
    />
    <SelectSimple options={organizeByOptions} bind:value={organizeBy} placeholder="Organizar por" minWidth="200" />
    <SelectCheckbox bind:options={agentsOptions} placeholder="Agentes" icon="person" minWidth="250" />
  </div>
  <Input label="Fecha" bind:value={inputDate} type="date" id="date" />
</div>

<div class="timeframe-container">
  <!-- 
  {#if timeFrame === 'day'}
    <CalendarDay {events} {globalDate} {agents} />
  {/if}
  -->

  {#if timeFrame === 'week'}
    <CalendarWeek bind:globalDate {organizeBy} {updateInputDate} {agentsOptions} />
  {/if}

  {#if timeFrame === 'week5'}
    <CalendarWeek bind:globalDate {agentsOptions} {updateInputDate} simplified />
  {/if}

  {#if timeFrame === 'month'}
    <CalendarMonth bind:globalDate {agentsOptions} {updateInputDate} />
  {/if}

  <!--
  {#if timeFrame === 'comparativeAgents'}
    <CalendarComparative {events} {globalDate} {agents} />
  {/if}
  -->
</div>

<div class="g-new-btn-container">
  <CreateEvent {agentsOptions} />
</div>
