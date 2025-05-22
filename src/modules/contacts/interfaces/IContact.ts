export interface IContact {
  id?: string
  name: string
  avatar?: string
  email: string
  phone: string
  dni: string
  nation?: string
  birth?: string
  profesion?: string
  comments?: string
  importantInfo?: string
  timePreference?: string
  contactPreference?: string
  agent?: any // Requerido, referencia a User.id
  capturedBy?: any // Requerido, referencia a User.id
  password?: string
  accountActivated?: boolean
  buyer?: boolean
  seller?: boolean
  settings?: string // ISettings
}
