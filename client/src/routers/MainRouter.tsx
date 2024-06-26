import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/AccountPage";
import CancelPage from "../pages/CancelPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ShopPage from "../pages/ShopPage";
import SuccessPage from "../pages/SuccessPage";

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
