import React, { useEffect, useState } from "react";
import Slideshow from "./SlideShow";
import ProductItem from "./ProductItem";

import uri from "../js/site";

import logo from "../lib/logo.png"
import slide1 from "../lib/slideshow1.png";
import slide2 from "../lib/slideshow2.png";
import slide3 from "../lib/slideshow3.png";
import slide4 from "../lib/slideshow4.png";
import slide5 from "../lib/slideshow5.png";
import axios from "axios"; 
const slides = [
    slide1, slide2, slide3, slide4, slide5
];
function Home() {
    const [newProducts, setNewProducts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/api/products/get-new/10/1")
            .then((res) => {
                if (!res.data)return <></>;
                const productsDatas = res.data;
                
                setNewProducts(productsDatas.map((p, index) => {
                    const imgNames = JSON.parse(p.product_imgs);
                    const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                    return (<ProductItem
                        key={p.product_id}
                        id={p.product_id}
                        displayName={p.display_name}
                        categoryName={p.category_name}
                        price={p.price}
                        categorySlug={p.category_slug}
                        img={`http://localhost:3000/api/product/get-imgs/product_imgs/`+imageName}
                    />)
                }))
            })
    }, [])
    return (
        <>
            <div className="slide-show">
                <Slideshow images={slides} />
            </div>
            <div className="product-container newproduct-container">
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "30px" }}>
                    <div className="product-container-title">
                        <p>SẢN PHẨM MỚI</p>
                    </div>
                    <div className="product-container-more-btn">
                        <p>xem thêm {">>"}</p>
                    </div>
                </div>
                <div className="products">
                    {newProducts}
                </div>
            </div>

            <div className="product-container bestproduct-container">
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "30px" }}>
                    <div className="product-container-title">
                        <p>SẢN PHẨM NỔI BẬT</p>
                    </div>
                    <div className="product-container-more-btn">
                        <p>xem thêm {">>"}</p>
                    </div>
                </div>
                <div className="products">
                    {[...Array(10)].map((_, index) => (
                        <ProductItem
                            key={index}
                            displayName={"Máy tính xách tay MACBOOK PRO 5.63 Cpu Intel, SSD 10Tb"}
                            categoryName={"Lap top"}
                            price={25000000}
                            categorySlug={""}
                            img={logo}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
export default Home;