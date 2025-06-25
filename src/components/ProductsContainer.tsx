import { useLoaderData } from "react-router-dom";
import type { ProductsResponseWithParams } from "../utils/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { LayoutGrid, List } from "lucide-react";
import { Separator } from "./ui/separator";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";

const ProductsContainer = () => {
  const { data,meta } = useLoaderData() as ProductsResponseWithParams;
  console.log("ProductsContainer - RAW DATA:", data);
  console.log("ProductsContainer - META DATA:", meta);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  if (data && data.length > 0) {
    console.log("First product data:", data[0]);
    console.log("First product image URL:", data[0].attributes.image);
  }
  
  return (
    <>
      {/* HEADER */}
      <section>
        <div className='flex justify-between items-center mt-8'>
          <h4 className='font-medium text-md'>
            {meta.pagination.total} product{meta.pagination.total > 1 && 's'}
          </h4>
          <div className='flex gap-x-4'>
            <Button
              onClick={() => setLayout('grid')}
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size='icon'
            >
              <LayoutGrid />
            </Button>
            <Button
              onClick={() => setLayout('list')}
              size='icon'
              variant={layout === 'list' ? 'default' : 'ghost'}
            >
              <List />
            </Button>
          </div>
        </div>
        <Separator className='mt-4' />
      </section>

      {/* PRODUCTS */}
      <div>
        {meta.pagination.total === 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no products matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
}

export default ProductsContainer;