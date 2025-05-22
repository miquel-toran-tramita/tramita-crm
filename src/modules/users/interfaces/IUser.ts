export interface IUser {
  id: string
  avatar: string
  username: string
  email: string
  phone: number
  menuMinimalist: boolean
  menuMovil: string[]
  darkMode: boolean
  password?: string
  roles: string[]
}
