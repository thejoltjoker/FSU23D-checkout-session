import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/AccountPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PlantsPage from "../pages/PlantsPage";
import ProductPage from "../pages/ProductPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/plants",
        element: <PlantsPage />,
      },
      {
        path: "/plants/:slug",
        element: <ProductPage />,
      },
    ],
  },
]);
