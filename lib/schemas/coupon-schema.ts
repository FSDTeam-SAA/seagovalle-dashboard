import { z } from 'zod'

const couponSchemaBase = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(100),
  description: z.string().min(5, 'Description must be at least 5 characters').max(500),
  discountType: z.enum(['Percentage', 'Flat', 'BuyXGetY', 'FixedPrice']),
  code: z.string()
    .min(2, 'Code must be at least 2 characters')
    .max(20, 'Code must be at most 20 characters')
    .toUpperCase(),
  discountValue: z.number().positive('Discount value must be positive').optional(),
  startDate: z.string().refine(
    (date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    },
    'Start date must be today or in the future'
  ),
  endDate: z.string(),
  isActive: z.boolean().default(true),
})

export const createCouponSchema = couponSchemaBase.refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  {
    message: 'End date must be after start date',
    path: ['endDate'],
  }
)

export const updateCouponSchema = couponSchemaBase.partial()

export type CreateCouponSchema = z.infer<typeof createCouponSchema>
export type UpdateCouponSchema = z.infer<typeof updateCouponSchema>
