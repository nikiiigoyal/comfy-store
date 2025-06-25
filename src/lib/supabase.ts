import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category: string | null
  brand: string | null
  sizes: string[] | null
  colors: string[] | null
  material: string | null
  image_url: string | null
  stock_quantity: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  alt_text: string | null
  is_primary: boolean
  sort_order: number
}

export interface Category {
  id: string
  name: string
  description: string | null
  slug: string
  is_active: boolean
}