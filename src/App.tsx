// import { Button } from "./components/ui/button";
// import { useAppSelector } from "./hooks";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages';
import ErrorElement from "./components/ErrorElement";
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { store } from "./store";
import { loader } from './pages/Products';
import HomePage from './components/Homepage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <HomePage />,
        // loader: landingLoader,
        errorElement: <ErrorElement />,
      },
     {
        path: 'products',
        element: <Products />,
        loader: loader,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about',
         element: <About />,
         errorElement: <ErrorElement />
        
        },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ]
  },
 {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store)
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
])

function App() {
  // const { name } = useAppSelector((state) => state.userState);
  // console.log(name);
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 5) + '...');
  

  return (
    <div>
      
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
