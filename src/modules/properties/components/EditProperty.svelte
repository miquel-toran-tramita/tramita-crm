<script lang="ts">
  import Input from '@/modules/shared/components/Input.svelte'
  import Section from '@/modules/shared/components/Section.svelte'
  import SelectSimple from '@/modules/shared/components/SelectSimple.svelte'
  import Checkbox from '@/modules/shared/components/Checkbox.svelte'
  import AccumulableCards from '@/modules/shared/components/AccumulableCards.svelte'
  import AccumulableCard from '@/modules/shared/components/AccumulableCard.svelte'

  const propertyData = $state({
    titulo: '',
    descripcion: '',
    accion: '',
    tipo_ofer: '',
    precioCompra: null,
    precioAlquiler: null,
    ciudad: '',
    provincia: '',
    zona: '',
    cp: null,
    orientacion: '',
    direccion: '',
    latitud: null,
    altitud: null,
    tour: '',
    metrosCons: null,
    metrosUtiles: null,
    metrosParcela: null,
    habitaciones: null,
    banyos: null,
    aseos: null,
    conservacion: '',
    antiguedad: '',
    planta: '',
    numplanta: null,
    ascensor: false,
    garajedoble: null,
    nplazasparking: null,
    jardin: false,
    piscina_com: false,
    piscina_prop: null,
    terraza: null,
    metrosCocina: null,
    metrosComedor: null,
    metrosTerraza: null,
    numfotos: null,
    energiaLetra: '',
    energiaValor: null,
    emisionesLetra: '',
    emisionesValor: null,
    destacado: null,
    opcioncompra: null,
    aconsultar: null,
    distmar: null,
    gastos_com: null,
    comunidadincluida: null,
    habdobles: null,
    fechaact: '',
    adaptadominus: null,
    airecentral: false,
    aire_con: null,
    bar: null,
    barbacoa: null,
    cajafuerte: null,
    keycalefa: null,
    keysuelo: null,
    calefacentral: null,
    calefaccion: null,
    descalcificador: null,
    despensa: null,
    diafano: null,
    electro: null,
    esquina: null,
    galeria: null,
    plaza_gara: null,
    gasciudad: null,
    gimnasio: false,
    habjuegos: null,
    tipomensual: '',
    hidromasaje: null,
    jacuzzi: null,
    lavanderia: null,
    linea_tlf: null,
    luminoso: null,
    ibi: null,
    luz: null,
    muebles: null,
    ojobuey: null,
    parking: null,
    patio: null,
    preinstaacc: null,
    primera_line: null,
    puerta_blin: null,
    satelite: null,
    sauna: null,
    solarium: null,
    sotano: null,
    mirador: null,
    apartseparado: null,
    bombafriocalor: null,
    buhardilla: null,
    pergola: null,
    tv: null,
    terrazaacris: null,
    todoext: null,
    trastero: null,
    urbanizacion: null,
    vestuarios: null,
    video_port: null,
    vistasalmar: null,
    cocina_inde: null,
    keyelectricidad: null,
    keyfachada: null,
    keyagua: null,
    keyvista: null,
    keytecho: null,
    montana: null,
    rural: null,
    costa: null,
    vallado: null,
    autobuses: null,
    centros_comerciales: false,
    tranvia: null,
    zonas_infantiles: null,
    colegios: false,
    arboles: null,
    hospitales: null,
    tren: null,
    metro: null,
    estadoficha: null,
    exclu: null,
    keyagente: null,
    golf: null,
    chimenea: null,
    depoagua: null,
    alarma: null,
    alarmaincendio: null,
    alarmarobo: null,
    arma_empo: null,
    agente: '',
    agenteEmail: '',
    agenteTelf: '',
  })

  const typeOpOptions = ['Vender', 'Alquiler', 'Combinada', 'Traspaso']

  const typePropertyOptions = ['Apartamento', 'Casa', 'Local', 'Piso', 'Garaje']

  const typeOrientationOptions = ['Norte', 'Sur', 'Este', 'Oeste']

  const typeConservationOptions = [
    'Para entrar y vivir',
    'A reformar',
    'Origen',
    'Buenas condiciones',
    'Semi nuevo',
    'En construcción',
    'Obra nueva',
  ]
</script>

<style lang="scss">
  .sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
    gap: 20px;

    .dato {
      padding: 20px 0;

      label {
        font-size: 14px;
      }
    }

    .checkbox-data {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
    }
  }
</style>

