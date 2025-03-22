import Textfield from "@atlaskit/textfield";
import React, { use, useEffect, useState } from "react";
import { getProductFromCart, getTotalPriceCart } from "../js/site";
import ProductCartItem from "./ProductCartItem";
import { QuantityProvider, useQuantity } from "./QuantityContext";
import axios from "axios";
import cartEmptyIcon from "../lib/empty-box-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
function CartLayout() {
    const [totalprice, setTotalPrice] = useState(0);
    const nav = useNavigate();
    const [finalPrice, setFinalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]); // State để lưu danh sách sản phẩm
    const [click, onCLick] = useState(0);
    useEffect(() => {
        let isMounted = true; // Biến để kiểm tra component có còn mounted không
    
        const fetchData = async () => {
            try {
                const cartItems = getProductFromCart(); // Lấy danh sách sản phẩm trong giỏ hàng
                if (!cartItems.length) return; // Nếu giỏ hàng trống thì không cần fetch
    
                const productRequests = cartItems.map(item =>
                    axios.get(`http://localhost:3000/api/products/${item.id}`)
                        .then(res => ({
                            ...res.data[0],
                            quantity: item.quantity
                        }))
                );
    
                const products = await Promise.all(productRequests); // Đợi tất cả request hoàn thành
    
                if (isMounted) {
                    const { totalprice, finalPrice } = getTotalPriceCart(products); // Chỉ gọi hàm 1 lần
                    setTotalPrice(totalprice);
                    setFinalPrice(finalPrice);
                    setCartItems(products);
                }
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm:", error);
            }
        };
    
        fetchData();
    
        return () => {
            isMounted = false; // Cleanup khi component bị unmount
        };
    }, [click]);
    



    return (
        <>
        <ToastContainer/>
            <div style={{ width: "1164px", display: "flex", gap: "10px" }} onClick={()=>onCLick(click+1)} onKeyDown={()=>onCLick(click+1)}>
                <div className="cart-products-container">
                    <div style={{ width: "100%", height: "30px", backgroundColor: "rgba(77, 134, 225, 0.67)", display: "flex", alignItems: "center", color: "white", fontWeight: "300" }}>
                        <p style={{ margin: "0px 10px" }}>{cartItems.length} SẢN PHẨM</p>
                    </div>
                    <div className="cart-products">
                        {cartItems.length === 0 ? (
                            <>
                                <div style={{ width: "200px", height: "400px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", margin: "auto auto" }}>
                                    <img src={cartEmptyIcon} style={{ opacity: "50%" }} />
                                    <p style={{ fontSize: "20px", fontWeight: "600", color: "rgb(95, 95, 95)" }}>Giỏ hàng trống !</p>
                                </div>
                            </>
                        ) : (
                            cartItems.map((product) => {
                                const imgNames = JSON.parse(product.product_imgs);
                                const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                                return (
                                    <QuantityProvider key={product.id} defaultvalue={product.quantity}>
                                        <ProductCartItem
                                            setTotalPrice={() => { }}
                                            id={product.product_id}
                                            displayName={product.display_name}
                                            price={product.price}
                                            cateName={product.category_name}
                                            img={"http://localhost:3000/api/product/get-imgs/product_imgs/" + imageName}
                                        />
                                    </QuantityProvider>
                                )
                            })
                        )}
                    </div>
                </div>
                <div className="cart-summary-container">
                    <div style={{ maxWidth: "100%", padding: "5px", backgroundColor: "rgb(43, 119, 205)", color: "white" }}>
                        Thông tin thanh toán
                    </div>
                    <div className="location-form">
                        <p className="form-title">Địa chỉ chi tiết</p>
                        <div style={{ display: "flex", alignItems: "center", height: "30px", gap: "5px" }}><label>Họ tên </label><p style={{ color: "red" }} title="thông tin bắt buộc">*</p></div>
                        <Textfield className="form-input-text" placeholder="nhập họ tên đầy đủ" />
                        <div style={{ display: "flex", alignItems: "center", height: "30px", gap: "5px" }}><label>Số điện thoại </label><p style={{ color: "red" }} title="thông tin bắt buộc">*</p></div>
                        <Textfield className="form-input-text" placeholder="nhập số điện thoại" />
                        <label>Email</label><br />
                        <Textfield className="form-input-text" placeholder="nhập email (nếu có)" />
                        <div style={{ display: "flex", alignItems: "center", height: "30px", gap: "5px" }}><label>Địa chỉ </label><p style={{ color: "red" }} title="thông tin bắt buộc">*</p></div>
                        <Textfield className="form-input-text" placeholder="Số nhà / Đường - Xã - Huyện - Tỉnh" />
                    </div>
                    <p className="form-title">chi tiết tiền hàng</p>

                    <div className="summary-info">
                        <div className="summary-item">
                            <p>Tổng tiền hàng (VAT 5%): </p><p>{totalprice ? (totalprice).toLocaleString('de-DE') : 0} đ</p>
                        </div>
                        <div className="summary-item">
                            <p>Tổng giá giảm: </p><p>200.000 đ</p>
                        </div>
                        <div className="summary-item totalprice">
                            <p>Thành tiền: </p><p style={{ color: "red" }}>{totalprice ? (finalPrice).toLocaleString('de-DE') : 0} đ</p>
                        </div>
                    </div>
                    <button onClick={()=>{
                        if (getProductFromCart() === "NONE") {
                            toast.info("Giỏ hàng trống!", {})
                            return;
                        };

                        nav("/order-confirm");
                    }} className="summary-sumbit-btn" style={{ maxWidth: "100%", padding: "5px", backgroundColor: "rgb(233, 49, 49)", color: "white", textAlign: "center", cursor: "pointer" }}>
                        ĐẶT HÀNG
                    </button>
                </div>
            </div>

        </>
    )
}

export default CartLayout;