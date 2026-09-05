import { createBrowserRouter, redirect } from "react-router";
import HomePage from "./features/web/pages/HomePage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
// auth
import SignUpPage from "./features/auth/pages/SignUpPage";
import OtpPage from "./features/auth/pages/OtpPage";
import SetPasswordPage from "./features/auth/pages/SetPasswordPage";
import SignInPage from "./features/auth/pages/SignInPage";
// products
import ProductListPage from "./features/product/pages/ProductListPage";
import ProductDetailPage from "./features/product/pages/ProductDetailPage";
import CheckOutPage from "./features/product/pages/CheckOutPage";
//layouts
import RootLayout from "./layouts/RootLayout";
import GuestLayout from "./layouts/GuestLayout";
import {
  logoutAction,
  setPasswordAction,
  signInAction,
  signUpAction,
  verifyOtpAction,
} from "./features/auth/actions";
import {
  authCheckLoader,
  otpLoader,
  setPasswordLoader,
} from "./features/auth/loader";
import ArticleListPage from "./features/articles/pages/ArticleListPage";
import ArticleDetailPage from "./features/articles/pages/ArticleDetailPage";
import { homeLoader } from "./features/web/loader";
import { articlesInfiniteLoader } from "./features/articles/loader";
import {
  productListLoader,
  productDetailLoader,
} from "./features/product/loader";
import UserOrderPage from "./features/user/pages/UserOrderPage";
import UserFavoritesPage from "./features/user/pages/UserFavoritesPage";
import { userOrderListLoader } from "./features/user/loaders";
import UserOrderDetailPage from "./features/user/pages/UserOrderDetailPage";

let router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: NotFoundPage,
    children: [
      { index: true, Component: HomePage, loader: homeLoader },
      { path: "contact", Component: ContactPage },
      {
        path: "products",
        children: [
          {
            index: true,
            Component: ProductListPage,
            loader: productListLoader,
          },
          {
            path: ":id",
            Component: ProductDetailPage,
            loader: productDetailLoader,
          },
          { path: "checkout", Component: CheckOutPage },
        ],
      },
      {
        path: "articles",
        children: [
          {
            index: true,
            Component: ArticleListPage,
            loader: articlesInfiniteLoader,
          },
          { path: ":id", Component: ArticleDetailPage },
        ],
      },
      {
        path: "user",
        children: [
          {
            path: "orders",
            Component: UserOrderPage,
            loader: userOrderListLoader,
          },
          { path: "orders/:id", Component: UserOrderDetailPage },
          { path: "favorites", Component: UserFavoritesPage },
        ],
      },
    ],
  },
  {
    path: "/auth",
    Component: GuestLayout,
    loader: authCheckLoader,
    children: [
      {
        path: "sign-in",
        Component: SignInPage,
        action: signInAction,
      },
      { path: "sign-up", Component: SignUpPage, action: signUpAction },
      {
        path: "otp",
        Component: OtpPage,
        loader: otpLoader,
        action: verifyOtpAction,
      },
      {
        path: "set-password",
        Component: SetPasswordPage,
        loader: setPasswordLoader,
        action: setPasswordAction,
      },
    ],
  },
  { path: "/auth/logout", action: logoutAction, loader: () => redirect("/") },
]);

export default router;
