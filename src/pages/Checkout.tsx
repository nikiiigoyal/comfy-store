import { redirect, type LoaderFunction } from "react-router-dom"
import type { ReduxStore } from "../store"
import { toast } from "../components/ui/use-toast";
import SectionTitle from "../components/SectionTitle";
import { useAppSelector } from "../hooks";
import CartTotals from "../components/CartTotals";
import CheckoutForm from "../components/CheckoutForm";

export const loader =
  (store: ReduxStore): LoaderFunction =>
  async (): Promise<Response | null> => {
    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: 'Please login to continue' });
      return redirect('/login');
    }

    return null;
  };


    function Checkout () {
        const cartTotal = useAppSelector((state) => state.cartState.cartTotal);
  if (cartTotal === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }
    return (
        <>
        <SectionTitle text='Place your order' />
      <div className='mt-8 grid gap-8  md:grid-cols-2 items-start'>
        <CheckoutForm />
        <CartTotals />
      </div>
        </>
    )
}
export default Checkout