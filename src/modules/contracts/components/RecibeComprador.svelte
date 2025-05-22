<script lang="ts">
  import { prettyDate } from '@/modules/calendar/scripts/calendar.ts'
  import PDFHeader from '@/modules/shared/components/PDFHeader.svelte'
  import PDFPreview from '@/modules/shared/components/PDFPreview.svelte'

  import Input from '@/modules/shared/components/Input.svelte'
  import { numberToWord, checkDNI } from '@/modules/contracts/scripts/contracts'
  import { formatPrice } from '@/modules/shared/scripts/generic'
  import type { IPacto } from '../interfaces/IPacto'
  import Checkbox from '@/modules/shared/components/Checkbox.svelte'
  import SelectSimple from '@/modules/shared/components/SelectSimple.svelte'
  import type { IFolderStructure } from '@/sync/interfaces/IProperty'
  import type { ILabelValue } from '@/modules/shared/interfaces/ILabelValue'

  interface Props {
    pactos: IPacto[]
    properties: { ref: string; titulo: string; googleDriveFolders: IFolderStructure }[]
  }

  let { pactos = [], properties = [] }: Props = $props()

  let name: string = $state('')
  let dni: string = $state('')
  let address: string = $state('')
  let booking: number = $state()
  let totalPrice: number = $state()
  let propertyAddress: string = $state('')

  // price
  let reserve: string = $state()
  let arras: string = $state()
  let price: string = $state()
  let arrasDate: Date = $state()
  let priceDate: Date = $state()
  let signatureDate: Date = $state()
  let activePactos: IPacto[] = $state([])
  let propertyRef: string = $state('')

  let bookingText: string = $derived(`${numberToWord(booking)} (${formatPrice(booking)} €)`)
  let totalPriceText: string = $derived(`${numberToWord(totalPrice)} (${formatPrice(totalPrice)} €)`)

  const pdfName: string = $derived(`Contrato_Comprador_${address}`)

  const togglePactos = (pacto: IPacto) => {
    const exists = activePactos.some((p) => p.id === pacto.id)

    if (exists) {
      activePactos = activePactos.filter((p) => p.id !== pacto.id)
      return
    }

    activePactos.push(pacto)
  }

  const options: ILabelValue[] = properties
    .sort((a, b) => b.ref.localeCompare(a.ref))
    .map((property) => ({
      label: `${property.ref} - ${property.titulo}`,
      value: property.ref,
    }))

  const folderId = $derived(
    properties
      .find((property) => property.ref === propertyRef)
      ?.googleDriveFolders?.subfolders.find((folder) => folder.name === 'Contratos')?.id
  )
</script>

<style lang="scss">
  .contract-recibe-comprador {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 50px;

    .inputs {
      padding-top: 10px;
      max-width: 600px;

      h2 {
        font-size: 20px;
        padding-top: 40px;
      }

      :global(.select-simple) {
        font-size: 14px;
      }

      .comprador-inputs {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 0 20px;
      }

      .precio-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 20px;
      }
    }

    .pactos {
      display: flex;
      padding: 10px 0;
      gap: 10px;

      .pacto {
        display: flex;
        align-items: center;
        gap: 10px;

        span {
          font-size: 14px;
        }
      }
    }
  }
</style>

