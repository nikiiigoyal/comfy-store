import { useLoaderData } from "react-router-dom";
import type { ProductsResponse } from "../utils/types";
import { FormatAsDollars } from "../utils/formatAsDollars";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

const ProductsGrid = () => {
  const { data: products } = useLoaderData() as ProductsResponse;
  
  console.log("ProductsGrid - products data:", products);

  if (!products || products.length === 0) {
    return (
      <div className="pt-12 text-center text-red-500">
        No products available to display
      </div>
    );
  }
  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => {
        const dollarsAmount = FormatAsDollars(product.attributes.price);
        return (
          <Link to={`/products/${product.id}`} key={product.id}>
            <Card>
              <CardContent className='p-4'>
                <img
                  src={product.attributes.image}
                  alt={product.attributes.title}
                  className='rounded-md h-64 md:h-48 w-full object-cover'
                    onError={(e) => {
                    console.error("Failed to load image:", product.attributes.image);
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400';
                    }}
                />
                <div className='mt-4 text-center'>
                  <h2 className='text-xl font-semibold capitalize'>
                    {product.attributes.title}
                  </h2>
                  <p className='text-primary font-light mt-2'>
                    {dollarsAmount}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductsGrid;