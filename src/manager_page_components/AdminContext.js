import React, { createContext, useContext, useState } from "react";

// Tạo Context
const ManagerContext = createContext();

// Provider cho toàn bộ app
export const AdminProvider = ({ children }) => {

  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState(null);
  const [trigger, onTrigger] = useState(0);


  return (
    <ManagerContext.Provider value={{product, setProduct, trigger, onTrigger,
      user, setUser, order, setOrder
    }}>
      {children}
    </ManagerContext.Provider>
  );
};

// Hook để dùng ở các component khác
export const useManager = () => useContext(ManagerContext);
