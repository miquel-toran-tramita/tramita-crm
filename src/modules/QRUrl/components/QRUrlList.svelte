<script lang="ts">
  import Modal from '@/modules/shared/components/Modal.svelte'
  import NewQrUrl from '@/modules/QRUrl/components/NewQRUrl.svelte'
  import Button from '@/modules/shared/components/Button.svelte'
  import type { IQRUrlItem } from '@/modules/QRUrl/interfaces/IQRUrlItem'
  import { formatToInputDate } from '@/modules/shared/scripts/generic'
  import Svg from '@/modules/shared/components/Svg.svelte'
  import { api } from '@/modules/shared/scripts/api'

  let closed: boolean = $state(true)

  interface Props {
    QRUrlItems?: IQRUrlItem[]
  }

  let { QRUrlItems = [] }: Props = $props()

  const fetchQRList = async () => {
    QRUrlItems = (await api.get('/api/private/qr-redirect')).data
  }
</script>

<style lang="scss">
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, 300px);
    gap: 20px;
    .qr-url-item-card {
      transition: 0.3s ease;
      max-width: 400px;
      min-height: 300px;
      background-repeat: no-repeat;
      background-size: cover;
      overflow: hidden;
      display: flex;
      align-items: flex-end;

      &:hover {
        transform: scale(0.9);

        .info {
          transform: translateY(60px);
        }
      }

      .info {
        transition: 0.3s ease;
        background-color: var(--colorSecondary);
        background: linear-gradient(5deg, var(--colorSecondary) 0%, var(--colorSecondary) 60%, rgba(255, 255, 255, 0) 90%);
        padding: 20px;
        width: 100%;
        .destiny {
          width: 100%;
          font-size: 12px;
          white-space: nowrap; /* Evita saltos de línea */
          overflow: hidden; /* Oculta el texto que se desborda */
          text-overflow: ellipsis; /* Agrega "..." al final */
        }

        .title {
          color: var(--colorPrimary);
          font-weight: bold;
          width: 100%;
          font-size: 20px;
          padding-bottom: 20px;
          padding-top: 50px;

          .counter {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--colorPrimary);
            font-size: 14px;
          }
        }

        .date {
          color: var(--colorText2);
          width: 100%;
        }
      }
    }
  }
</style>

<div class="qr-url-list-container">
  <div class="cards">
    {#each QRUrlItems as QRUrlItem}
      <a href="/espacio-qr/{QRUrlItem.code}" class="qr-url-item-card g-box" style="background-image: url({QRUrlItem.qrImageURL})">
        <div class="info">
          <h3 class="title">
            <div class="counter">
              {QRUrlItem.metadataCount}
              <Svg name="eye" fill="var(--colorPrimary)" width="20" height="20" />
            </div>
            {QRUrlItem.title}
          </h3>

          <div class="date">
            {formatToInputDate(new Date(QRUrlItem.createdAt))}
          </div>

          <div class="destiny">
            {QRUrlItem.destiny}
          </div>
        </div>
      </a>
    {/each}
  </div>

  <div class="g-new-btn-container">
    <Button icon="qrAdd" type="circle" click={() => (closed = false)} />
  </div>

  <Modal bind:closed>
    {#snippet modalHeader()}
      <div slot="modal-header">Crear nuevo QR</div>
    {/snippet}

    {#snippet modalContent()}
      <div slot="modal-content">
        <NewQrUrl bind:closed onNewQR={fetchQRList} />
      </div>
    {/snippet}
  </Modal>
</div>
