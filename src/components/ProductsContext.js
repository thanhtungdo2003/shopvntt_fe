import React, { createContext, useContext, useState } from "react";

// Tạo Context
const ProductContext = createContext();

// Provider cho toàn bộ app
export const ProductProvider = ({ children }) => {

  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(20);
  const [categorySlug, setCategorySlug] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [getType, setGetType] = useState("");

  return (
    <ProductContext.Provider value={{
      searchKeyword,
      setSearchKeyword,
      page,
      setPage,
      row,
      setRow,
      categorySlug,
      setCategorySlug,
      sortType,
      setSortType,
      getType,
      setGetType,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook để dùng ở các component khác
export const useProduct = () => useContext(ProductContext);
