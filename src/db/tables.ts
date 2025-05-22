import { sqliteTable, primaryKey, text, integer, blob } from 'drizzle-orm/sqlite-core'

// LEAD
export const Lead = sqliteTable('Lead', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  surname: text('surname').default(''),
  email: text('email').unique(),
  phone: text('phone').unique(),
  timePreference: text('timePreference').default(''),
  contactPreference: text('contactPreference').default(''),
  context: text('context').default(''),
  message: text('message'),
  buyer: integer('buyer', { mode: 'boolean' }),
  seller: integer('seller', { mode: 'boolean' }),
})

// USER
export const User = sqliteTable('User', {
  id: text('id').primaryKey().notNull(),
  password: text('password'),
  resetToken: text('resetToken'),
  resetTokenExpiration: integer('resetTokenExpiration', { mode: 'timestamp' }),
  accountActivated: integer('accountActivated', { mode: 'boolean' }).default(false),
  roles: blob('roles', { mode: 'json' }).default([]),
})

// AGENT
export const Agent = sqliteTable('Agent', {
  id: text('id').primaryKey().notNull(),
  avatar: text('avatar'),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull().default(''),
  phone: text('phone').default(''),
  menuMinimalist: integer('menuMinimalist', { mode: 'boolean' }).default(false),
  menuMovil: blob('menuMovil', { mode: 'json' }).default(['Agenda', 'Seguimiento', 'Contactos']),
  darkMode: integer('darkMode', { mode: 'boolean' }).default(false),
  userId: text('userId').references(() => User.id),
})

// SESSION
export const Session = sqliteTable('Session', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId')
    .notNull()
    .references(() => User.id),
  expiresAt: integer('expiresAt'),
})

// PROPERTY
export const Property = sqliteTable('Property', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ref: text('ref').unique(),
  titulo: text('titulo'),
  descripcion: text('descripcion'),
  accion: text('accion'),
  tipo_ofer: text('tipo_ofer'),
  precioCompra: integer('precioCompra'),
  precioAlquiler: integer('precioAlquiler'),
  ciudad: text('ciudad'),
  provincia: text('provincia'),
  zona: text('zona'),
  cp: integer('cp'),
  orientacion: text('orientacion'),
  direccion: text('direccion'),
  latitud: integer('latitud'),
  altitud: integer('altitud'),
  tour: text('tour'),
  tourScenes: blob('tourScenes', { mode: 'json' }),
  metrosCons: integer('metrosCons'),
  metrosUtiles: integer('metrosUtiles'),
  metrosParcela: integer('metrosParcela'),
  habitaciones: integer('habitaciones'),
  banyos: integer('banyos'),
  aseos: integer('aseos'),
  conservacion: text('conservacion'),
  antiguedad: text('antiguedad'),
  planta: text('planta'),
  numplanta: integer('numplanta'),
  ascensor: integer('ascensor'),
  garajedoble: integer('garajedoble'),
  nplazasparking: integer('nplazasparking'),
  jardin: integer('jardin'),
  piscina_com: integer('piscina_com'),
  piscina_prop: integer('piscina_prop'),
  terraza: integer('terraza'),
  metrosCocina: integer('metrosCocina'),
  metrosComedor: integer('metrosComedor'),
  metrosTerraza: integer('metrosTerraza'),
  numfotos: integer('numfotos'),
  fotos: blob('fotos', { mode: 'json' }),
  energiaLetra: text('energiaLetra'),
  energiaValor: integer('energiaValor'),
  emisionesLetra: text('emisionesLetra'),
  emisionesValor: integer('emisionesValor'),
  destacado: integer('destacado'),
  opcioncompra: integer('opcioncompra'),
  aconsultar: integer('aconsultar'),
  distmar: integer('distmar'),
  gastos_com: integer('gastos_com'),
  comunidadincluida: integer('comunidadincluida'),
  habdobles: integer('habdobles'),
  fechaact: text('fechaact'),
  adaptadominus: integer('adaptadominus'),
  airecentral: integer('airecentral'),
  aire_con: integer('aire_con'),
  bar: integer('bar'),
  barbacoa: integer('barbacoa'),
  cajafuerte: integer('cajafuerte'),
  keycalefa: integer('keycalefa'),
  keysuelo: integer('keysuelo'),
  calefacentral: integer('calefacentral'),
  calefaccion: integer('calefaccion'),
  descalcificador: integer('descalcificador'),
  despensa: integer('despensa'),
  diafano: integer('diafano'),
  electro: integer('electro'),
  esquina: integer('esquina'),
  galeria: integer('galeria'),
  plaza_gara: integer('plaza_gara'),
  gasciudad: integer('gasciudad'),
  gimnasio: integer('gimnasio'),
  habjuegos: integer('habjuegos'),
  tipomensual: text('tipomensual'),
  hidromasaje: integer('hidromasaje'),
  jacuzzi: integer('jacuzzi'),
  lavanderia: integer('lavanderia'),
  linea_tlf: integer('linea_tlf'),
  luminoso: integer('luminoso'),
  ibi: integer('ibi'),
  luz: integer('luz'),
  muebles: integer('muebles'),
  ojobuey: integer('ojobuey'),
  parking: integer('parking'),
  patio: integer('patio'),
  preinstaacc: integer('preinstaacc'),
  primera_line: integer('primera_line'),
  puerta_blin: integer('puerta_blin'),
  satelite: integer('satelite'),
  sauna: integer('sauna'),
  solarium: integer('solarium'),
  sotano: integer('sotano'),
  mirador: integer('mirador'),
  apartseparado: integer('apartseparado'),
  bombafriocalor: integer('bombafriocalor'),
  buhardilla: integer('buhardilla'),
  pergola: integer('pergola'),
  tv: integer('tv'),
  terrazaacris: integer('terrazaacris'),
  todoext: integer('todoext'),
  trastero: integer('trastero'),
  urbanizacion: integer('urbanizacion'),
  vestuarios: integer('vestuarios'),
  video_port: integer('video_port'),
  vistasalmar: integer('vistasalmar'),
  cocina_inde: integer('cocina_inde'),
  keyelectricidad: integer('keyelectricidad'),
  keyfachada: integer('keyfachada'),
  keyagua: integer('keyagua'),
  keyvista: integer('keyvista'),
  keytecho: integer('keytecho'),
  montana: integer('montana'),
  rural: integer('rural'),
  costa: integer('costa'),
  vallado: integer('vallado'),
  autobuses: integer('autobuses'),
  centros_comerciales: integer('centros_comerciales'),
  tranvia: integer('tranvia'),
  zonas_infantiles: integer('zonas_infantiles'),
  colegios: integer('colegios'),
  arboles: integer('arboles'),
  hospitales: integer('hospitales'),
  tren: integer('tren'),
  metro: integer('metro'),
  estadoficha: integer('estadoficha'),
  exclu: integer('exclu'),
  keyagente: integer('keyagente'),
  golf: integer('golf'),
  chimenea: integer('chimenea'),
  depoagua: integer('depoagua'),
  alarma: integer('alarma'),
  alarmaincendio: integer('alarmaincendio'),
  alarmarobo: integer('alarmarobo'),
  arma_empo: integer('arma_empo'),
  agente: text('agente'),
  agenteEmail: text('agenteEmail'),
  agenteTelf: text('agenteTelf'),
  googleDriveFolders: blob('googleDriveFolders', { mode: 'json' }).default({}),
})

