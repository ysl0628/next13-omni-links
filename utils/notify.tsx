import axios, { AxiosError } from 'axios'
import { FC } from 'react'
import toast from 'react-hot-toast'

interface NotifyError {
  error: Error | AxiosError
  defaultMessage?: string
}

export const notifyError = ({ error, defaultMessage }: NotifyError) => {
  let errorMessage

  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data || '請求錯誤'
  } else {
    errorMessage = error.message || defaultMessage || '未知的錯誤'
  }

  toast.error(errorMessage)
}
