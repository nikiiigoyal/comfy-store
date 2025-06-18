
import { Form, Link, useLoaderData } from "react-router-dom";

import type { ProductsResponseWithParams } from "../utils/types";
import FormInput from "./FormInput";
import FormCheckbox from "./FormCheckbox";
import FormRange from "./FormRange";
import SelectInput from "./FormSelect";
import { Button } from "./ui/button";

const Filters = () => {
     const { meta, params } = useLoaderData() as ProductsResponseWithParams;
  const { search, company, category, shipping, order, price } = params;

    return (
        <>
        <Form className="border rounded-md px-8 py-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
            {/* search */}
            <FormInput label="search product" name="search" defaultValue={search} type="search"
            />
            
           {/*categories  */}
<SelectInput
  label='select category'
  name='category'
  options={meta.categories}
  defaultValue={category}
/>;
{
  /* COMPANIES */
}
<SelectInput
  label='select company'
  name='company'
  options={meta.companies}
  defaultValue={company}
/>;
{
  /* ORDER */
}

<SelectInput
  label='order by'
  name='order'
  options={['a-z', 'z-a', 'high', 'low']}
  defaultValue={order}
/>

{/* price */}
<FormRange 
label="price" name="price" defaultValue={price}/>

{/* shipping */}
<FormCheckbox label="free shipping" name="shipping" defaultValue={shipping}/>
 <Button type='button'
        asChild
        size='sm'
        variant='outline'
        className='self-end mb-2'>
            <Link to='/products'>reset</Link>
        </Button> 
        </Form>
        </>
    )
}
export default Filters;