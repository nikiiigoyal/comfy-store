import { Link, useLoaderData, type LoaderFunction } from "react-router-dom";
import type { CartItem, SingleProductResponse } from "../utils/types";
import { FormatAsDollars } from "../utils/formatAsDollars";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import SelectProductAmount, { Mode } from "../components/SelectProductAmount";
import SelectProductColor from "../components/SelectProductColor";
import { addItem } from "../features/cart/cartSlice";
import { supabase } from "../lib/supabase";

export const loader: LoaderFunction = async ({
  params,
}): Promise<SingleProductResponse> => {
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    throw new Error('Product not found');
  }

  return {
    data: {
      id: product.id,
      attributes: {
        title: product.name,
        price: product.price.toString(),
        description: product.description,
        image: product.image_url,
        colors: product.colors,
        company: product.brand,
        category: product.category,
        shipping: product.stock_quantity > 0,
        featured: product.is_featured,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      },
    },
    meta: {},
  };
};

function SingleProduct() {
  const { data: product } = useLoaderData() as SingleProductResponse;
  const { image, title, price, description, colors, company } = product.attributes;
  const dollarsAmount = FormatAsDollars(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const dispatch = useAppDispatch();
  
  const cartProduct: CartItem = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  };

  const addToCart = () => {
    dispatch(addItem(cartProduct));
  };

  return (
    <section>
      <div className='flex gap-x-2 h-6 items-center'>
        <Button asChild variant='link' size='sm'>
          <Link to='/'>Home</Link>
        </Button>
        <Separator orientation='vertical' />
        <Button asChild variant='link' size='sm'>
          <Link to='/products'>Products</Link>
        </Button>
      </div>
      {/* PRODUCT */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE FIRST COL */}
        <img
          src={image}
          alt={title}
          className='w-96 h-96 object-cover rounded-lg lg:w-full'
        />
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <h1 className='capitalize text-3xl font-bold'>{title}</h1>
          <h4 className='text-xl mt-2'>{company}</h4>
          <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>
            {dollarsAmount}
          </p>
          <p className='mt-6 leading-8'>{description}</p>
          {/* COLORS */}
          <SelectProductColor
            colors={colors}
            productColor={productColor}
            setProductColor={setProductColor}
          />
          {/* AMOUNT */}
          <SelectProductAmount
            mode={Mode.SingleProduct}
            amount={amount}
            setAmount={setAmount}
          />
          {/* CART BUTTON */}
          <Button size='lg' className='mt-10' onClick={addToCart}>
            Add to bag
          </Button>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;