<script lang="ts">
  import type { IEvent } from '@/modules/calendar/interfaces/IEvent'
  import type { IAgent } from '@/modules/users/interfaces/IAgent'
  import type { IGrid } from '@/modules/calendar/interfaces/IGrid'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'
  import { compareHourDates, formatToInputDateTime, prettyDateLong, sumWeeks } from '@/modules/calendar/scripts/calendar'
  import { weekDays, dicTypes, eventDesigns } from '@/modules/calendar/constants/calendar'
  import Event from '@/modules/calendar/components/Event.svelte'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { currentAgent, agents, events } from '@/store'

  import { getMondayOfDate, buildHours, compareDayDates, sumDays, isInDayHour } from '@/modules/calendar/scripts/calendar'
  import type { ILabelValue } from '@/modules/shared/interfaces/ILabelValue'

  interface Props {
    globalDate?: Date
    simplified?: boolean
    organizeBy?: string
    agentsOptions?: ILabelValue[]
    contacts?: IContact[]
    updateInputDate?: Function
  }

  let {
    globalDate = $bindable(),
    simplified = false,
    organizeBy = '',
    agentsOptions = [],
    contacts = [],
    updateInputDate,
  }: Props = $props()

  const weekDays2 = ['Horas', ...weekDays]
  const hours: string[] = buildHours()
  const today: Date = new Date()

  let startingDate: Date = $state(globalDate)
  let grid: IGrid[] = $state([])

  const buildGrid = () => {
    grid = []

    if (simplified) weekDays2.splice(6, 8)

    hours.map((prettyHour: string, x: number) => {
      weekDays2.map((_, y: number) => {
        let tmpDate: Date = new Date(startingDate)

        tmpDate.setDate(startingDate.getDate() + (y - 1)) // -1 compensar desfase provocado por la columna de las horas
        tmpDate.setHours(startingDate.getHours() + x + 6, 0, 0, 0) //6am

        if (y === 0) {
          grid.push({ special: prettyHour })
          return
        }

        grid.push({
          date: tmpDate,
          events: $events.filter((ev: IEvent) => compareHourDates(new Date(ev.date), tmpDate)),
        })
      })
    })
  }

  const changeWeek = (value: number) => {
    globalDate = sumWeeks(globalDate, value)
    updateInputDate()
  }

  $effect(() => {
    const newStart = getMondayOfDate(globalDate)
    if (startingDate.getTime() !== newStart.getTime()) {
      events // provocar reactividad
      startingDate = newStart
      buildGrid()
    }
  })
</script>

<style lang="scss">
  .calenadar-week-container {
    position: relative;
    z-index: 0;
    .hide {
      display: none !important;
    }

    .header-container {
      position: sticky;
      top: -20px;
      padding-top: 20px;
      background-color: var(--colorNeutral);
      z-index: 2;

      .header {
        display: grid;
        grid-template-columns: 70px repeat(7, 1fr);
        align-items: center;
        padding: 20px 0;
        width: 100%;
        border-radius: var(--radius) var(--radius) 0 0;
        background-color: var(--colorSecondary);
        border: 1px solid var(--colorBorder);

        &.simplified {
          grid-template-columns: 70px repeat(5, 1fr);
        }

        .week-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;

          &:nth-child(1) {
            visibility: hidden;
          }

          .day-title {
            font-size: 13px;
            color: var(--colorText2);
          }

          .day-number {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            color: var(--colorText);
            aspect-ratio: 1 / 1;
            padding-bottom: 2px;
            border-bottom: 3px solid transparent;

            &.currentDay {
              border-bottom: 3px solid var(--colorPrimary);
            }
          }
        }
      }
    }
    .calendar-week {
      display: grid;
      grid-template-columns: 70px repeat(7, 1fr);
      border-radius: 0 0 var(--radius) var(--radius);
      width: 100%;
      border-top: 0;

      &.simplified {
        grid-template-columns: 70px repeat(5, 1fr);
      }

      .day {
        position: relative;
        width: 100%;
        padding: 5px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--colorNeutral);

        &.special {
          display: flex;
          justify-content: center;
          padding: 0;
          padding-top: 4px;
          height: 100%;
          color: var(--colorText2);
          font-size: 14px;
        }

        &.currentDayWeek {
          background-color: var(--colorNeutral);
          border-bottom: 1px solid var(--colorSecondary);
        }

        &:not(.special) {
          border-left: 1px solid var(--colorBorder);
        }

        .hour-line {
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          top: -1px;
          background-color: var(--colorPrimary);

          &::before {
            content: '';
            position: absolute;
            left: -8px;
            top: -5px;
            width: 12px;
            height: 12px;
            border-radius: 100%;
            background-color: var(--colorPrimary);
          }
        }

        .organized-type,
        .organized-agent {
          display: flex;
          align-items: center;
          gap: 5px;
          margin: 10px 0;
          font-weight: bold;
        }
      }
    }
  }
</style>

<div class="calenadar-week-container">
  <div class="g-the-date">
    <button class="timeline-position pre" onclick={() => changeWeek(-1)}>
      <Svg name="arrow" fill="var(--colorText2)" />
    </button>
    <span>
      {prettyDateLong(globalDate)}
    </span>
    <button class="timeline-position post" onclick={() => changeWeek(1)}>
      <Svg name="arrow" fill="var(--colorText2)" />
    </button>
  </div>

  <div class="header-container">
    <div class="header" class:simplified>
      {#each weekDays2 as weekDay, i}
        <div class="week-day" class:hide={simplified && (i == 6 || i == 7)}>
          <div class="day-title">
            {weekDay}
          </div>
          <div class="day-number" class:currentDay={compareDayDates(sumDays(startingDate, i), today)}>
            {sumDays(startingDate, i).getDate()}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="calendar-week g-box" class:simplified>
    {#each grid as cell, i}
      <div
        class="day"
        class:special={cell.special}
        class:currentDayWeek={compareDayDates(sumDays(startingDate, new Date(cell.date).getDay()), today)}
      >
        {#if !cell.special && isInDayHour(cell.date)}
          <div class="hour-line"></div>
        {/if}

        {#if cell.special}
          {cell.special}
        {:else}
          {#each cell.events as event, i}
            {#if organizeBy === 'type' && event.type != cell.events[i - 1]?.type}
              <div class="organized-type">
                <Svg name={eventDesigns[event.type].icon} />
                {dicTypes[event.type]}
              </div>
            {/if}

            {#if organizeBy === 'agent' && event.agent != cell.events[i - 1]?.agent}
              <div class="organized-agent">
                {$agents.find((a: IAgent) => event.agent === a.id).username}
              </div>
            {/if}
            <Event {event} {contacts} {agentsOptions} />
          {/each}
        {/if}
      </div>
    {/each}
  </div>
</div>
