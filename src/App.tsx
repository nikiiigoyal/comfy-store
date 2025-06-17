// import { Button } from "./components/ui/button";
import { useAppSelector } from "./hooks";
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


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <Landing />,
        // loader: landingLoader,
        errorElement: <ErrorElement />,
      },
     {
        path: 'products',
        element: <Products />,
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
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
])

function App() {
  const { name } = useAppSelector((state) => state.userState);
  console.log(name);
  

  return (
    <div>
      
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
