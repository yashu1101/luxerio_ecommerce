import { AuthProvider } from "./AuthContext";

import { CheckoutProvider } from "./CheckoutContext";
import { WishlistProvider } from "./WishlistContext";

import { ProductProvider } from "./ProductsContext";

export const ContextProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <WishlistProvider>
          <CheckoutProvider>{children}</CheckoutProvider>
        </WishlistProvider>
      </ProductProvider>
    </AuthProvider>
  );
};
