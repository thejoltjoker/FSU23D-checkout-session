import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../views/Account/AccountPage";
import CartPage from "../views/Cart/CartPage";
import CancelPage from "../views/Checkout/CancelPage";
import SuccessPage from "../views/Checkout/SuccessPage";
import ShopPage from "../views/Shop/ShopPage";
import LoginPage from "../views/Login/LoginPage";
import RegisterPage from "../views/Register/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <ShopPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout/success",
        element: <SuccessPage />,
      },
      {
        path: "/checkout/cancel",
        element: <CancelPage />,
      },
    ],
  },
]);