<div class="contract-recibe-comprador g-contract">
  <div class="inputs">
    <SelectSimple placeholder="Selecciona una operación" bind:value={propertyRef} {options}></SelectSimple>

    <h2>Datos del comprador</h2>

    <div class="comprador-inputs">
      <Input bind:value={name} label="Nombre"></Input>
      <Input bind:value={dni} label="DNI o NIE" error={dni && !checkDNI(dni)} errorMessage={'¡El DNI o NIE no es correcto!'}></Input>
      <Input bind:value={address} label="Domicilio"></Input>
      <Input bind:nValue={booking} label="Cantidad reserva" type="currency" sufix="€"></Input>
    </div>

    <h2>Objeto</h2>
    <Input bind:value={propertyAddress} label="Dirección de la finca"></Input>

    <h2>Precio</h2>
    <div class="precio-inputs">
      <Input bind:nValue={totalPrice} label="Precio total" type="currency" sufix="€"></Input>
      <Input bind:value={reserve} label="Reserva" type="currency" sufix="€"></Input>
      <Input bind:value={arras} label="Arras" type="currency" sufix="€"></Input>
      <Input bind:dateValue={arrasDate} label="Fecha arras" type="date"></Input>
      <Input bind:value={price} label="Precio escritura" type="currency" sufix="€"></Input>
      <Input bind:dateValue={priceDate} label="Fecha escritura" type="date"></Input>
    </div>

    <h2>Pactos</h2>
    <div class="pactos">
      {#each pactos as pacto}
        <div class="pacto">
          <Checkbox input={() => togglePactos(pacto)}></Checkbox>
          <span>{pacto.title}</span>
        </div>
      {/each}
    </div>

    <h2>Firma</h2>
    <Input bind:dateValue={signatureDate} label="Fecha de la firma" type="date"></Input>
  </div>

  <PDFPreview {pdfName} {folderId}>
    {#snippet header()}
      <PDFHeader title="Contrato del comprador" />
    {/snippet}

    <p>
      Actuando en nombre y representación de la propiedad, por encontrarse debidamente facultada, Tramita Ecosistema Inmobiliario S.L., con
      NIF: B1982179, representada por su propietario, Javier Jiménez Ruiz, con DNI 53337064H, recibe de: <span class="highlight"
        >{name}</span
      >, mayor de edad y con DNI: <span class="highlight">{dni}</span>, con domicilio en <span class="highlight">{address}</span>, la
      cantidad de <span class="highlight">{bookingText}</span> a cuenta del precio total de la presente Compra-Venta, que les será devuelto al
      formalizar el contrato de Arras.
    </p>

    <h5>Objeto:</h5>
    <p>
      El objeto de este compromiso es la reserva de la finca en {propertyAddress}
    </p>

    <h5>El precio:</h5>

    <p class="bold">El precio es de {totalPriceText} a satisfacer de la siguiente forma:</p>

    <div class="row">
      <p>En este acto y en concepto de reserva:</p>
      <p>{reserve} €</p>
    </div>

    <div class="row">
      <p>Al formalizar el contrato de Arras Penitenciales, Como término máximo el día {prettyDate(arrasDate)}:</p>
      <p>{arras} €</p>
    </div>

    <div class="row">
      <p>Al formalizar la escritura pública, como Termino máximo el día {prettyDate(priceDate)}:</p>
      <p>{price} €</p>
    </div>

    <div class="row">
      <p class="bold">Total importe:</p>
      <p class="bold">{formatPrice(totalPrice)} €</p>
    </div>

    <h5>Pactos:</h5>

    {#each activePactos as pacto}
      <p class="nine">
        {pacto.content}
      </p>
    {/each}

    <h5>Ley de Protección de Datos:</h5>
    <p class="nine">
      Su privacidad y la salvaguarda de su intimidad es lo más importante para nosotros. En cumplimiento de lo que dispone el Reglamento
      (UE) 2016/679 de 27 de abril de 2016 (RGPD) y demás normativa vigente en materia de protección de datos, le informamos que los datos
      personales aportados serán tratados por Javier Jiménez Ruiz (Responsable del Tratamiento), con número de agente inmobiliario Aicat
      14279. La finalidad del tratamiento de los datos será el mantenimiento, desarrollo, control y ejecución de la relación contractual
      que, en el marco de la prestación de los servicios que se identifican en el objeto del contrato, mantenga con Javier Jiménez Ruiz. Los
      datos facilitados por usted se incorporarán en una base de datos protegida para atender la gestión ordinaria de la actividad
      inmobiliaria y gestión de fincas y se conservarán mientras dure la relación con Ud. Una vez cumplida esta prestación, los datos de
      carácter personal se guardarán como Información del mercado inmobiliario, debidamente bloqueados, según lo que establezca la normativa
      sectorial vigente. No está prevista la cesión de datos a terceros excepto si existe una obligación legal. Para la formalización de la
      compraventa, la información del presente contrato se cederá a los propietarios del inmueble a fin de explicitarles la oferta
      vinculante a la compraventa.
    </p>

    <p class="nine">
      Se informa al interesado que tiene derecho a retirar el consentimiento para tratar los datos en cualquier momento y que, si ejerce
      este derecho, se tendrá que proceder a la rescisión del contrato en los términos expuestos en el mismo puesto que el tratamiento de
      datos es imprescindible para la ejecución del contrato. Asimismo, podrá ejercer los derechos de acceso, rectificación, supresión y
      portabilidad de sus datos y los de limitación u oposición al tratamiento dirigiéndose a Javier Jiménez Ruiz con domicilio a Milà i
      Fontanals, 34, local 2, 08922 Santa Coloma de Gramenet, (Barcelona) o enviando un correo electrónico a comercial@tramita.info. Si
      considera que el tratamiento de datos personales no se ajusta a la normativa vigente, tiene derecho a presentar una reclamación ante
      la Autoridad de control (www.agpd.es).
    </p>

    <p class="nine">
      Javier Jiménez Ruiz se responsabiliza de tener implantadas las medidas de seguridad que correspondan, en virtud de lo que se establece
      en la normativa vigente de protección de datos. Igualmente, todo su personal tendrá conocimiento de la normativa en materia de
      protección de datos, en el momento en que proceda a tratar la información propiedad del cliente.
    </p>

    <h5>Firma:</h5>

    <div class="row">
      <p>Fdo. Javier Jiménez Ruiz, Administrador Gerente.</p>
      <p>Fdo. {name}, Comprador.</p>
    </div>

    <p class="firma-disclaimer">Lo firman por duplicado y a un solo efecto en Santa Coloma de Gramenet, a {prettyDate(signatureDate)}.</p>
  </PDFPreview>
</div>
