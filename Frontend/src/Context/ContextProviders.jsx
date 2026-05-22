import { AuthProvider } from "./AuthContext";
import { CartContext } from "./CartContext";
import { CheckoutProvider } from "./CheckoutContext";
import { WishlistProvider } from "./WishlistContext";
import { CartProvider } from "./CartContext";

import { ProductProvider } from "./ProductsContext";


export const ContextProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};
