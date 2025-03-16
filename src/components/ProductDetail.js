import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../lib/logo.png";
import icon2 from "../lib/facebook-svgrepo-com.svg";
import icon3 from "../lib/youtube-color-svgrepo-com.svg";
import icon4 from "../lib/zalo-svgrepo-com.svg";
import icon5 from "../lib/cart-shopping-svgrepo-com.svg";
import guaranteeIcon from "../lib/icons8-guarantee-48.png";
import membershipIcon from "../lib/icons8-membership-card-48.png";
import freeshipIcon from "../lib/icons8-free-shipping-48.png";
import ChildProductImg from "./ChildProductImg";
import QuantitySelector from "./QuantitySlector";
import ProductItem from "./ProductItem";
import { QuantityProvider, useQuantity } from "./QuantityContext";
import { addProductToCart } from '../js/site'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function ProductDetail() {
    const addProductSuccessNotify = () => toast.success("Thành công!", { position: "top-right" });
    const notAddProductNotify = () => toast.error("Đạt giới hạn sản phẩm này!", { position: "top-right" });

    const { id } = useParams();
    const { quantity: globalQuantity, setQuantity } = useQuantity();

    const product = {
        id: id,
        quantity: globalQuantity
    }

    const [inStock, setStockStage] = useState(true);
    const imgs = [
        Logo, icon2, icon3, icon4, icon5
    ]

    const [productData, setProductData] = useState({ product_imgs: "[]", price: 0, pramaters: "",description:"" });
    useEffect(() => {
        axios.get("http://localhost:3000/api/products/" + id)
            .then((res) => {
                setProductData(res.data[0]);
                if (res.data[0].inventory == 0) {
                    setStockStage(false)
                }
            })
    }, [id]);


    const [productRelates, setProductRelates] = useState([]);
    
    useEffect(() => {
        axios.post("http://localhost:3000/api/products-get-by-params",{
            row: 5,
            page: 1,
            keyword: "",
            category_slug: productData.category_slug,
            sort: 'desc',
            get_type: ""
        })
            .then((res) => {
                if (!res.data) return <></>;
                const productsDatas = res.data;
                setProductRelates(productsDatas.map((p, index) => {
                    const imgNames = JSON.parse(p.product_imgs);
                    const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                    return (<ProductItem
                        key={p.product_id}
                        id={p.product_id}
                        displayName={p.display_name}
                        categoryName={p.category_name}
                        price={p.price}
                        img={`http://localhost:3000/api/product/get-imgs/product_imgs/` + imageName}
                    />)
                }))
            })
    }, [productData.category_slug]);

    
    return (
        <>
            <ToastContainer />
            <div className="detail-container">
                <div className="imgs-container">
                    <ChildProductImg images={JSON.parse(productData.product_imgs)} />
                </div>
                <div className="info-container">
                    <div className="info-display-name">{productData.display_name}</div>
                    <div className="info-cate-display">
                        <a>{productData.category_name}</a>
                    </div>
                    <div className="info-price">
                        <p>₫ {(productData.price).toLocaleString("de-DE")} </p>
                    </div>
                    <div style={{ fontWeight: "600", fontSize: "13px", color: "rgb(47, 47, 47)" }}>{productData.product_id}</div>
                    <div className="oder-container" style={{ width: "70%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <QuantitySelector max={100} val={1} min={1} id={"quantity-value-detail"} />
                        <button style={{
                            backgroundColor: "rgb(80, 146, 238)", color: "white", width: "200px", height: "100%"
                            , border: "none", outline: "none", fontSize: "17px", borderRadius: "4px", cursor: "pointer"
                        }} onClick={() => { if (addProductToCart(product)) { addProductSuccessNotify() } else { notAddProductNotify() } }}>Thêm vào giỏ hàng</button>
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "550" }}>
                        {
                            inStock ? <p style={{ color: "rgb(46, 181, 102)" }}>Còn hàng</p> : <p style={{ color: "rgb(246, 58, 55)" }}>Hết hàng</p>
                        }
                    </div>
                    <div>
                        <p style={{ fontWeight: "550" }}>THÔNG SỐ</p>
                        <p dangerouslySetInnerHTML={{ __html: productData.pramaters.replace(/\n/g, "<br>") }} />

                    </div>
                    <div style={{ fontSize: "14px", display: "flex", flexDirection: "column", gap: "5px" }}>
                        <p style={{ fontWeight: "550", fontSize: "16px" }}>THÔNG TIN DỊCH VỤ</p>
                        <div style={{ with: "100%", height: "30px", backgroundColor: "rgba(247, 255, 6, 0.09)", display: "flex", alignItems: "center", gap: "5px" }}>
                            <img src={guaranteeIcon} style={{ width: "24px" }} />Bảo hành <p style={{ color: "rgb(255, 58, 58)" }}>12</p> tháng
                        </div>
                        <div style={{ with: "100%", padding: "5px", backgroundColor: "rgba(247, 255, 6, 0.09)", display: "flex", gap: "5px" }}>
                            <img src={freeshipIcon} style={{ width: "24px", height: "24px" }} />
                            <div style={{}}>
                                <span>
                                    Đơn hàng có giá trị từ <strong style={{ color: "rgb(255, 58, 58)" }}>300.000 (đ)</strong>, miễn phí vận chuyển [ tối đa 15.000 (đ) ].
                                </span>
                                <br></br>
                                <span>
                                    Đơn hàng có giá trị <strong style={{ color: "rgb(255, 58, 58)" }}>500.000 (đ)</strong>, miễn phí vận chuyển [ tối đa 35.000 (đ) ].
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="product-container">
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "30px" }}>
                    <div className="product-container-title">
                        <p>SẢN PHẨM LIÊN QUAN</p>
                    </div>
                    <div className="product-container-more-btn">
                        <p>xem thêm {">>"}</p>
                    </div>
                </div>
                <div className="products">
                    {productRelates}
                </div>
            </div>
            <div style={{ width: "100%", backgroundColor: "rgba(1, 1, 1, 0.06)", paddingLeft: "10px", paddingTop: "10px" }}>
                <strong style={{ fontSize: "17px", fontWeight: "560" }}>MÔ TẢ SẢN PHẨM</strong>
                <p style={{
                    wordWrap: "break-word", /* Xuống dòng nếu từ quá dài */
                    overflowWrap: "break-word"
                }}>
                    <p dangerouslySetInnerHTML={{ __html: productData.description.replace(/\n/g, "<br>") }} />

                </p>
            </div>
        </>
    )
}
export default ProductDetail;