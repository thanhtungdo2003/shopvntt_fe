import Button from "@atlaskit/button";
import React, { useEffect, useState } from "react";
import cartIcon from "../lib/cart-shopping-svgrepo-com.svg"
import { useNavigate } from "react-router-dom";
import { getLengthCart } from "../js/site";

export default function Cart({value}) {
  const nav = useNavigate();
  const handlerClick = () => {
    nav("/cart");
  }

  return (
    <button onClick={handlerClick}
      style={{
        width: "15%",
        height: "30px",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        outline: "none",
        fontWeight: "550",
        fontSize: "14px",
        color: "rgb(82, 142, 226)",
        cursor: "pointer",
        gap: "5px",
        position: "relative"
      }}
    >
      <div style={{
        width:"20px",
        height:"20px",
        borderRadius:"50%",
        backgroundColor:"rgb(255, 53, 53)",
        color:"white",
        fontSize:"10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position:"absolute",
        top:"-8px",
        left:"30px"
      }}>
        {value}
      </div>
      <img
        src={cartIcon}
        style={{
          width: "24px",
          height: "24px",
        }}
        alt="cart"
      />
      Giỏ hàng
    </button>
  );
}