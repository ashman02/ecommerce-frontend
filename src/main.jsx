import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

import { store } from "./redux/store.js"
import { Provider } from "react-redux"

import { ThemeProvider } from "@/components/theme-provider"

import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Protected } from "./components/index.js"
import Home from "./pages/Home.jsx"
import Search from "./pages/Search.jsx"
import Cart from "./pages/Cart.jsx"
import Category from "./pages/Category.jsx"
import About from "./pages/About.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"
import ProductsByCategory from "./pages/ProductsByCategory.jsx"
import Signup from "./pages/Signup.jsx"
import Verify from "./pages/Verify.jsx"
import SignIn from "./pages/SignIn.jsx"
import Profile from "./pages/Profile.jsx"
import UplaodProduct from "./pages/UplaodProduct.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/sign-up",
        element:(
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/verify",
        element: (
          <Protected authentication={false}>
            <Verify />
          </Protected>
        ),
      },
      {
        path: "/sign-in",
        element: (
          <Protected authentication={false}>
            <SignIn />
          </Protected>
        ),
      },

      {
        path: "",
        element: <Home />,
      },
      {
        path: "/:username",
        element: (
          <Protected authentication>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/allcategories",
        element: <Category />,
      },
      {
        path: "/upload",
        element: (
          <Protected authentication>
            <UplaodProduct />
          </Protected>
        ),
      },
      {
        path: "/cart",
        element: (
          <Protected authentication>
            <Cart />
          </Protected>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/productdetail/:productId",
        element: <ProductDetail />,
      },
      {
        path: "category/:category/:categoryId",
        element: <ProductsByCategory />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
