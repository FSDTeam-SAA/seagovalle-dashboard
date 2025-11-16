const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
export interface MenuApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: MenuItem[];
  meta: MetaData;
}

export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  description: string;
  images: MenuImage[];
  price: MenuPrice;
  createdAt: string;   // or Date if you convert manually
  updatedAt: string;   // or Date if you convert manually
  isAvailable: boolean;
}

export interface MenuPrice {
  small: number;
  medium: number;
  large: number;
}

export interface MenuImage {
  _id: string;
  public_id: string;
  url: string;
}

export interface MetaData {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

// export interface MenuItem {
//   id: string
//   name: string
//   category: string
//   description: string
//   price: {
//     small: number
//     medium: number
//     large: number
//   }
//   images: string[]
//   rating?: number
//   status?: 'active' | 'inactive'
//   createdAt?: string
// }

// export interface MenuFormData {
//   name: string
//   category: string
//   description: string
//   price: {
//     small: string
//     medium: string
//     large: string
//   }
//   images: File[]
//   existingImages?: string[]
// }

export class MenuService {
  // Create new menu item
  static async createMenu(formData: MenuFormData): Promise<MenuItem> {
    const data = new FormData()
    
    data.append('name', formData.name)
    data.append('category', formData.category)
    data.append('description', formData.description)
    data.append('price[small]', formData.price.small)
    data.append('price[medium]', formData.price.medium)
    data.append('price[large]', formData.price.large)
    
    // Add images
    formData.images.forEach((image, index) => {
      data.append(`images[]`, image)
    })

    const response = await fetch(`${API_BASE}/menu/new-menu`, {
      method: 'POST',
      body: data,
    })

    if (!response.ok) {
      throw new Error('Failed to create menu item')
    }

    return response.json()
  }

  // Get all public menus
  static async getAllMenus(): Promise<MenuItem[]> {
    const response = await fetch(`${API_BASE}/menu/all-menus`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch menus')
    }

    return response.json()
  }

  // Get single menu
  static async getMenuById(id: string): Promise<MenuItem> {
    const response = await fetch(`${API_BASE}/menu/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch menu item')
    }

    return response.json()
  }

  // Update menu item
  static async updateMenu(id: string, formData: MenuFormData): Promise<MenuItem> {
    const data = new FormData()
    
    data.append('name', formData.name)
    data.append('category', formData.category)
    data.append('description', formData.description)
    data.append('price[small]', formData.price.small)
    data.append('price[medium]', formData.price.medium)
    data.append('price[large]', formData.price.large)
    
    // Add new images
    formData.images.forEach((image) => {
      data.append('images[]', image)
    })

    // Add existing images to keep
    if (formData.existingImages?.length) {
      formData.existingImages.forEach((img) => {
        data.append('existingImages[]', img)
      })
    }

    const response = await fetch(`${API_BASE}/menu/update-menu/${id}`, {
      method: 'PUT',
      body: data,
    })

    if (!response.ok) {
      throw new Error('Failed to update menu item')
    }

    return response.json()
  }

  // Delete menu item
  static async deleteMenu(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/menu/delete-menu/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to delete menu item')
    }
  }

  // Toggle menu status
  static async toggleMenuStatus(id: string): Promise<MenuItem> {
    const response = await fetch(`${API_BASE}/menu/toggle-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to toggle menu status')
    }

    return response.json()
  }

  // Admin get all menus
  static async adminGetAllMenus(): Promise<MenuItem[]> {
    const response = await fetch(`${API_BASE}/menu/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch admin menus')
    }

    return response.json()
  }
}

export class MenuQueryCache {
  static getMenuListCacheKey(filters?: Record<string, any>) {
    return ['menu', 'list', filters]
  }

  static getMenuDetailCacheKey(id: string) {
    return ['menu', 'detail', id]
  }

  static getSearchCacheKey(query: string) {
    return ['menu', 'search', query]
  }

  static getCategoryCacheKey(category: string) {
    return ['menu', 'category', category]
  }
}
