export interface Topping {
  _id: string
  name: string
  price: number
  category: string
  image?: {
    public_id: string
    url: string
  } | string
  description?: string
  isAvailable: boolean
  createdAt: string
  updatedAt: string
}

export interface ToppingListResponse {
  data: Topping[]
  meta?: {
    page?: number
    limit?: number
    total?: number
    pages?: number
  }
  allCategories?: string[]
}

export interface ToppingResponse {
  data: Topping
  message?: string
}

export interface ToppingAnalyticsResponse {
  data: {
    totalToppings: number
    availableToppings: number
    outOfStockToppings: number
    categoriesCount: number
    categoryBreakdown?: Record<string, number>
  }
  message?: string
}

// DTO Types
export interface CreateToppingDto {
  name: string
  price: number
  category: string
  description?: string
  image?: File
}

export interface UpdateToppingDto extends Partial<CreateToppingDto> {}

// Form Types
export interface ToppingFormData {
  name: string
  price: string
  category: string
  description: string
  image?: File | null
}
