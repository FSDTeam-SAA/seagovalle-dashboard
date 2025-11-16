'use client'

import { AxiosError } from 'axios'

interface ApiErrorResponse {
  message?: string
  error?: string
  details?: unknown
}

export function useApiError() {
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      const data = error.response?.data as ApiErrorResponse

      // Try to get message from different possible locations
      if (typeof data === 'object' && data !== null) {
        return data.message || data.error || 'An error occurred'
      }

      // Fallback to status text
      return error.message || 'An error occurred'
    }

    if (error instanceof Error) {
      return error.message
    }

    return 'An unexpected error occurred'
  }

  const getStatusCode = (error: unknown): number | null => {
    if (error instanceof AxiosError) {
      return error.response?.status || null
    }
    return null
  }

  const isNetworkError = (error: unknown): boolean => {
    if (error instanceof AxiosError) {
      return error.code === 'ERR_NETWORK' || !error.response
    }
    return false
  }

  return { getErrorMessage, getStatusCode, isNetworkError }
}
