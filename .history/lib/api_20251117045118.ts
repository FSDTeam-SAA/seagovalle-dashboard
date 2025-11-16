import { axiosInstance } from '@/lib/axios-instance'

// forgot password with email
export const postForgotPassword = async (email: { email: string }) => {
  const res = await axiosInstance.post(`/auth/forgot-password`, email)
  return res.data
}

// reset password in forget password
export const postResetPassword = async (
  newPassword: { newPassword: string },
  token: string
) => {
  try {
    const res = await axiosInstance.post('/auth/reset-password', newPassword, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch {
    throw new Error('Failed to reset password')
  }
}