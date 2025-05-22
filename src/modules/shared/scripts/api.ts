import type { IApi, IResult, ApiOptions } from '@/modules/shared/interfaces/IApi'
import type { Endpoints } from '@/modules/shared/interfaces/IEndpoints'
import { PUBLIC_BASE_URL } from '$env/static/public'
import { dev } from '$app/environment'

export const api: IApi = {
  request: async (
    url: Endpoints,
    method: string,
    options: ApiOptions = {}
  ): Promise<IResult> => {
    try {
      const { data = {}, headers = {}, baseUrl = PUBLIC_BASE_URL, customFetch = fetch } = options
      
      const requestOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      }

      if (method !== 'GET' && data) requestOptions.body = JSON.stringify(data)

      const response = await customFetch(`${baseUrl}${url}`, requestOptions)
      const cType = response.headers.get('Content-Type')

      return {
        ok: response.ok,
        status: response.status,
        data: cType && cType.includes('application/json') ? await response.json() : await response.text(),
      }
    } catch (err) {
      console.info('❌ Error: ', err)
      return { ok: false, status: 500, data: err }
    }
  },

  get: async (url: Endpoints, options?: ApiOptions) => {
    return await api.request(url, 'GET', options)
  },

  post: async (url: Endpoints, options?: ApiOptions) => {
    return await api.request(url, 'POST', options)
  },

  put: async (url: Endpoints, options?: ApiOptions) => {
    return await api.request(url, 'PUT', options)
  },

  delete: async (url: Endpoints, options?: ApiOptions) => {
    return await api.request(url, 'DELETE', options)
  },

  sendSuccessResponse: (data: any = '', status: number = 200) => {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  // Función generalizada para manejar errores
  sendErrorResponse: (error: any, status: number = 500) => {
    console.error(error)
    return new Response(
      JSON.stringify({
        success: false,
        message: 'sendErrorResponse: ' + error.message || 'An error occurred',
        error: !dev ? 'error :(' : error, // Evita mostrar detalles sensibles en prod
      }),
      {
        status,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  },
}
