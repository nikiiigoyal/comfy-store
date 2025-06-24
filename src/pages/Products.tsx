import type { LoaderFunction } from "react-router-dom";
import type { ProductsResponse, ProductsResponseWithParams } from "../utils/types";
import { customFetch } from "../utils/customFetch";
import Filters from "../components/FIlters";
import ProductsContainer from "../components/ProductsContainer";
import PaginationContainer from "../components/PaginationContainer";

const url = '/products'
 export const loader: LoaderFunction = async ({
  request,
}): Promise<ProductsResponseWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await customFetch<ProductsResponse>(url, {
    params,
  });

  return { ...response.data, params };
};

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