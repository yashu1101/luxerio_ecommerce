import { createContext, useState } from "react";
import { api } from "../api/axios";
export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  // pagiantion filter
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // filter state

  const [selectedOption, setSelectedOption] = useState("");
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [checkedColors, setCheckedColors] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  // // update product
  // const updateProduct = async (productId) => {
  //   const res = await api.put(`products/${productId}`);
  //   setMessage(res?.data?.message);
  // };
  // // delete product
  // const deleteProduct = async (productId) => {
  //   try {
  //     const res = await api.delete(`products/${productId}`);
  //     setMessage(res?.data?.message);
  //   } catch (error) {
  //     setError(error.response.data.message || "Somthing went wrongh!");
  //   }
  // };

  return (
    <ProductContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        totalPage,
        setTotalPage,

        checkedBrands,
        checkedColors,
        selectedOption,
        selectedPrice,

        setCheckedBrands,
        setCheckedColors,
        setSelectedOption,
        setSelectedPrice,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
