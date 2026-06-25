import { Routes, Route } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { AdminLayout } from "../layout/AdminLayout";
import { AuthLayout } from "../layout/AuthLayout";
import {
  Home,
  ShowProduct,
  Cart,
  Searches,
  Wishlist,
  Login,
  Signup,
  CheckoutPage,
  Dashboard,
  Products,
  ProductForm,
  Category,
  CategoryForm,
  Order,
  OrderDetail,
  Users,
  ViewProduct,
  AiChat,
  MyOrderView,
  MyOrder,
  VerifyOTP,
  ResetPassword,
  ForgotPassword,
  Profile,
} from "../pages";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export const RouteManager = () => {
  const loaction = useLocation()
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname} >
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />}></Route>

            {/* public routes */}

            <Route
              path="category/:categoryName"
              element={<ShowProduct />}></Route>
            <Route path="search/:searchKeyword" element={<Searches />}></Route>
            <Route path="view/:productId" element={<ViewProduct />}></Route>
            <Route path="/chat" element={<AiChat></AiChat>}></Route>

            {/* ***Protected routes*** */}
            <Route path="myprofile" element={<Profile />}></Route>
            <Route path="wishlist" element={<Wishlist />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="checkout" element={<CheckoutPage />}></Route>
            <Route
              path="checkout/:productId"
              element={<CheckoutPage />}></Route>
            <Route path="myorders" element={<MyOrder></MyOrder>}></Route>
            <Route
              path="myorders/:orderId"
              element={<MyOrderView></MyOrderView>}></Route>
          </Route>

          {/* Auth routes */}
          <Route path="auth" element={<AuthLayout />}>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="forgot-password" element={<ForgotPassword />}></Route>
            <Route path="verify-otp/:emailId" element={<VerifyOTP />}></Route>
            <Route
              path="reset-password/:emailId"
              element={<ResetPassword />}></Route>
          </Route>

          {/* ***Admin routes*** */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<ProductForm />} />
            <Route
              path="products/update/:productId"
              element={<ProductForm />}
            />
            <Route path="products/view/:productId" element={<ViewProduct />} />
            <Route path="categories" element={<Category />} />
            <Route path="categories/add" element={<CategoryForm />} />
            <Route path="orders" element={<Order />} />
            <Route path="orders/:orderId" element={<OrderDetail />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};
