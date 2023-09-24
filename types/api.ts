import { AxiosResponse } from 'axios'

export type ResType<T> = {
  data: T
  message: string
}

export type NormalRes<T> = AxiosResponse<ResType<T>>
