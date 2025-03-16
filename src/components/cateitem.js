import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "./ProductsContext";
function CateItem({ icon, content, id, slug }) {
    const {categorySlug, setCategorySlug} = useProduct();
    const nav = useNavigate();

    const handlerClick = (e) => {
        setCategorySlug(slug);
        nav("/" + slug);
        window.scrollTo(0, 0);
    
    }
    return (
        <>
            <div id={id} slug={slug} onClick={handlerClick} className="cate-item" style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#424242",

            }}><img src={icon} style={{
                width: "20px",
                height: "20px",
                marginRight: "10px"
            }} />{content}</div>
        </>
    )
}
export default CateItem;