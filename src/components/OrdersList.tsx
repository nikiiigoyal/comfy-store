import { useLoaderData } from "react-router-dom";
import type { OrdersResponse } from "../utils/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "./ui/table";

function OrdersList () {
    const {data: orders, meta} = useLoaderData() as OrdersResponse;
    return (
        <>
        <div className='mt-16'>
      <h4 className='mb-4 capitalize'>
        total orders : {meta.pagination.total}
      </h4>
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Address</TableHeader>
            <TableHeader className='w-[100px]'>Products</TableHeader>
            <TableHeader className='w-[100px]'>Cost</TableHeader>
            <TableHeader>Date</TableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const { name, address, numItemsInCart, orderTotal, createdAt } =
              order.attributes;
            return (
              <TableRow key={order.id}>
                <TableCell>{name}</TableCell>
                <TableCell>{address}</TableCell>
                <TableCell className='text-center'>{numItemsInCart}</TableCell>
                <TableCell>{orderTotal}</TableCell>
                <TableCell>{new Date(createdAt).toDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

        </div>
        </>
    )
}
export default OrdersList;