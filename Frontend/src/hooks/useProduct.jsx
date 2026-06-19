import { api } from "../api/axios";
import { useQuery } from "@tanstack/react-query"; 

export const useProduct = ({
  search = "",
  categoryName = "",
  selectedOption = "",
  checkedBrands = [],
  checkedColors = [],
  selectedPrice = "",
  currentPage = 1,
}) => {
  const getAllProduct = async () => {
    const res = await api.get(
      `products?search=${search}&category=${categoryName}&brand=${checkedBrands.join(",")}&color=${checkedColors.join(",")}&sortBy=${selectedOption}&price=${selectedPrice}&page=${currentPage}&limit=10`,
    );
    return res?.data;
  };

  return useQuery({
    queryKey: [
      "products",
      search,
      categoryName,
      selectedOption,
      checkedBrands,
      checkedColors,
      selectedPrice,
      currentPage,
    ],

    queryFn: getAllProduct,
    staleTime: 60 * 1000 * 5,
    placeholderData: (previousData) => previousData,
  });
};
