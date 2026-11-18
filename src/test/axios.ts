import {
  AxiosError,
  AxiosHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'

export function axiosResponse<T>(
  status: number,
  data: T,
  config: InternalAxiosRequestConfig = { headers: new AxiosHeaders() }
): AxiosResponse<T> {
  return { status, data, statusText: '', headers: {}, config }
}

/** The error axios rejects with for a non-2xx response. */
export function axiosHttpError(
  status: number,
  data: unknown,
  config: InternalAxiosRequestConfig = { headers: new AxiosHeaders() }
) {
  return new AxiosError(
    `Request failed with status code ${status}`,
    AxiosError.ERR_BAD_REQUEST,
    config,
    null,
    axiosResponse(status, data, config)
  )
}
