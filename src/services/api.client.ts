import { store } from '@/app/store'
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

// Global error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

// Attach token from Redux store on every request
apiClient.interceptors.request.use(config => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
