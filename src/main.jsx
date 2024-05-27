import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

import { store } from "./redux/store.js"
import { Provider } from "react-redux"

import { ThemeProvider } from "@/components/theme-provider"

import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Search from "./pages/Search.jsx"
import Buy from "./pages/Buy.jsx"
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
        element: <Signup />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },

      {
        path: "",
        element: <Home />,
      },
      {
        path: "/:username",
        element: <Profile/>,
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
        element: <UplaodProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/buy",
        element: <Buy />,
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
