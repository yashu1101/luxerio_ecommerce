// import { Routes, Route, Outlet } from "react-router-dom";
// import { AppLayout } from "../../layout/AppLayout";
// import { AdminLayout } from "../../layout/AdminLayout";
// import { AuthLayout } from "../../layout/AuthLayout";
// import {
//   Home,
//   ShowProduct,
//   Cart,
//   Searches,
//   Wishlist,
//   Login,
//   Signup,
//   CheckoutPage,
//   Admin,
//   Dashboard,
//   Products,
//   ProductForm,
//   Category,
//   CategoryForm,
//   Order,
//   OrderDetail,
//   Users,
//   ViewProduct,
// } from "../../pages";

// export const RouteManager = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<AppLayout />}>
//           <Route index element={<Home />}></Route>

//           {/* public routes */}
         
//             <Route
//               path="category/:categoryName"
//               element={<ShowProduct />}></Route>
//             <Route path="search/:searchKeyword" element={<Searches />}></Route>
//             <Route path="view/:productId" element={<ViewProduct />}></Route>
          

//           {/* ***Protected routes*** */}

//           <Route path="wishlist" element={<Wishlist />}></Route>
//           <Route path="cart" element={<Cart />}></Route>
//           <Route path="checkout" element={<CheckoutPage />}></Route>
//           <Route path="checkout/:productId" element={<CheckoutPage />}></Route>
//         </Route>

//         {/* Auth routes */}
//         <Route path="auth" element={<AuthLayout />}>
//           <Route path="signup" element={<Signup />}></Route>
//           <Route path="login" element={<Login />}></Route>
//         </Route>

//         {/* ***Admin routes*** */}
//         <Route  path="admin" element={<AdminLayout />}>
//           <Route index path="dashboard" element={<Dashboard />}></Route>
//           <Route path="products" element={<Products />} />
//           <Route path="products/add" element={<ProductForm />} />
//           <Route path="products/update/:productId" element={<ProductForm />} />
//           <Route path="categories" element={<Category />} />
//           <Route path="categories/add" element={<CategoryForm />} />
//           <Route path="orders" element={<Order />} />
//           <Route path="orders/:orderId" element={<OrderDetail />} />
//           <Route path="users" element={<Users />} />
//         </Route>

       
//       </Routes>
//     </>
//   );
// };
