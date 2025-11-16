import { z } from 'zod'

export const createToppingSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  price: z.string()
    .refine((val) => !isNaN(parseFloat(val)), 'Price must be a valid number')
    .refine((val) => parseFloat(val) > 0, 'Price must be greater than 0')
    .transform((val) => parseFloat(val)),
  category: z.string()
    .min(1, 'Category is required')
    .max(50, 'Category must be at most 50 characters'),
  description: z.string()
    .max(500, 'Description must be at most 500 characters')
    .optional()
    .default(''),
  image: z.instanceof(File).optional(),
})

export const updateToppingSchema = createToppingSchema.partial()

export type CreateToppingSchema = z.infer<typeof createToppingSchema>
export type UpdateToppingSchema = z.infer<typeof updateToppingSchema>
