import { Outlet, Link } from "react-router-dom";
import Cateitem from "./cateitem";
import productIcon from "../lib/product-svgrepo-com.svg"
import { useEffect, useRef, useState } from "react";
import facebookIcon from "../lib/facebook-svgrepo-com.svg";
import zaloIcon from "../lib/zalo-svgrepo-com.svg";
import youtubeIcon from "../lib/youtube-color-svgrepo-com.svg";
import Breadcrumbs from "./Breadcrumbs";
import axios from "axios";
import { getUri } from "../js/site";
import { ProductProvider } from "./ProductsContext";
function ShopMain() {
    const [cateItems, setCateItem] = useState([]);
    useEffect(()=>{
        axios.get(`${getUri()}/category/get-all`)
        .then((res)=>{
            const categorys = res.data;
            setCateItem(categorys.map((cate, index) => {
                return <Cateitem id={cate.category_id} slug={cate.category_slug} icon={productIcon} content={cate.category_name} />
            }))
        })
    }, [])
    return (
        <>
        <ProductProvider>
            <div className="left-side">
                <div className="left-side-container">
                    <div style={{ fontWeight: "550", marginBottom: "10px", fontSize: "18px" }}>DANH MỤC SẢN PHẨM</div>
                    <div className="cate-container">
                            {cateItems}
                    </div>
                    <div style={{ fontWeight: "550", margin: "10px 0px", fontSize: "18px" }}>KẾT NỐI</div>
                    <div className="component-leftside-container contact-container">
                        <a href="https://www.facebook.com/thanhtung.bbv" target="_blank"><div className="leftside-item contact-item"><img src={facebookIcon} />facebook shopcom VNTT</div></a>
                        <div className="leftside-item contact-item"><img src={zaloIcon} />zalo: 0389055070</div>
                        <div className="leftside-item contact-item"><img src={youtubeIcon} />youtube shopcom VNTT</div>
                    </div>
                    <div style={{ fontWeight: "550", margin: "10px 0px", fontSize: "18px" }}>KHÁC</div>
                    <div className="component-leftside-container leftside-more-container">
                        <div className="leftside-item leftside-more-item">Hướng dẫn mua hàng</div>
                        <div className="leftside-item leftside-more-item">Hướng dẫn thanh toán</div>
                        <div className="leftside-item leftside-more-item">Tuyển dụng</div>
                    </div>
                </div>
            </div>
            <div style={{ width: "90%" }}>
                <Breadcrumbs />
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
            </ProductProvider>
        </>
    )
}
export default ShopMain;