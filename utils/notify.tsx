import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export const notifyError = (
  error: Error | AxiosError,
  defaultMessage?: string
) => {
  let errorMessage

  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data || '請求錯誤'
  } else {
    errorMessage = error.message || defaultMessage || '未知的錯誤'
  }

  toast.error(errorMessage)
}