<div class="sections">
  <AccumulableCards>
    <AccumulableCard title="Datos principales" icon="apartment">
      <SelectSimple placeholder="Tipo de operación*" options={typeOpOptions} bind:value={propertyData.accion} />
      <SelectSimple placeholder="Tipo de propiedad*" options={typePropertyOptions} bind:value={propertyData.tipo_ofer} />
      <SelectSimple placeholder="Estado de conservación" options={typeConservationOptions} bind:value={propertyData.conservacion} />
      <SelectSimple placeholder="Orientación" options={typeOrientationOptions} bind:value={propertyData.orientacion} />
    </AccumulableCard>

    <AccumulableCard title="Distribución" icon="bed">
      <Input bind:value={propertyData.habdobles} label="Habitaciones dobles" />
      <Input bind:value={propertyData.habitaciones} label="Habitaciones simples" />
      <Input bind:value={propertyData.banyos} label="Baños" />
      <Input bind:value={propertyData.aseos} label="Aseos" />
      <Input bind:value={propertyData.numplanta} label="Plantas" />
    </AccumulableCard>

    <AccumulableCard title="Superficies" icon="size">
      <Input bind:value={propertyData.metrosCons} label="Metros construidos" sufix="m²" />
      <Input bind:value={propertyData.metrosUtiles} label="Metros útiles" sufix="m²" />
      <Input bind:value={propertyData.metrosParcela} label="Metros de parcela" sufix="m²" />
      <Input bind:value={propertyData.metrosCocina} label="Metros de cocina" sufix="m²" />
      <Input bind:value={propertyData.metrosComedor} label="Metros de comedor" sufix="m²" />
    </AccumulableCard>

    <AccumulableCard title="Localización" icon="homePin">
      <Input bind:value={propertyData.ciudad} label="Ciudad" />
      <Input bind:value={propertyData.provincia} label="Provincia" />
      <Input bind:value={propertyData.zona} label="Zona" />
      <Input bind:value={propertyData.direccion} label="Dirección" />
      <Input bind:value={propertyData.cp} label="Código Postal" />
    </AccumulableCard>

    <AccumulableCard title="Calidades" icon="verify">
      <div class="checkbox-data">
        <Checkbox bind:value={propertyData.ascensor} />
        <label for="">Ascensor</label>
      </div>
      <div class="checkbox-data">
        <Checkbox bind:value={propertyData.jardin} />
        <label for="">Jardín</label>
      </div>
      <div class="checkbox-data">
        <Checkbox bind:value={propertyData.piscina_com} />
        <label for="">Piscina comunitaria</label>
      </div>
      <div class="checkbox-data">
        <Checkbox bind:value={propertyData.airecentral} />
        <label for="">Aire acondicionado central</label>
      </div>
      <div class="checkbox-data">
        <Checkbox bind:value={propertyData.gimnasio} />
        <label for="">Gimnasio</label>
      </div>
    </AccumulableCard>

    <AccumulableCard title="Entornos" icon="tree">
      <div class="checkbox-data">
        <Checkbox bind:value={propertyData.colegios} />
        <label for="">Colegios</label>
      </div>
      <div class="checkbox-data">
        <Checkbox bind:value={propertyData.centros_comerciales} />
        <label for="">Centros comerciales</label>
      </div>
    </AccumulableCard>

    <AccumulableCard title="Eficiencia Energética" icon="energy">
      <SelectSimple options={['A', 'B', 'C', 'D', 'E', 'F', 'G']} bind:value={propertyData.energiaLetra} />
      <Input bind:value={propertyData.energiaValor} sufix="kW h/m2" />

      <SelectSimple options={['A', 'B', 'C', 'D', 'E', 'F', 'G']} bind:value={propertyData.emisionesLetra} />
      <Input bind:value={propertyData.emisionesValor} sufix="Kg CO2/m2" />
    </AccumulableCard>

    <AccumulableCard title="Web y portales" icon="link">
      <Input bind:value={propertyData.tour} label="Tour Virtual" />
      <Input bind:value={propertyData.numfotos} label="Número de fotos" />
    </AccumulableCard>

    <AccumulableCard title="Datos Internos" icon="logo">
      <Input bind:value={propertyData.fechaact} label="Fecha de actualización" type="date" />
      <Input bind:value={propertyData.estadoficha} label="Estado de ficha" />
    </AccumulableCard>

    <AccumulableCard title="Propietario" icon="person">
      <Input bind:value={propertyData.agente} label="Nombre del agente" />
      <Input bind:value={propertyData.agenteEmail} label="Email del agente" />
      <Input bind:value={propertyData.agenteTelf} label="Teléfono del agente" />
    </AccumulableCard>
  </AccumulableCards>
</div>
