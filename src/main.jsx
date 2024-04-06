import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { store } from './redux/store.js'
import { Provider } from 'react-redux'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Buy from './pages/Buy.jsx'
import Cart from './pages/Cart.jsx'
import Category from './pages/Category.jsx'
import About from './pages/About.jsx'
import ProductDetail from "./pages/ProductDetail.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/category",
        element: <Category />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/buy",
        element: <Buy />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/productdetail/:productId",
        element: <ProductDetail />
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
