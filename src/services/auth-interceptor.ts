import { apiClient } from './api.client'
import { store } from '@/app/store'

// Attach token from Redux store on every request
export function attachTokenToRequest() {
  apiClient.interceptors.request.use(config => {
    const token = store?.getState().auth.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}
