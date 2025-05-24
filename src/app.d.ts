// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { User } from '@/db/tables'

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}

    interface HTMLAttributes<T> {
      'copy-to-clipboard'?: string
    }

    interface Locals {
      user: User | null
    }
  }

}



export {}
