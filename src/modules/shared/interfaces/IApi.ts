import type { Endpoints } from '@/modules/shared/interfaces/IEndpoints'

export interface IResult {
  ok: boolean
  status: number
  data: any
}

export interface ApiOptions {
  data?: any
  headers?: Record<string, string>
  baseUrl?: string
  customFetch?: typeof fetch
}

export interface IApi {
  request: (url: Endpoints, method: string, options?: ApiOptions) => Promise<IResult>
  get: (url: Endpoints, options?: ApiOptions) => any
  post: (url: Endpoints, options?: ApiOptions) => any
  put: (url: Endpoints, options?: ApiOptions) => any
  delete: (url: Endpoints, options?: ApiOptions) => any

  sendSuccessResponse: (data?: any, status?: number) => Response
  sendErrorResponse: (error: any, status?: number) => Response
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  message?: string
  error?: any
}
