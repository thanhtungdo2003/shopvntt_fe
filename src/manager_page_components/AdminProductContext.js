import React, { createContext, useContext, useState } from "react";

// Tạo Context
const ProductManagerContext = createContext();

// Provider cho toàn bộ app
export const AdminProductProvider = ({ children }) => {

  const [product, setProduct] = useState(null);
  const [trigger, onTrigger] = useState(0);


  return (
    <ProductManagerContext.Provider value={{product, setProduct, trigger, onTrigger}}>
      {children}
    </ProductManagerContext.Provider>
  );
};

// Hook để dùng ở các component khác
export const useProductManager = () => useContext(ProductManagerContext);
