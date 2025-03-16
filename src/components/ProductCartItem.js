import React, { useEffect, useState } from "react";
import QuantitySelector from "./QuantitySlector";
import { QuantityProvider, useQuantity } from "./QuantityContext";
import trashIcon from "../lib/trash-svgrepo-com.svg";
import { removeProductFromCart, updateQuantityProductCartByID } from "../js/site";


function ProductCartItem({ id, img, displayName, price, cateName }) {
    const { quantity: globalQuantity, setQuantity } = useQuantity();
    return (
        <>
            <div className="product-cart-item">
                <div className="img-product-cart-item-container">
                    <img src={img} />
                </div>
                <div className="main-product-cart-item-container">
                    <div>{displayName}</div>
                    <a style={{ color: "rgb(112, 112, 112)", fontSize: "13px", cursor: "pointer" }}>{cateName}</a>
                    <div>
                        <p style={{ color: "rgb(248, 89, 36)" }}>đ {Number(price).toLocaleString("de-DE")}</p>
                        <p style={{ color: "rgb(248, 57, 36)", fontWeight: "550" }}>đ {(Number(price) * Number(globalQuantity)).toLocaleString("de-DE")}</p>
                        <QuantitySelector min={1} val={globalQuantity} id={id} cartItem={true} />
                    </div>
                </div>
                <div className="option-product-cart-item">
                    <div onClick={() => removeProductFromCart(id)}>
                        <img src={trashIcon} />
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCartItem;
