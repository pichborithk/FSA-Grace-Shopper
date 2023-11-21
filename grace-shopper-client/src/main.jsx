import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './root';
import Home from './routes/Home/Home';
import Women from './routes/Women/Women';
import Men from './routes/Men/Men';
import Kids from './routes/Kids/Kids';
import Register from './routes/Register/Register';
import Login from './routes/Login/login';
import Products from './routes/Products/Products';
import SingleProduct from './routes/SingleProduct/SingleProduct';
import Carts from './routes/Cart/carts';
import AddProduct from './routes/AddProduct/AddProduct';
import Checkout from './routes/Checkout/checkout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/add',
        element: <AddProduct />,
      },
      {
        path: '/products/:productId',
        element: <SingleProduct />,
      },
      {
        path: '/women',
        element: <Women />,
      },
      {
        path: '/men',
        element: <Men />,
      },
      {
        path: '/kids',
        element: <Kids />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/carts',
        element: <Carts />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
