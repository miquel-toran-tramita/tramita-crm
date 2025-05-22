<script lang="ts">
  import type { IEvent } from '@/modules/calendar/interfaces/IEvent'
  import type { IAgent } from '@/modules/users/interfaces/IAgent'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { weekDays, monthNames } from '@/modules/calendar/constants/calendar'
  import Event from '@/modules/calendar/components/Event.svelte'
  import { compareDayDates } from '@/modules/calendar/scripts/calendar'
  import type { IContact } from '@/modules/contacts/interfaces/IContact'
  import type { ILabelValue } from '@/modules/shared/interfaces/ILabelValue'

  interface IDayData {
    date: Date
    events: IEvent[]
  }
  interface Props {
    events?: IEvent[]
    globalDate?: Date
    agents?: IAgent[]
    creator: IAgent
    contacts?: IContact[]
    agentsOptions?: ILabelValue[]
    updateInputDate?: Function
  }

  let { events = [], globalDate = $bindable(), updateInputDate, agentsOptions = [], contacts = [], agents = [], creator }: Props = $props()

  const currentDate: Date = new Date()
  const currentDay: number = currentDate.getDate()
  const currentMonth: number = currentDate.getMonth()
  const currentYear: number = currentDate.getFullYear()

  let monthDate: Date = $state(new Date())
  let monthArray: IDayData[] = $state([])

  const refreshMonth = () => {
    monthArray = []

    const firstDayMonth: Date = new Date(monthDate.getFullYear(), monthDate.getMonth())
    const firstWeekDayMonth: number = firstDayMonth.getDay() === 0 ? 7 : firstDayMonth.getDay()
    const firstArrayDay: Date = new Date(monthDate.getFullYear(), monthDate.getMonth(), firstDayMonth.getDate() - firstWeekDayMonth)

    for (let x = 0; x < 42; x++) {
      const dayItem: IDayData = {
        date: new Date(firstArrayDay.setDate(firstArrayDay.getDate() + 1)),
        events: [],
      }

      dayItem.events = events.filter((event: IEvent) => compareDayDates(new Date(event.date), dayItem.date))

      monthArray.push(dayItem)
    }
  }

  const changeMonth = (value: number) => {
    monthDate = new Date(monthDate.setMonth(monthDate.getMonth() + value))
    refreshMonth()

    globalDate = monthDate
    updateInputDate()
  }

  const isToday = (date: Date): boolean => {
    return date.getDate() == currentDay && monthDate.getMonth() == currentMonth && monthDate.getFullYear() == currentYear
  }

  refreshMonth()
</script>

<style lang="scss">
  .calenadar-month-container {
    position: relative;
    z-index: 0;
    .header-container {
      position: sticky;
      top: -20px;
      padding-top: 20px;
      background-color: var(--colorNeutral);

      z-index: 2;

      .header {
        display: grid;
        align-items: center;
        grid-template-columns: repeat(7, 1fr);
        width: 100%;
        height: 60px;
        border-radius: var(--radius) var(--radius) 0 0;
        border-bottom: 0;

        .week-day {
          font-size: 13px;
          text-align: center;
          color: var(--colorText2);
        }
      }
    }

    .grid {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      border: 1px solid var(--colorBorder);
      border-radius: 0 0 var(--radius) var(--radius);
      background-color: var(--colorBorder);

      .section {
        transition: 0.3s ease;
        position: relative;
        padding: 5px;
        padding-bottom: 35px;
        min-height: 100px;
        background-color: var(--colorSecondary);

        display: flex;
        flex-direction: column;

        &:nth-child(42) {
          border-radius: 0 0 var(--radius) 0;
        }

        &:nth-child(36) {
          border-radius: 0 0 0 var(--radius);
        }

        &.today {
          .day-number {
            color: var(--colorPrimary);
            font-weight: bold;
          }
        }

        .day-number {
          position: absolute;
          bottom: 5px;
          right: 10px;
        }

        &:hover {
          .day-number {
            cursor: default;
            color: var(--colorPrimary);
          }
        }

        .day-number.notMonth {
          color: var(--colorText2);
        }
      }
    }
  }
</style>

<div class="calenadar-month-container">
  <div class="g-the-date">
    <button class="timeline-position pre" onclick={() => changeMonth(-1)}>
      <Svg name="arrow" fill="var(--colorText2)" />
    </button>
    <span>
      {monthNames[globalDate.getMonth()]}
    </span>
    <button class="timeline-position post" onclick={() => changeMonth(1)}>
      <Svg name="arrow" fill="var(--colorText2)" />
    </button>
  </div>

  <div class="table">
    <div class="header-container">
      <div class="header g-box">
        {#each weekDays as weekDay, i}
          <div class="week-day">
            {weekDay}
          </div>
        {/each}
      </div>
    </div>

    <div class="grid">
      {#each monthArray as dayItem}
        <div class="section" class:today={isToday(dayItem.date)}>
          <div class="day-number" class:notMonth={dayItem.date.getMonth() != monthDate.getMonth()}>{dayItem.date.getDate()}</div>

          {#each dayItem.events as event}
            <Event {event} {contacts} {agents} {events} {creator} {agentsOptions} slim />
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
