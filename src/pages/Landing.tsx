import { useLoaderData, type LoaderFunction } from "react-router-dom"
import FeaturedProducts from "../components/FeaturedProducts"
import Hero from "../components/Hero"
import type { ProductsResponse } from "../utils/types"
import { customFetch } from "../utils/customFetch"

const url = '/products?featured=true'
export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(url);
  return { ...response.data };
};

function Landing () {
    const result = useLoaderData() as ProductsResponse
    console.log(result)
    return (
        <>
        <Hero />
        <FeaturedProducts />
        </>
    )
}
export default Landing