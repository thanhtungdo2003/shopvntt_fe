import React from "react";
import MainLayout from "./components/MainLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import ShopMain from "./components/ShopMain";
import CartLayout from "./components/CartLayout";
import { QuantityProvider } from "./components/QuantityContext";
import ProductsPage from "./components/Products";
import CategoryPage from "./components/CategoryPage";
import ManagerMainLayout from "./manager_page_components/ManagerMainLayout";
import AccountLayout from "./components/AccountLayout";
import { AnimatePresence } from "framer-motion";
import AdminHome from "./manager_page_components/AdminHome";
import AdminProduct from "./manager_page_components/AdminProduct";
import AdminProductListByCate from "./manager_page_components/AdminProductListByCate";
function App() {
  return (
    <>
      <AnimatePresence mode="wait">

        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<ShopMain />}>
                <Route index element={<Home />} />
                <Route path="/product" element={<ProductsPage />} />
                <Route path="/:category_slug/:id" element={<QuantityProvider defaultvalue={1}> <ProductDetail /></QuantityProvider>} />
                <Route path="/:category_slug" element={<CategoryPage />} />
                <Route path="/search_query/:keyword" element={<ProductsPage />} />
              </Route>
            </Route>
            <Route path="/cart" element={<MainLayout />}>
              <Route index element={<CartLayout />} />
            </Route>

            <Route path="/manager" element={<ManagerMainLayout />}>
            
              <Route index element={<AdminHome/>}/>
              <Route path="/manager/product" element={<AdminProduct/>}>
                <Route path="/manager/product/:category_slug" element={<AdminProductListByCate/>}>

                </Route>
              </Route>
            </Route>
            <Route path="/account" element={<AccountLayout />}>

            </Route>
          </Routes>
        </Router >
      </AnimatePresence>
    </>
  )
}
export default App;
