import { createContext, useState } from "react";
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
