<script lang="ts">
  import type { IEvent } from '@/modules/calendar/interfaces/IEvent'
  import type { IAgent } from '@/modules/users/interfaces/IAgent'
  import type { ILabelValue } from '@/modules/shared/interfaces/ILabelValue'
  import { dicDuration, dicTypes, dicRepeater, dicStatus, eventDesigns } from '@/modules/calendar/constants/calendar'
  import { prettyDate } from '@/modules/calendar/scripts/calendar'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import ModalEvent from './ModalEvent.svelte'

  import type { IContact } from '@/modules/contacts/interfaces/IContact'

  interface Props {
    contacts?: IContact[]
    agentsOptions?: ILabelValue[]
    event: IEvent
    slim?: boolean
  }

  let { contacts = [], agentsOptions = [], event, slim }: Props = $props()

  const date: Date = new Date(event.date)
  const horas = date.getHours()
  const minutos = date.getMinutes()

  const horaFormateada = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`

  const duration: string = dicDuration[event.duration]
  const type: string = dicTypes[event.type]
  const repeater: string = dicRepeater[event.repeater]
  const status: string = dicStatus[event.status]

  const design = eventDesigns[event.type]

  let hovered: boolean = $state(false)
  let timeoutId

  const onHover = () => {
    timeoutId = setTimeout(() => (hovered = true), 500)
  }

  const onUnhover = () => {
    clearInterval(timeoutId)
    hovered = false
  }

  let closed: boolean = $state(true)
</script>

<style lang="scss">
  .pfp {
    border-radius: 100%;
    aspect-ratio: 1 / 1;
    border: 2px solid;
  }

  .box {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: space-between;
  }

  .event {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .event-big {
      border: 1px solid;
      padding: 10px;
      border-radius: var(--radius);
      position: absolute;
      background-color: var(--colorSecondary);
      z-index: 99;
      top: 60px;
      display: none;
      flex-direction: column;
      width: 100%;
      gap: 20px;

      &.slim {
        top: 35px;
      }

      .type,
      .status {
        position: absolute;
        bottom: 5px;
        right: 10px;
        font-size: 12px;
        color: var(--colorText2);
      }

      .status {
        left: 10px;
        right: unset;
      }

      .title {
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 5px;
      }

      .description {
        padding-bottom: 20px;
        font-size: 12px;
      }
    }

    .event-little {
      padding: 5px;
      border-radius: var(--radius);
      display: flex;
      gap: 10px;
      align-items: center;
      border-width: 1px;
      border-style: solid;
      width: 100%;
      margin-bottom: 5px;
      text-overflow: ellipsis;

      &.slim {
        .details {
          flex-direction: row-reverse;
        }
      }

      .title {
        font-size: 14px;
        font-weight: bold;
      }

      .pfp {
        height: 50px;
        background-size: cover;
        background-position: center;
        border-radius: 8px;
      }

      .details {
        display: flex;
        flex-direction: column;
        gap: 5px;
        text-align: left;

        .time {
          font-size: 13px;
          color: plum;
          display: flex;
          align-items: center;
          gap: 2px;
        }
      }
    }
    &.hovered {
      .event-big {
        display: flex;
      }
    }
  }
</style>

<div
  class="event"
  class:hovered
  onmouseover={onHover}
  onmouseout={onUnhover}
  onfocus={onHover}
  onblur={onUnhover}
  role="button"
  tabindex="0"
>
  <div class="event-big" class:slim style="border-color: {design?.color};">
    <div class="info">
      <h3 class="title" style="color: {design?.color};">{event?.title}</h3>
      <div class="description">
        {event?.description}
      </div>

      <div class="status">{status}</div>
      <div class="type">{type}</div>
    </div>
  </div>

  <button class="event-little" class:slim style="border-color: {design?.color}; background: {design?.bg};" onclick={() => (closed = false)}>
    <!-- <div class="pfp" style="border-color: {design.color}; background-image: url('{creator?.avatar}')"></div> -->
    <div class="details">
      <h4 class="title">
        {event?.title}
      </h4>
      <div class="time" style="color: {design?.color};">
        <Svg name={design?.icon} fill={design?.color} height="16" width="16" />
        {horaFormateada}
        {#if !slim}
          <span style="color: {design?.color};"> ~ {duration}</span>
        {/if}
      </div>
    </div>
  </button>
</div>

<ModalEvent bind:closed updateEventId={event?.id} {contacts} {agentsOptions} />