// EVENT
export const Event = sqliteTable('Event', {
  id: text('id').primaryKey().notNull(),
  title: text('title').default(''),
  description: text('description').default(''),
  status: text('status').default(''),
  type: text('type').default(''),
  repeater: text('repeater').default(''),
  duration: text('duration').default(''),
  date: integer('date'),
  agentId: text('agentId').references(() => Agent.id),
  propertyId: integer('propertyId').references(() => Property.id),
  contactId: text('contactId').references(() => User.id),
})

// EVENT_AGENT
export const EventAgent = sqliteTable(
  'EventAgent',
  {
    agentId: text('agentId').references(() => Agent.id),
    eventId: text('eventId').references(() => Event.id),
  },
  (table) => [primaryKey({ columns: [table.agentId, table.eventId] })]
)

// CONTACT
export const Contact = sqliteTable('Contact', {
  id: text('id').primaryKey().notNull(),
  avatar: text('avatar'),
  name: text('name'),
  surname: text('surname').default(''),
  email: text('email').unique().notNull().default(''),
  phone: text('phone').default(''),
  dni: text('dni').default(''),
  nation: text('nation').default(''),
  birth: text('birth').default(''),
  profesion: text('profesion').default(''),
  comments: text('comments').default(''),
  buyer: integer('buyer', { mode: 'boolean' }).default(false),
  seller: integer('seller', { mode: 'boolean' }).default(false),
  timePreference: text('timePreference').default(''),
  contactPreference: text('contactPreference').default(''),
  importantInfo: text('importantInfo').default(''),
  agent: text('agent').references(() => Agent.id),
  contactWay: text('contactWay'),
  userId: text('userId').references(() => User.id),
  process: blob('process', { mode: 'json' }),
  createdAt: integer('createdAt', { mode: 'timestamp' }),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }),
})

// SESSION_CONTACT
export const SessionContact = sqliteTable('SessionContact', {
  id: text('id').primaryKey().notNull(),
  contactId: text('contactId')
    .notNull()
    .references(() => Contact.id),
  expiresAt: integer('expiresAt'),
})

// QR_URL
export const QRUrl = sqliteTable('QRUrl', {
  code: text('code').primaryKey().notNull(),
  title: text('title').default(''),
  destiny: text('destiny').default(''),
  qrImageURL: text('qrImageURL').default(''),
  createdAt: integer('createdAt', { mode: 'timestamp' }),
})

// QR_METADATA
export const QRMetadata = sqliteTable('QRMetadata', {
  qrCode: text('qrCode')
    .notNull()
    .references(() => QRUrl.code),
  createdAt: integer('createdAt', { mode: 'timestamp' }),
  browser: text('browser'),
  os: text('os'),
})

// PACTOS
export const Pactos = sqliteTable('Pactos', {
  id: text('id').primaryKey().notNull(),
  title: text('title'),
  content: text('content'),
  contracts: blob('contracts', { mode: 'json' }).default([]),
})

// PROPERTY_CONTACT
export const PropertyContact = sqliteTable(
  'PropertyContact',
  {
    propertyId: integer('propertyId')
      .notNull()
      .references(() => Property.id),
    contactId: text('contactId')
      .notNull()
      .references(() => Contact.id),
    owner: integer('owner', { mode: 'boolean' }),
    buyer: integer('buyer', { mode: 'boolean' }),
  },
  (table) => [primaryKey({ columns: [table.propertyId, table.contactId] })]
)
