import { createContext, useEffect, useState } from "react";
import { api } from "../api/axios";
export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // get all product data

  const getAllProductData = async () => {
    try {
      setLoading(true);
      const res = await api.get("products");

      setAllProducts(res?.data?.products);
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductData();
  }, []);

  // get all products
  const getAllProduct = async ({
    search = "",
    category = "",
    brand = "",
    color = "",
    sortBy = "",
    price = "",
  }) => {
    try {
      setLoading(true);
      const res = await api.get(
        `products?search=${search}&category=${category}&brand=${brand}&color=${color}&sortBy=${sortBy}&price=${price}&page=${currentPage}&limit=10`,
      );
      setLoading(true);
      setProducts(res?.data?.products);
      setTotalPage(res?.data?.totalPage);
      console.log(res?.data?.totalPage);
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // update product
  const updateProduct = async (productId) => {
    try {
      setLoading(true);
      const res = await api.put(`products/${productId}`);
      setMessage(res?.data?.message);
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrongh!");
    } finally {
      setLoading(false);
    }
  };
  // delete product
  const deleteProduct = async (productId) => {
    try {
      const res = await api.delete(`products/${productId}`);
      setMessage(res?.data?.message);
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrongh!");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        allProducts,

        getAllProductData,
        products,
        currentPage,
        setCurrentPage,
        totalPage,
        getAllProduct,
        deleteProduct,
        loading,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
