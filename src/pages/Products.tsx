import type { LoaderFunction } from "react-router-dom";
import type { ProductsResponse } from "../utils/types";
import { customFetch } from "../utils/customFetch";
import Filters from "../components/FIlters";
import ProductsContainer from "../components/ProductsContainer";
import PaginationContainer from "../components/PaginationContainer";

const url = '/products'
  export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(url);

  return { ...response.data };
}
  function Products () {
    return (
        <>
        <Filters />
        <ProductsContainer />
        <PaginationContainer />
        </>
    )
}
export default Products