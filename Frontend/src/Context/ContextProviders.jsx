import { CheckoutProvider } from "./CheckoutContext";

import { ProductProvider } from "./ProductsContext";

export const ContextProviders = ({ children }) => {
  return (
    <ProductProvider>
      <CheckoutProvider>{children}</CheckoutProvider>
    </ProductProvider>
  );
};
