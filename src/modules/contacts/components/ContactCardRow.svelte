<script lang="ts">
  import type { IContact } from '../interfaces/IContact'

  interface Props {
    contact: IContact;
    slim?: boolean;
  }

  let { contact, slim = false }: Props = $props();
</script>

<style lang="scss">
  .agent-card {
    transition: 0.3s ease;
    height: 70px;
    display: flex;
    align-items: center;
    backdrop-filter: blur(10px);
    gap: 15px;

    &.slim {
      height: 60px;

      &:hover {
        transform: scale(0.9);
        border: 1px solid var(--colorBorder);
      }
    }

    &:hover {
      transform: translateX(20px);
      border: 1px solid var(--colorPrimary);
    }

    .avatar {
      height: 100%;
      width: 60px;
      overflow: hidden;
      border-radius: var(--radius) 0 0 var(--radius);
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .title {
      text-align: left;
    }

    .contact-info {
      font-size: 13px;
      text-align: left;

      color: var(--colorText2);
    }
  }
</style>

<div class="agent-card g-box" class:slim>
  <div class="avatar">
    <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${contact.avatar}`} alt="" />
  </div>

  <div class="info">
    <div class="title">{contact.name}</div>
    <div class="contact-info">
      {contact.phone} ~ {contact.email}
    </div>
  </div>
</div>
