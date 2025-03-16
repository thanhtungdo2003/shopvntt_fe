import React, { createContext, useContext, useState } from "react";

// Tạo Context
const QuantityContext = createContext();

// Provider cho toàn bộ app
export const QuantityProvider = ({ children, defaultvalue }) => {
  const [quantity, setQuantity] = useState(defaultvalue);

  return (
    <QuantityContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
};

// Hook để dùng ở các component khác
export const useQuantity = () => useContext(QuantityContext);
