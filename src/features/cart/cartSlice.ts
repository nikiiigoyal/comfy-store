// import { createSlice} from '@reduxjs/toolkit';
// import type { CartState } from '../../utils/types';

// const initialState = {
//   name: 'cart slice',
// };
// const getCartFromLocalStorage = () : CartState => {
//   const cart = localStorage.getItem('cart');
//  return cart ? JSON.parse(cart) : defaultState;
// }
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: getCartFromLocalStorage(),
//   reducers: {
//     addItem: (state, action: PayloadAction<CartItem>) => {
//       const newCartItem = action.payload;
//       const item = state.cartItems.find((i) => i.cartID === newCartItem.cartID)
//       if (item) {
//         item.amount += newCartItem.amount;
//       } else {
//         state.cartItems.push(newCartItem);
//       }
//       state.numItemsInCart += new CartIte    }
//   },
// });

// export default cartSlice.reducer;