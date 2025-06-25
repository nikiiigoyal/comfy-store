import type { LoaderFunction } from "react-router-dom";
import type { ProductsResponseWithParams } from "../utils/types";
import { supabase } from "../lib/supabase";
import Filters from "../components/FIlters";
import ProductsContainer from "../components/ProductsContainer";
import PaginationContainer from "../components/PaginationContainer";

export const loader: LoaderFunction = async ({
  request,
}): Promise<ProductsResponseWithParams> => {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());
  
  // 1. First fetch active categories from categories table
  const { data: categoryList } = await supabase
    .from('categories')
    .select('name, slug')
    .eq('is_active', true)
    .order('name', { ascending: true });

  // 2. Build the products query
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .eq('is_active', true);

  // Apply filters (keep your existing filter logic)
  if (params.search) query = query.ilike('name', `%${params.search}%`);
  if (params.category) query = query.eq('category', params.category);
  if (params.company) query = query.eq('brand', params.company);
  if (params.price) {
    const [min, max] = params.price.split('-');
    query = query.gte('price', min).lte('price', max);
  }
  if (params.shipping === 'true') query = query.gt('stock_quantity', 0);

  // Apply sorting (keep your existing sort logic)
  switch (params.order) {
    case 'a-z': query = query.order('name', { ascending: true }); break;
    case 'z-a': query = query.order('name', { ascending: false }); break;
    case 'high': query = query.order('price', { ascending: false }); break;
    case 'low': query = query.order('price', { ascending: true }); break;
    default: query = query.order('created_at', { ascending: false });
  }

  // Pagination
  const pageSize = 10;
  const page = Number(params.page) || 1;
  query = query.range((page - 1) * pageSize, page * pageSize - 1);

  const { data: products, count } = await query;

  // 3. Get distinct brands from products
  const { data: companies } = await supabase
    .from('products')
    .select('brand')
    .eq('is_active', true);

  console.log("Raw products:", products);
  console.log("Categories:", categoryList);
  console.log("Companies:", companies);

  return {
    data: products?.map(product => ({
      id: product.id,
      attributes: {
        title: product.name,
        price: product.price.toString(),
        image: product.image_url,
        company: product.brand,
        category: product.category,
        description: product.description,
        colors: product.colors || [],
        shipping: product.stock_quantity > 0,
        featured: product.is_featured,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      }
    })) || [],
    meta: {
      categories: ['All', ...(categoryList?.map(c => c.name) || [])], // Include 'All' option
      companies: ['All', ...new Set(companies?.map(c => c.brand) || [])], // Include 'All' option
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil((count || 0) / pageSize),
        total: count || 0,
      },
    },
    params,
  };
};

function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
}

export default Products;