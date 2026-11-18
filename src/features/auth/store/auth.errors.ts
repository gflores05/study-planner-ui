import { isAxiosError } from 'axios'
import type { ApiErrorDTO } from '../dtos'

/** Turns an API/network error into a message that can be shown to the user. */
export function authErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorDTO>(error)) {
    if (!error.response) {
      return "Can't reach the server. Check your connection and try again."
    }

    const { status, data } = error.response

    switch (data?.error) {
      case 'UserInvalidCredentials':
        return 'Invalid email or password'
      case 'UserAlreadyExists':
        return 'An account with this email already exists'
      case 'UserInvalidInput':
        return data.data?.field
          ? `Invalid ${data.data.field.toLowerCase()}`
          : 'Invalid data'
    }

    if (status === 401) {
      return 'Invalid email or password'
    }

    if (status >= 500) {
      return 'Something went wrong on the server. Please try again.'
    }
  }

  return (error as Error).message
}
