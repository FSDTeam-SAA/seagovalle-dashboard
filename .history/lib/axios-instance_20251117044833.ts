import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { getSession, signOut } from 'next-auth/react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Create axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Track token refresh state to avoid infinite loops
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(null)
    }
  })
  failedQueue = []
}

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get token from NextAuth session instead of localStorage
    try {
      const session = await getSession()
      if (session && 'accessToken' in session) {
        const typedSession = session as { accessToken?: string }
        if (typedSession.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${typedSession.accessToken}`
        }
      }
    } catch (error) {
      console.error('Failed to get session:', error)
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Handle 401 Unauthorized - sign out and redirect
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(() => axiosInstance(originalRequest))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Sign out user - this will clear session and redirect
        await signOut({ redirect: true, callbackUrl: '/login' })
      } catch (signOutError) {
        console.error('Sign out error:', signOutError)
        processQueue(error)
        isRefreshing = false
        return Promise.reject(error)
      }

      processQueue(null)
      isRefreshing = false
      return Promise.reject(error)
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access denied:', error.response.data)
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.config?.url)
    }

    // Handle 500 Server Error
    if (error.response?.status && error.response.status >= 500) {
      console.error('Server error:', error.response.status)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
